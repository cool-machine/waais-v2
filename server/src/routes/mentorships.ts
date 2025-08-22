import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/database';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Get all mentorships (active mentors)
router.get('/', async (req, res, next) => {
  try {
    const { expertise, page = 1, limit = 12 } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = { isActive: true };
    
    if (expertise) {
      where.expertise = { has: expertise };
    }

    const [mentorships, total] = await Promise.all([
      prisma.mentorship.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          mentor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profile: {
                select: {
                  profileImageUrl: true,
                  bio: true,
                  currentCompany: true,
                  currentRole: true,
                  linkedinUrl: true,
                  aiExpertise: true
                }
              }
            }
          },
          _count: {
            select: {
              requests: {
                where: { status: 'ACCEPTED' }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.mentorship.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        mentorships,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get single mentorship
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const mentorship = await prisma.mentorship.findUnique({
      where: { id },
      include: {
        mentor: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profile: {
              select: {
                profileImageUrl: true,
                bio: true,
                currentCompany: true,
                currentRole: true,
                linkedinUrl: true,
                aiExpertise: true,
                yearsOfExperience: true
              }
            }
          }
        },
        requests: {
          where: { status: 'ACCEPTED' },
          include: {
            mentee: {
              select: {
                firstName: true,
                lastName: true,
                profile: {
                  select: {
                    profileImageUrl: true
                  }
                }
              }
            }
          }
        },
        _count: {
          select: {
            requests: {
              where: { status: 'ACCEPTED' }
            }
          }
        }
      }
    });

    if (!mentorship) {
      throw createError('Mentorship not found', 404);
    }

    res.json({
      success: true,
      data: { mentorship }
    });
  } catch (error) {
    next(error);
  }
});

// Create mentorship offer
const createMentorshipSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  expertise: z.array(z.string()).min(1, 'At least one expertise area is required'),
  maxMentees: z.number().positive().max(20).default(5),
  isActive: z.boolean().default(true)
});

router.post('/', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const validatedData = createMentorshipSchema.parse(req.body);
    const userId = req.user!.id;

    // Check if user profile indicates availability for mentoring
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId }
    });

    if (!userProfile?.availableForMentoring) {
      throw createError('Please update your profile to indicate availability for mentoring', 400);
    }

    const mentorship = await prisma.mentorship.create({
      data: {
        ...validatedData,
        mentorId: userId
      },
      include: {
        mentor: {
          select: {
            firstName: true,
            lastName: true,
            profile: {
              select: {
                profileImageUrl: true,
                currentCompany: true,
                currentRole: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: { mentorship },
      message: 'Mentorship offer created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Request mentorship
const requestMentorshipSchema = z.object({
  message: z.string().min(20, 'Message must be at least 20 characters')
});

router.post('/:id/request', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const { message } = requestMentorshipSchema.parse(req.body);
    const userId = req.user!.id;

    // Check if mentorship exists and is active
    const mentorship = await prisma.mentorship.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            requests: {
              where: { status: 'ACCEPTED' }
            }
          }
        }
      }
    });

    if (!mentorship) {
      throw createError('Mentorship not found', 404);
    }

    if (!mentorship.isActive) {
      throw createError('This mentorship is not active', 400);
    }

    if (mentorship.mentorId === userId) {
      throw createError('Cannot request mentorship from yourself', 400);
    }

    // Check if mentor has reached max mentees
    if (mentorship._count.requests >= mentorship.maxMentees) {
      throw createError('This mentor has reached maximum mentees', 400);
    }

    // Check if already requested
    const existingRequest = await prisma.mentorshipRequest.findUnique({
      where: {
        mentorshipId_menteeId: {
          mentorshipId: id,
          menteeId: userId
        }
      }
    });

    if (existingRequest) {
      throw createError('Already requested mentorship from this mentor', 409);
    }

    const request = await prisma.mentorshipRequest.create({
      data: {
        mentorshipId: id,
        menteeId: userId,
        message
      },
      include: {
        mentorship: {
          select: {
            title: true,
            mentor: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        mentee: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            profile: {
              select: {
                profileImageUrl: true,
                currentCompany: true,
                currentRole: true
              }
            }
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: { request },
      message: 'Mentorship request sent successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update mentorship request status (mentor only)
const updateRequestSchema = z.object({
  status: z.enum(['PENDING', 'ACCEPTED', 'REJECTED'])
});

router.put('/requests/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const { status } = updateRequestSchema.parse(req.body);
    const userId = req.user!.id;

    // Check if request exists and user is the mentor
    const request = await prisma.mentorshipRequest.findUnique({
      where: { id },
      include: {
        mentorship: {
          select: {
            mentorId: true,
            maxMentees: true,
            _count: {
              select: {
                requests: {
                  where: { status: 'ACCEPTED' }
                }
              }
            }
          }
        }
      }
    });

    if (!request) {
      throw createError('Mentorship request not found', 404);
    }

    if (request.mentorship.mentorId !== userId) {
      throw createError('Not authorized to update this request', 403);
    }

    // Check if accepting would exceed max mentees
    if (status === 'ACCEPTED' && request.mentorship._count.requests >= request.mentorship.maxMentees) {
      throw createError('Maximum mentees reached', 400);
    }

    const updatedRequest = await prisma.mentorshipRequest.update({
      where: { id },
      data: { status },
      include: {
        mentorship: {
          select: {
            title: true,
            mentor: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        mentee: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: { request: updatedRequest },
      message: `Mentorship request ${status.toLowerCase()} successfully`
    });
  } catch (error) {
    next(error);
  }
});

// Update mentorship
router.put('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const validatedData = createMentorshipSchema.partial().parse(req.body);

    // Check if user owns this mentorship
    const mentorship = await prisma.mentorship.findUnique({
      where: { id }
    });

    if (!mentorship) {
      throw createError('Mentorship not found', 404);
    }

    if (mentorship.mentorId !== userId) {
      throw createError('Not authorized to update this mentorship', 403);
    }

    const updatedMentorship = await prisma.mentorship.update({
      where: { id },
      data: validatedData,
      include: {
        mentor: {
          select: {
            firstName: true,
            lastName: true,
            profile: {
              select: {
                profileImageUrl: true,
                currentCompany: true,
                currentRole: true
              }
            }
          }
        }
      }
    });

    res.json({
      success: true,
      data: { mentorship: updatedMentorship },
      message: 'Mentorship updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Delete mentorship
router.delete('/:id', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const mentorship = await prisma.mentorship.findUnique({
      where: { id }
    });

    if (!mentorship) {
      throw createError('Mentorship not found', 404);
    }

    if (mentorship.mentorId !== userId && req.user!.role !== 'ADMIN') {
      throw createError('Not authorized to delete this mentorship', 403);
    }

    await prisma.mentorship.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Mentorship deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
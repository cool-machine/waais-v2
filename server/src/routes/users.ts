import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/database';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Get all users (alumni directory) - with search and filtering
router.get('/', async (req, res, next) => {
  try {
    const {
      search,
      industry,
      graduationYear,
      aiExpertise,
      availableForMentoring,
      page = 1,
      limit = 20
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const where: any = {};

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { profile: { currentCompany: { contains: search, mode: 'insensitive' } } },
        { profile: { currentRole: { contains: search, mode: 'insensitive' } } }
      ];
    }

    if (industry) {
      where.profile = { ...where.profile, industry: { contains: industry, mode: 'insensitive' } };
    }

    if (graduationYear) {
      where.profile = { ...where.profile, graduationYear: Number(graduationYear) };
    }

    if (aiExpertise) {
      where.profile = { ...where.profile, aiExpertise: { has: aiExpertise } };
    }

    if (availableForMentoring === 'true') {
      where.profile = { ...where.profile, availableForMentoring: true };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: Number(limit),
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true,
          profile: {
            select: {
              bio: true,
              linkedinUrl: true,
              profileImageUrl: true,
              graduationYear: true,
              degree: true,
              industry: true,
              currentCompany: true,
              currentRole: true,
              location: true,
              aiExpertise: true,
              availableForMentoring: true,
              interestedInStartups: true
            }
          }
        },
        orderBy: [
          { createdAt: 'desc' }
        ]
      }),
      prisma.user.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        users,
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

// Get user profile by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        profile: true
      }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
});

// Update user profile
const updateProfileSchema = z.object({
  bio: z.string().optional(),
  phone: z.string().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  twitterUrl: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  profileImageUrl: z.string().url().optional().or(z.literal('')),
  graduationYear: z.number().optional(),
  degree: z.string().optional(),
  industry: z.string().optional(),
  currentCompany: z.string().optional(),
  currentRole: z.string().optional(),
  location: z.string().optional(),
  aiExpertise: z.array(z.string()).optional(),
  yearsOfExperience: z.number().optional(),
  availableForMentoring: z.boolean().optional(),
  interestedInStartups: z.boolean().optional(),
  eventNotifications: z.boolean().optional(),
});

router.put('/profile', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const validatedData = updateProfileSchema.parse(req.body);
    const userId = req.user!.id;

    const updatedProfile = await prisma.userProfile.upsert({
      where: { userId },
      update: validatedData,
      create: {
        userId,
        ...validatedData
      }
    });

    res.json({
      success: true,
      data: { profile: updatedProfile },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get user's events
router.get('/me/events', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user!.id;

    const registrations = await prisma.eventRegistration.findMany({
      where: { userId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
            location: true,
            isVirtual: true,
            status: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: { registrations }
    });
  } catch (error) {
    next(error);
  }
});

// Get user's mentorships
router.get('/me/mentorships', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user!.id;

    const [mentorships, requests] = await Promise.all([
      prisma.mentorship.findMany({
        where: { mentorId: userId },
        include: {
          requests: {
            include: {
              mentee: {
                select: {
                  id: true,
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
          }
        }
      }),
      prisma.mentorshipRequest.findMany({
        where: { menteeId: userId },
        include: {
          mentorship: {
            include: {
              mentor: {
                select: {
                  id: true,
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
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: { mentorships, requests }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
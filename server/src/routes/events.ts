import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/database';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';
import { emailService } from '../services/emailService';

const router = Router();

// Get all events (public)
router.get('/', async (req, res, next) => {
  try {
    const { status = 'PUBLISHED', upcoming = 'false', page = 1, limit = 10 } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    const now = new Date();
    
    const where: any = { status };
    
    if (upcoming === 'true') {
      where.startDate = { gte: now };
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          createdBy: {
            select: {
              firstName: true,
              lastName: true
            }
          },
          _count: {
            select: {
              registrations: true
            }
          }
        },
        orderBy: { startDate: upcoming === 'true' ? 'asc' : 'desc' }
      }),
      prisma.event.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        events,
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

// Get single event
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            firstName: true,
            lastName: true,
            profile: {
              select: {
                profileImageUrl: true
              }
            }
          }
        },
        registrations: {
          include: {
            user: {
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
            registrations: true
          }
        }
      }
    });

    if (!event) {
      throw createError('Event not found', 404);
    }

    res.json({
      success: true,
      data: { event }
    });
  } catch (error) {
    next(error);
  }
});

// Create event (admin only)
const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().optional(),
  imageUrl: z.string().url().optional(),
  startDate: z.string().transform((str) => new Date(str)),
  endDate: z.string().transform((str) => new Date(str)).optional(),
  location: z.string().optional(),
  isVirtual: z.boolean().default(false),
  meetingUrl: z.string().url().optional(),
  maxAttendees: z.number().positive().optional(),
  isPaid: z.boolean().default(false),
  price: z.number().min(0).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT')
});

router.post('/', authenticate, authorize('ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const validatedData = createEventSchema.parse(req.body);
    
    const event = await prisma.event.create({
      data: {
        ...validatedData,
        createdById: req.user!.id
      },
      include: {
        createdBy: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: { event },
      message: 'Event created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update event (admin only)
router.put('/:id', authenticate, authorize('ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = createEventSchema.partial().parse(req.body);

    const event = await prisma.event.update({
      where: { id },
      data: validatedData,
      include: {
        createdBy: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: { event },
      message: 'Event updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Register for event
router.post('/:id/register', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Check if event exists and is published
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            registrations: true
          }
        }
      }
    });

    if (!event) {
      throw createError('Event not found', 404);
    }

    if (event.status !== 'PUBLISHED') {
      throw createError('Event is not available for registration', 400);
    }

    // Check if event is full
    if (event.maxAttendees && event._count.registrations >= event.maxAttendees) {
      throw createError('Event is full', 400);
    }

    // Check if already registered
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId
        }
      }
    });

    if (existingRegistration) {
      throw createError('Already registered for this event', 409);
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: id,
        userId
      },
      include: {
        event: {
          select: {
            title: true,
            startDate: true
          }
        },
        user: {
          select: {
            firstName: true,
            email: true
          }
        }
      }
    });

    // Send confirmation email
    await emailService.sendEventRegistrationEmail(
      registration.user.email,
      registration.user.firstName,
      registration.event.title,
      registration.event.startDate.toLocaleDateString()
    );

    res.status(201).json({
      success: true,
      data: { registration },
      message: 'Successfully registered for event'
    });
  } catch (error) {
    next(error);
  }
});

// Unregister from event
router.delete('/:id/register', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const registration = await prisma.eventRegistration.findUnique({
      where: {
        eventId_userId: {
          eventId: id,
          userId
        }
      }
    });

    if (!registration) {
      throw createError('Registration not found', 404);
    }

    await prisma.eventRegistration.delete({
      where: {
        eventId_userId: {
          eventId: id,
          userId
        }
      }
    });

    res.json({
      success: true,
      message: 'Successfully unregistered from event'
    });
  } catch (error) {
    next(error);
  }
});

// Delete event (admin only)
router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.event.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
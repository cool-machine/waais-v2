import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/database';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Get all startups
router.get('/', async (req, res, next) => {
  try {
    const { status = 'ACTIVE', industry, stage, page = 1, limit = 12 } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = { status };
    
    if (industry) {
      where.industry = { contains: industry, mode: 'insensitive' };
    }
    
    if (stage) {
      where.stage = stage;
    }

    const [startups, total] = await Promise.all([
      prisma.startup.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          _count: {
            select: {
              applications: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.startup.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        startups,
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

// Get single startup
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const startup = await prisma.startup.findUnique({
      where: { id },
      include: {
        applications: {
          include: {
            user: {
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
        }
      }
    });

    if (!startup) {
      throw createError('Startup not found', 404);
    }

    res.json({
      success: true,
      data: { startup }
    });
  } catch (error) {
    next(error);
  }
});

// Create startup (admin only)
const createStartupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  industry: z.string().min(1, 'Industry is required'),
  stage: z.enum(['IDEA', 'PRE_SEED', 'SEED', 'SERIES_A', 'SERIES_B', 'GROWTH']),
  foundedYear: z.number().optional(),
  location: z.string().optional(),
  teamSize: z.string().optional(),
  aiTechnologies: z.array(z.string()).default([]),
  status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED']).default('ACTIVE')
});

router.post('/', authenticate, authorize('ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const validatedData = createStartupSchema.parse(req.body);
    
    const startup = await prisma.startup.create({
      data: validatedData
    });

    res.status(201).json({
      success: true,
      data: { startup },
      message: 'Startup created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update startup (admin only)
router.put('/:id', authenticate, authorize('ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = createStartupSchema.partial().parse(req.body);

    const startup = await prisma.startup.update({
      where: { id },
      data: validatedData
    });

    res.json({
      success: true,
      data: { startup },
      message: 'Startup updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Apply to startup
const applySchema = z.object({
  message: z.string().min(10, 'Message must be at least 10 characters')
});

router.post('/:id/apply', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const { message } = applySchema.parse(req.body);
    const userId = req.user!.id;

    // Check if startup exists
    const startup = await prisma.startup.findUnique({
      where: { id }
    });

    if (!startup) {
      throw createError('Startup not found', 404);
    }

    if (startup.status !== 'ACTIVE') {
      throw createError('This startup is not accepting applications', 400);
    }

    // Check if already applied
    const existingApplication = await prisma.startupApplication.findUnique({
      where: {
        startupId_userId: {
          startupId: id,
          userId
        }
      }
    });

    if (existingApplication) {
      throw createError('Already applied to this startup', 409);
    }

    const application = await prisma.startupApplication.create({
      data: {
        startupId: id,
        userId,
        message
      },
      include: {
        startup: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.status(201).json({
      success: true,
      data: { application },
      message: 'Application submitted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get user's applications
router.get('/me/applications', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user!.id;

    const applications = await prisma.startupApplication.findMany({
      where: { userId },
      include: {
        startup: {
          select: {
            id: true,
            name: true,
            logoUrl: true,
            industry: true,
            stage: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: { applications }
    });
  } catch (error) {
    next(error);
  }
});

// Update application status (admin only)
const updateApplicationSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED'])
});

router.put('/applications/:id', authenticate, authorize('ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const { status } = updateApplicationSchema.parse(req.body);

    const application = await prisma.startupApplication.update({
      where: { id },
      data: { status },
      include: {
        startup: {
          select: {
            name: true
          }
        },
        user: {
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
      data: { application },
      message: 'Application status updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Delete startup (admin only)
router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.startup.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Startup deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
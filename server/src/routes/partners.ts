import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/database';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';

const router = Router();

// Get all partners
router.get('/', async (req, res, next) => {
  try {
    const { isActive = 'true', page = 1, limit = 20 } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where = {
      isActive: isActive === 'true'
    };

    const [partners, total] = await Promise.all([
      prisma.partner.findMany({
        where,
        skip,
        take: Number(limit),
        orderBy: { createdAt: 'desc' }
      }),
      prisma.partner.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        partners,
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

// Get single partner
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const partner = await prisma.partner.findUnique({
      where: { id }
    });

    if (!partner) {
      throw createError('Partner not found', 404);
    }

    res.json({
      success: true,
      data: { partner }
    });
  } catch (error) {
    next(error);
  }
});

// Create partner (admin only)
const createPartnerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  isActive: z.boolean().default(true)
});

router.post('/', authenticate, authorize('ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const validatedData = createPartnerSchema.parse(req.body);
    
    const partner = await prisma.partner.create({
      data: validatedData
    });

    res.status(201).json({
      success: true,
      data: { partner },
      message: 'Partner created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Update partner (admin only)
router.put('/:id', authenticate, authorize('ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = createPartnerSchema.partial().parse(req.body);

    const partner = await prisma.partner.update({
      where: { id },
      data: validatedData
    });

    res.json({
      success: true,
      data: { partner },
      message: 'Partner updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Delete partner (admin only)
router.delete('/:id', authenticate, authorize('ADMIN'), async (req, res, next) => {
  try {
    const { id } = req.params;

    await prisma.partner.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Partner deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
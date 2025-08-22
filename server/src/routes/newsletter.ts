import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/database';
import { authenticate, authorize, AuthenticatedRequest } from '../middleware/auth';
import { createError } from '../middleware/errorHandler';
import { emailService } from '../services/emailService';

const router = Router();

// Subscribe to newsletter
const subscribeSchema = z.object({
  email: z.string().email('Invalid email format')
});

router.post('/subscribe', async (req, res, next) => {
  try {
    const { email } = subscribeSchema.parse(req.body);

    // Check if already subscribed
    const existingSubscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    });

    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.json({
          success: true,
          message: 'Already subscribed to newsletter'
        });
      } else {
        // Reactivate subscription
        await prisma.newsletterSubscription.update({
          where: { email },
          data: { isActive: true }
        });
        
        await emailService.sendNewsletterSubscriptionEmail(email);
        
        return res.json({
          success: true,
          message: 'Newsletter subscription reactivated'
        });
      }
    }

    // Create new subscription
    await prisma.newsletterSubscription.create({
      data: { email }
    });

    // Send confirmation email
    await emailService.sendNewsletterSubscriptionEmail(email);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    next(error);
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res, next) => {
  try {
    const { email } = subscribeSchema.parse(req.body);

    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email }
    });

    if (!subscription) {
      throw createError('Email not found in newsletter subscriptions', 404);
    }

    await prisma.newsletterSubscription.update({
      where: { email },
      data: { isActive: false }
    });

    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    next(error);
  }
});

// Get all newsletter subscriptions (admin only)
router.get('/subscriptions', authenticate, authorize('ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const { isActive = 'true', page = 1, limit = 50 } = req.query;
    
    const skip = (Number(page) - 1) * Number(limit);
    
    const where = {
      isActive: isActive === 'true'
    };

    const [subscriptions, total] = await Promise.all([
      prisma.newsletterSubscription.findMany({
        where,
        skip,
        take: Number(limit),
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
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.newsletterSubscription.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        subscriptions,
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

// Get newsletter statistics (admin only)
router.get('/stats', authenticate, authorize('ADMIN'), async (req: AuthenticatedRequest, res, next) => {
  try {
    const [activeSubscriptions, totalSubscriptions, userSubscriptions, guestSubscriptions] = await Promise.all([
      prisma.newsletterSubscription.count({ where: { isActive: true } }),
      prisma.newsletterSubscription.count(),
      prisma.newsletterSubscription.count({ where: { userId: { not: null }, isActive: true } }),
      prisma.newsletterSubscription.count({ where: { userId: null, isActive: true } })
    ]);

    const stats = {
      activeSubscriptions,
      totalSubscriptions,
      userSubscriptions,
      guestSubscriptions,
      unsubscribedCount: totalSubscriptions - activeSubscriptions
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    next(error);
  }
});

// Link newsletter subscription to user account
router.post('/link-account', authenticate, async (req: AuthenticatedRequest, res, next) => {
  try {
    const userId = req.user!.id;
    const userEmail = req.user!.email;

    const subscription = await prisma.newsletterSubscription.findUnique({
      where: { email: userEmail }
    });

    if (!subscription) {
      // Create subscription if doesn't exist
      await prisma.newsletterSubscription.create({
        data: {
          email: userEmail,
          userId
        }
      });
    } else if (!subscription.userId) {
      // Link existing subscription to user
      await prisma.newsletterSubscription.update({
        where: { email: userEmail },
        data: { userId }
      });
    }

    res.json({
      success: true,
      message: 'Newsletter subscription linked to account'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
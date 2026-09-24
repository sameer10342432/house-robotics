import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { validateBody } from '../../middleware/validation';
import { newsletterRateLimiter } from '../../middleware/rateLimiter';

const router = Router();

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().optional(),
  source: z.string().optional().default('Website Footer')
});

// POST /api/newsletter/subscribe
router.post(
  '/subscribe',
  newsletterRateLimiter,
  validateBody(subscribeSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, name, source } = req.body;
      const sanitizedEmail = email.trim().toLowerCase();

      const existing = await prisma.newsletterSubscriber.findUnique({
        where: { email: sanitizedEmail }
      });

      if (existing) {
        if (existing.status === 'SUBSCRIBED') {
          res.json({
            success: true,
            message: 'You are already subscribed to House Robotics intelligence insights.',
            data: { email: sanitizedEmail }
          });
          return;
        }

        // Resubscribe if previously unsubscribed
        const updated = await prisma.newsletterSubscriber.update({
          where: { email: sanitizedEmail },
          data: {
            status: 'SUBSCRIBED',
            unsubscribedAt: null,
            subscribedAt: new Date(),
            source: source || 'Resubscribed'
          }
        });

        res.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
          data: { email: updated.email }
        });
        return;
      }

      const subscriber = await prisma.newsletterSubscriber.create({
        data: {
          email: sanitizedEmail,
          name: name ? name.trim() : null,
          source: source || 'Website Footer',
          status: 'SUBSCRIBED'
        }
      });

      res.status(201).json({
        success: true,
        message: 'Thank you for subscribing to House Robotics growth insights.',
        data: { email: subscriber.email }
      });
    } catch (err) {
      next(err);
    }
  }
);

// POST /api/newsletter/unsubscribe
router.post(
  '/unsubscribe',
  validateBody(z.object({ email: z.string().email() })),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      const sanitizedEmail = email.trim().toLowerCase();

      await prisma.newsletterSubscriber.updateMany({
        where: { email: sanitizedEmail },
        data: {
          status: 'UNSUBSCRIBED',
          unsubscribedAt: new Date()
        }
      });

      res.json({
        success: true,
        message: 'You have been successfully unsubscribed from newsletter updates.'
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

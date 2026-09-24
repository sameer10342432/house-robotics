import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { validateBody } from '../../middleware/validation';
import crypto from 'crypto';

const router = Router();

const eventSchema = z.object({
  eventType: z.enum(['PAGE_VIEW', 'CTA_CLICK', 'WHATSAPP_CLICK', 'PHONE_CLICK', 'FORM_SUBMIT', 'NEWSLETTER_SUBMIT']),
  eventName: z.string().min(1).max(100),
  pageUrl: z.string().optional(),
  referrer: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional()
});

// POST /api/analytics/event - track privacy-friendly frontend interactions
router.post(
  '/event',
  validateBody(eventSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { eventType, eventName, pageUrl, referrer, metadata } = req.body;

      // Hash IP address for privacy compliance
      const rawIp = req.ip || req.socket.remoteAddress || '';
      const ipHash = rawIp ? crypto.createHash('sha256').update(rawIp).digest('hex').slice(0, 16) : null;
      const userAgent = req.headers['user-agent'] ? req.headers['user-agent'].slice(0, 255) : null;

      await prisma.analyticsEvent.create({
        data: {
          eventType,
          eventName,
          pageUrl: pageUrl ? pageUrl.slice(0, 500) : null,
          referrer: referrer ? referrer.slice(0, 500) : null,
          userAgent,
          ipHash,
          metadata: metadata ? JSON.stringify(metadata) : null
        }
      });

      res.status(200).json({
        success: true
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

export const createRateLimiter = (options: {
  windowMs: number;
  maxRequests: number;
  message?: string;
}) => {
  const { windowMs, maxRequests, message = 'Too many requests, please try again shortly.' } = options;
  const buckets = new Map<string, RateLimitRecord>();

  // Cleanup expired buckets every 5 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of buckets.entries()) {
      if (now > value.resetTime) {
        buckets.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();

    if (process.env.NODE_ENV === 'test' || ip === '::1' || ip === '127.0.0.1') {
      next();
      return;
    }

    const record = buckets.get(ip);

    if (!record || now > record.resetTime) {
      buckets.set(ip, {
        count: 1,
        resetTime: now + windowMs
      });
      next();
      return;
    }

    if (record.count >= maxRequests) {
      res.status(429).json({
        success: false,
        message,
        code: 'RATE_LIMIT_EXCEEDED'
      });
      return;
    }

    record.count += 1;
    next();
  };
};

// Common rate limiters
export const loginRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,
  message: 'Too many login attempts. Please wait 15 minutes before trying again.'
});

export const contactFormRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  maxRequests: 8,
  message: 'Too many inquiries submitted from this IP. Please wait a few minutes.'
});

export const newsletterRateLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000,
  maxRequests: 5,
  message: 'Too many subscription requests. Please try again later.'
});

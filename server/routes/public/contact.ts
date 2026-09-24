import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { validateBody } from '../../middleware/validation';
import { contactFormRateLimiter } from '../../middleware/rateLimiter';
import { sendContactNotificationEmail } from '../../services/emailService';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please provide a valid email address'),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  message: z.string().min(5, 'Message must be at least 5 characters').max(3000),
  source: z.string().optional().default('Contact Form')
});

// Helper to generate unique inquiry ID: HR-INQ-YYYYMM-XXXX
const generateInquiryId = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `HR-INQ-${dateStr}-${randomSuffix}`;
};

// POST /api/contact - handles inbound contact & discovery requests
router.post(
  '/',
  contactFormRateLimiter,
  validateBody(contactSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, email, phone, company, service, budget, message, source } = req.body;

      const inquiryId = generateInquiryId();

      // Clean/sanitize inputs
      const sanitizedName = name.trim();
      const sanitizedEmail = email.trim().toLowerCase();
      const sanitizedPhone = phone ? phone.trim() : null;
      const sanitizedCompany = company ? company.trim() : null;
      const sanitizedService = service ? service.trim() : null;
      const sanitizedBudget = budget ? budget.trim() : null;
      const sanitizedMessage = message.trim();

      // 1. Save contact message record
      const contactMessage = await prisma.contactMessage.create({
        data: {
          inquiryId,
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          company: sanitizedCompany,
          service: sanitizedService,
          budget: sanitizedBudget,
          message: sanitizedMessage,
          status: 'UNREAD'
        }
      });

      // 2. Create CRM lead automatically
      const lead = await prisma.lead.create({
        data: {
          inquiryId,
          name: sanitizedName,
          email: sanitizedEmail,
          phone: sanitizedPhone,
          company: sanitizedCompany,
          service: sanitizedService,
          budget: sanitizedBudget,
          message: sanitizedMessage,
          source: source || 'Contact Form',
          status: 'NEW',
          score: 60 // Inbound lead starting score
        }
      });

      // 3. Trigger email notification (non-blocking for fast response)
      sendContactNotificationEmail({
        inquiryId,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        company: sanitizedCompany,
        service: sanitizedService,
        budget: sanitizedBudget,
        message: sanitizedMessage
      }).catch((err) => console.error('[EMAIL DISPATCH ERROR]', err));

      res.status(201).json({
        success: true,
        message: 'Your inquiry has been received. Our team will contact you shortly.',
        data: {
          inquiryId,
          receivedAt: contactMessage.createdAt
        }
      });
    } catch (err) {
      next(err);
    }
  }
);

// Alias: POST /api/consultation (for consultation modal submissions)
router.post(
  '/consultation',
  contactFormRateLimiter,
  validateBody(contactSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.body.source = req.body.source || 'Consultation Modal';
    // Forward to the main handler logic
    const { name, email, phone, company, service, budget, message } = req.body;
    const inquiryId = generateInquiryId();

    try {
      const contactMessage = await prisma.contactMessage.create({
        data: {
          inquiryId,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : null,
          company: company ? company.trim() : null,
          service: service ? service.trim() : null,
          budget: budget ? budget.trim() : null,
          message: message.trim(),
          status: 'UNREAD'
        }
      });

      await prisma.lead.create({
        data: {
          inquiryId,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone ? phone.trim() : null,
          company: company ? company.trim() : null,
          service: service ? service.trim() : null,
          budget: budget ? budget.trim() : null,
          message: message.trim(),
          source: 'Consultation Modal',
          status: 'NEW',
          score: 70 // Targeted consultation lead
        }
      });

      sendContactNotificationEmail({
        inquiryId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        company: company ? company.trim() : null,
        service: service ? service.trim() : null,
        budget: budget ? budget.trim() : null,
        message: message.trim()
      }).catch((err) => console.error('[EMAIL DISPATCH ERROR]', err));

      res.status(201).json({
        success: true,
        message: 'Consultation request submitted successfully.',
        data: {
          inquiryId,
          receivedAt: contactMessage.createdAt
        }
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

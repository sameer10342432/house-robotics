import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { validateBody } from '../../middleware/validation';
import { contactFormRateLimiter } from '../../middleware/rateLimiter';
import { sendContactNotificationEmail } from '../../services/emailService';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please provide a valid business email address'),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  timeline: z.string().optional().nullable(),
  message: z.string().min(5, 'Message must be at least 5 characters').max(3000),
  serviceDetails: z.any().optional().nullable(),
  source: z.string().optional().default('Contact Form'),
  pageUrl: z.string().optional().nullable(),
  referrer: z.string().optional().nullable(),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  utmContent: z.string().optional().nullable(),
  utmTerm: z.string().optional().nullable(),
  consentGiven: z.boolean().optional().default(true),
  hp_field: z.string().optional().nullable(), // Honeypot field
  formRenderTime: z.number().optional().nullable() // Submission speed anti-bot
});

// Helper to generate unique inquiry ID: HR-INQ-YYYYMMDD-XXXX
const generateInquiryId = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `HR-INQ-${dateStr}-${randomSuffix}`;
};

// Reusable processor for both /api/contact and /api/consultation
async function processInboundLead(req: Request, res: Response, next: NextFunction, defaultSource: string) {
  try {
    const { 
      name, email, phone, company, websiteUrl, city, state, service, budget, timeline,
      message, serviceDetails, source, pageUrl, referrer, 
      utmSource, utmMedium, utmCampaign, utmContent, utmTerm,
      consentGiven, hp_field, formRenderTime
    } = req.body;

    // 1. Honeypot check (silent discard for bots)
    if (hp_field && hp_field.trim().length > 0) {
      console.warn('[SPAM DEFENSE] Honeypot field triggered from IP:', req.ip);
      res.status(201).json({
        success: true,
        message: 'Your inquiry has been received. Our team will contact you shortly.',
        data: { inquiryId: generateInquiryId(), receivedAt: new Date() }
      });
      return;
    }

    // 2. Minimum form fill-out duration (anti-bot)
    if (formRenderTime && typeof formRenderTime === 'number') {
      const durationMs = Date.now() - formRenderTime;
      if (durationMs < 1200) {
        console.warn(`[SPAM DEFENSE] Form filled too rapidly (${durationMs}ms) by IP:`, req.ip);
        res.status(422).json({
          success: false,
          message: 'Submission completed unusually fast. Please review your details and submit again.',
          code: 'BOT_SPEED_TRIGGERED'
        });
        return;
      }
    }

    // Clean & sanitize inputs
    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? phone.trim() : null;
    const sanitizedCompany = company ? company.trim() : null;
    const sanitizedWebsiteUrl = websiteUrl ? websiteUrl.trim() : null;
    const sanitizedCity = city ? city.trim() : null;
    const sanitizedState = state ? state.trim() : null;
    const sanitizedService = service ? service.trim() : 'General Inbound';
    const sanitizedBudget = budget ? budget.trim() : null;
    const sanitizedTimeline = timeline ? timeline.trim() : null;
    const sanitizedMessage = message.trim();
    const serializedServiceDetails = serviceDetails 
      ? (typeof serviceDetails === 'string' ? serviceDetails : JSON.stringify(serviceDetails))
      : null;
    const effectiveSource = source || defaultSource;

    // 3. Duplicate submission prevention (60-second window)
    const recentDuplicate = await prisma.lead.findFirst({
      where: {
        email: sanitizedEmail,
        service: sanitizedService,
        createdAt: { gte: new Date(Date.now() - 60000) }
      }
    });

    if (recentDuplicate) {
      res.status(200).json({
        success: true,
        message: 'Your inquiry has already been received. Our strategy team is currently reviewing your brief.',
        data: {
          inquiryId: recentDuplicate.inquiryId,
          receivedAt: recentDuplicate.createdAt,
          isDuplicate: true
        }
      });
      return;
    }

    const inquiryId = generateInquiryId();

    // 4. Save contact message record
    const contactMessage = await prisma.contactMessage.create({
      data: {
        inquiryId,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        company: sanitizedCompany,
        websiteUrl: sanitizedWebsiteUrl,
        city: sanitizedCity,
        state: sanitizedState,
        service: sanitizedService,
        budget: sanitizedBudget,
        timeline: sanitizedTimeline,
        message: sanitizedMessage,
        serviceDetails: serializedServiceDetails,
        consentGiven: consentGiven !== false,
        status: 'UNREAD'
      }
    });

    // 5. Create CRM lead automatically
    const lead = await prisma.lead.create({
      data: {
        inquiryId,
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        company: sanitizedCompany,
        websiteUrl: sanitizedWebsiteUrl,
        city: sanitizedCity,
        state: sanitizedState,
        service: sanitizedService,
        budget: sanitizedBudget,
        timeline: sanitizedTimeline,
        message: sanitizedMessage,
        serviceDetails: serializedServiceDetails,
        pageUrl: pageUrl || (req.headers.referer || null),
        referrer: referrer || null,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        utmContent: utmContent || null,
        utmTerm: utmTerm || null,
        source: effectiveSource,
        status: 'NEW',
        score: sanitizedBudget ? 70 : 60,
        consentGiven: consentGiven !== false,
        followUpStatus: 'NONE'
      }
    });

    // 6. If lead originated from a USA location page, increment its lead counter
    if (pageUrl && pageUrl.includes('/usa/')) {
      try {
        const cleanPath = '/' + pageUrl.replace(/^https?:\/\/[^/]+/, '').replace(/^\/+|\/+$/g, '');
        await prisma.usaLocationPage.updateMany({
          where: { urlPath: cleanPath },
          data: { leadsCount: { increment: 1 } }
        });
      } catch {
        // Non-blocking location counter update
      }
    }

    // 7. Trigger non-blocking email notification & log communication record
    sendContactNotificationEmail({
      inquiryId,
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      company: sanitizedCompany,
      websiteUrl: sanitizedWebsiteUrl,
      service: sanitizedService,
      budget: sanitizedBudget,
      timeline: sanitizedTimeline,
      message: sanitizedMessage,
      pageUrl: pageUrl || undefined,
      source: effectiveSource
    }).then(async () => {
      try {
        await prisma.leadCommunication.create({
          data: {
            leadId: lead.id,
            type: 'ADMIN_NOTIFICATION',
            channel: 'EMAIL',
            recipient: 'sameerliaqat81@gmail.com',
            subject: `[House Robotics New Lead] ${sanitizedService} - ${sanitizedName} (${inquiryId})`,
            status: 'SENT',
            sentAt: new Date()
          }
        });
      } catch {
        // Communication log non-blocking
      }
    }).catch(async (err) => {
      console.error('[EMAIL DISPATCH ERROR]', err);
      try {
        await prisma.leadCommunication.create({
          data: {
            leadId: lead.id,
            type: 'ADMIN_NOTIFICATION',
            channel: 'EMAIL',
            recipient: 'sameerliaqat81@gmail.com',
            subject: `[House Robotics New Lead] ${sanitizedService} - ${sanitizedName} (${inquiryId})`,
            status: 'FAILED',
            errorMessage: err?.message || 'SMTP delivery failed'
          }
        });
      } catch {
        // Communication log non-blocking
      }
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our senior strategy team will review your brief and contact you shortly.',
      data: {
        inquiryId,
        receivedAt: contactMessage.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/contact - handles inbound contact form requests
router.post(
  '/',
  contactFormRateLimiter,
  validateBody(contactSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const isUsaPage = req.body.pageUrl && req.body.pageUrl.includes('/usa/');
    const defaultSource = isUsaPage ? 'USA Location Landing Page' : 'Website Contact Form';
    await processInboundLead(req, res, next, defaultSource);
  }
);

// Alias: POST /api/consultation (for consultation modal submissions)
router.post(
  '/consultation',
  contactFormRateLimiter,
  validateBody(contactSchema),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await processInboundLead(req, res, next, 'Consultation Modal');
  }
);

export default router;

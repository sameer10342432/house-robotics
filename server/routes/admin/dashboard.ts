import { Router, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';

const router = Router();

// GET /api/admin/dashboard & /api/admin/dashboard/stats - aggregate real metrics & activity
router.get(['/', '/stats'], authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const [
      totalLeads,
      newLeads,
      qualifiedLeads,
      wonLeads,
      totalMessages,
      unreadMessages,
      totalSubscribers,
      publishedPosts,
      publishedServices,
      totalTestimonials,
      recentLeads,
      recentMessages,
      recentPosts,
      leadsByStatusGroup,
      recentEvents
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.lead.count({ where: { status: 'QUALIFIED' } }),
      prisma.lead.count({ where: { status: 'WON' } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
      prisma.newsletterSubscriber.count({ where: { status: 'SUBSCRIBED' } }),
      prisma.blogPost.count({ where: { status: 'PUBLISHED' } }),
      prisma.service.count({ where: { status: 'PUBLISHED' } }),
      prisma.testimonial.count({ where: { status: 'APPROVED' } }),
      prisma.lead.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: { notes: { take: 1, orderBy: { createdAt: 'desc' } } }
      }),
      prisma.contactMessage.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.blogPost.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { category: true }
      }),
      prisma.lead.groupBy({
        by: ['status'],
        _count: { status: true }
      }),
      prisma.analyticsEvent.groupBy({
        by: ['eventType'],
        _count: { eventType: true }
      })
    ]);

    // Format lead distribution for charts
    const leadDistribution = {
      NEW: 0,
      CONTACTED: 0,
      QUALIFIED: 0,
      PROPOSAL_SENT: 0,
      WON: 0,
      LOST: 0
    };

    leadsByStatusGroup.forEach((item) => {
      if (item.status in leadDistribution) {
        leadDistribution[item.status as keyof typeof leadDistribution] = item._count.status;
      }
    });

    res.json({
      success: true,
      data: {
        metrics: {
          totalLeads,
          newLeads,
          qualifiedLeads,
          wonLeads,
          totalMessages,
          unreadMessages,
          totalSubscribers,
          publishedPosts,
          publishedServices,
          totalTestimonials
        },
        counts: {
          totalLeads,
          newLeads,
          qualifiedLeads,
          wonLeads,
          contactMessages: totalMessages,
          unreadMessages,
          newsletterSubscribers: totalSubscribers,
          blogPosts: publishedPosts,
          publishedServices,
          testimonials: totalTestimonials
        },
        leadDistribution,
        leadStatusCounts: leadDistribution,
        recentLeads,
        recentMessages,
        recentPosts,
        analyticsSummary: recentEvents.map((e) => ({
          type: e.eventType,
          count: e._count.eventType
        }))
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;

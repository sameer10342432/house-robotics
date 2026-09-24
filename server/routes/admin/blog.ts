import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { validateBody } from '../../middleware/validation';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

// Auto-publish scheduled posts that have reached scheduled time
async function autoPublishScheduledPosts() {
  try {
    const now = new Date();
    await prisma.blogPost.updateMany({
      where: {
        status: 'SCHEDULED',
        scheduledAt: { lte: now }
      },
      data: {
        status: 'PUBLISHED',
        publishedAt: now
      }
    });
  } catch (e) {
    // Non-blocking
  }
}

// GET /api/admin/blog - list posts with full filters & search
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await autoPublishScheduledPosts();

    const { search, status, categoryId, author, featured, page = '1', limit = '20' } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { slug: { contains: search as string } },
        { excerpt: { contains: search as string } }
      ];
    }
    if (status && status !== 'ALL') where.status = status as string;
    if (categoryId && categoryId !== 'ALL') where.categoryId = categoryId as string;
    if (author && author !== 'ALL') where.author = { contains: author as string };
    if (featured === 'true') where.featured = true;

    const [total, posts] = await Promise.all([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          postTags: { include: { tag: true } }
        }
      })
    ]);

    res.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/blog/internal-links/destinations - get destination links for internal linker
router.get('/internal-links/destinations', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const [services, posts] = await Promise.all([
      prisma.service.findMany({
        select: { id: true, title: true, slug: true, category: true },
        where: { status: 'ACTIVE' },
        orderBy: { title: 'asc' }
      }),
      prisma.blogPost.findMany({
        select: { id: true, title: true, slug: true, status: true },
        where: { status: 'PUBLISHED' },
        orderBy: { title: 'asc' }
      })
    ]);

    const corePages = [
      { id: 'page-home', title: 'Home Page', url: '/', type: 'Site Page' },
      { id: 'page-services', title: 'Services Overview', url: '/services', type: 'Site Page' },
      { id: 'page-about', title: 'About Us', url: '/about', type: 'Site Page' },
      { id: 'page-blog', title: 'Blog Listing', url: '/blog', type: 'Site Page' },
      { id: 'page-contact', title: 'Contact & Consultation', url: '/contact', type: 'Site Page' }
    ];

    const serviceLinks = services.map(s => ({
      id: s.id,
      title: `${s.title} (${s.category})`,
      url: `/services/${s.slug}`,
      type: 'Service Page'
    }));

    const blogLinks = posts.map(p => ({
      id: p.id,
      title: p.title,
      url: `/blog/${p.slug}`,
      type: 'Blog Article'
    }));

    res.json({
      success: true,
      data: [...corePages, ...serviceLinks, ...blogLinks]
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/blog/:id - single post detail
router.get('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        category: true,
        postTags: { include: { tag: true } },
        revisions: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!post) {
      res.status(404).json({ success: false, message: 'Article not found.' });
      return;
    }

    res.json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
});

const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  excerpt: z.string().min(5, 'Excerpt must be at least 5 characters'),
  content: z.string().min(10, 'Content must have at least 10 characters'),
  featuredImage: z.string().optional().nullable(),
  featuredImageAlt: z.string().optional().nullable(),
  featuredImageCaption: z.string().optional().nullable(),
  author: z.string().default('House Robotics Strategy Team'),
  authorRole: z.string().optional().nullable(),
  authorBio: z.string().optional().nullable(),
  authorAvatar: z.string().optional().nullable(),
  readTime: z.string().default('5 min read'),
  categoryId: z.string().optional().nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED']).default('PUBLISHED'),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional().nullable(),
  scheduledAt: z.string().optional().nullable(),
  seoTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  focusKeyword: z.string().optional().nullable(),
  canonicalUrl: z.string().optional().nullable(),
  ogTitle: z.string().optional().nullable(),
  ogDescription: z.string().optional().nullable(),
  ogImage: z.string().optional().nullable(),
  twitterTitle: z.string().optional().nullable(),
  twitterDescription: z.string().optional().nullable(),
  twitterImage: z.string().optional().nullable(),
  noIndex: z.boolean().default(false),
  relatedPostIds: z.union([z.string(), z.array(z.string())]).optional().nullable(),
  tagIds: z.array(z.string()).optional()
});

// POST /api/admin/blog - create article
router.post('/', authenticateAdmin, validateBody(postSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tagIds, publishedAt, scheduledAt, relatedPostIds, ...data } = req.body;

    const cleanSlug = data.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-');

    const existing = await prisma.blogPost.findUnique({
      where: { slug: cleanSlug }
    });

    if (existing) {
      res.status(400).json({ success: false, message: 'This slug is already in use. Please enter a unique slug.' });
      return;
    }

    const normalizedRelated = Array.isArray(relatedPostIds) 
      ? JSON.stringify(relatedPostIds) 
      : (typeof relatedPostIds === 'string' ? relatedPostIds : null);

    const post = await prisma.blogPost.create({
      data: {
        ...data,
        slug: cleanSlug,
        relatedPostIds: normalizedRelated,
        publishedAt: publishedAt 
          ? new Date(publishedAt) 
          : (data.status === 'PUBLISHED' ? new Date() : null),
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        postTags: tagIds && tagIds.length > 0
          ? { create: tagIds.map((tagId: string) => ({ tagId })) }
          : undefined
      },
      include: {
        category: true,
        postTags: { include: { tag: true } }
      }
    });

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'CREATE_POST',
      entity: 'BlogPost',
      entityId: post.id,
      metadata: { title: post.title, slug: post.slug, status: post.status }
    });

    res.status(201).json({
      success: true,
      message: 'Article created successfully.',
      data: post
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/blog/:id - update article
router.put('/:id', authenticateAdmin, validateBody(postSchema), async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { tagIds, publishedAt, scheduledAt, relatedPostIds, ...data } = req.body;

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, message: 'Article not found.' });
      return;
    }

    const cleanSlug = data.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-');

    if (cleanSlug !== existing.slug) {
      const slugConflict = await prisma.blogPost.findUnique({ where: { slug: cleanSlug } });
      if (slugConflict && slugConflict.id !== id) {
        res.status(400).json({ success: false, message: 'This slug is already in use by another article.' });
        return;
      }
    }

    // Create a revision before applying changes
    try {
      await prisma.blogRevision.create({
        data: {
          postId: id,
          title: existing.title,
          content: existing.content,
          excerpt: existing.excerpt,
          author: existing.author
        }
      });
    } catch (revErr) {
      // Continue even if revision tracking encounters an error
    }

    const normalizedRelated = Array.isArray(relatedPostIds) 
      ? JSON.stringify(relatedPostIds) 
      : (typeof relatedPostIds === 'string' ? relatedPostIds : null);

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        slug: cleanSlug,
        relatedPostIds: normalizedRelated,
        publishedAt: publishedAt 
          ? new Date(publishedAt) 
          : (data.status === 'PUBLISHED' && !existing.publishedAt ? new Date() : existing.publishedAt),
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null
      },
      include: {
        category: true,
        postTags: { include: { tag: true } }
      }
    });

    if (tagIds !== undefined) {
      await prisma.blogPostTag.deleteMany({ where: { postId: id } });
      if (tagIds.length > 0) {
        await prisma.blogPostTag.createMany({
          data: tagIds.map((tagId: string) => ({ postId: id, tagId }))
        });
      }
    }

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'UPDATE_POST',
      entity: 'BlogPost',
      entityId: id,
      metadata: { title: post.title, slug: post.slug, status: post.status }
    });

    res.json({
      success: true,
      message: 'Article updated successfully.',
      data: post
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/blog/:id/duplicate - duplicate article as draft with unique slug
router.post('/:id/duplicate', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const source = await prisma.blogPost.findUnique({
      where: { id },
      include: { postTags: true }
    });

    if (!source) {
      res.status(404).json({ success: false, message: 'Source article not found.' });
      return;
    }

    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const newSlug = `${source.slug}-copy-${randomSuffix}`;
    const newTitle = `${source.title} (Copy)`;

    const duplicated = await prisma.blogPost.create({
      data: {
        title: newTitle,
        slug: newSlug,
        excerpt: source.excerpt,
        content: source.content,
        featuredImage: source.featuredImage,
        featuredImageAlt: source.featuredImageAlt,
        featuredImageCaption: source.featuredImageCaption,
        author: source.author,
        authorRole: source.authorRole,
        authorBio: source.authorBio,
        authorAvatar: source.authorAvatar,
        readTime: source.readTime,
        categoryId: source.categoryId,
        status: 'DRAFT',
        featured: false,
        seoTitle: source.seoTitle ? `${source.seoTitle} (Copy)` : null,
        metaDescription: source.metaDescription,
        focusKeyword: source.focusKeyword,
        canonicalUrl: null,
        ogTitle: source.ogTitle,
        ogDescription: source.ogDescription,
        ogImage: source.ogImage,
        twitterTitle: source.twitterTitle,
        twitterDescription: source.twitterDescription,
        twitterImage: source.twitterImage,
        noIndex: source.noIndex,
        relatedPostIds: source.relatedPostIds,
        postTags: source.postTags.length > 0
          ? { create: source.postTags.map(pt => ({ tagId: pt.tagId })) }
          : undefined
      },
      include: {
        category: true,
        postTags: { include: { tag: true } }
      }
    });

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'DUPLICATE_POST',
      entity: 'BlogPost',
      entityId: duplicated.id,
      metadata: { originalId: id, newTitle }
    });

    res.status(201).json({
      success: true,
      message: 'Article duplicated as Draft.',
      data: duplicated
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/blog/:id/revisions - get revision history
router.get('/:id/revisions', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const revisions = await prisma.blogRevision.findMany({
      where: { postId: id },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    res.json({ success: true, data: revisions });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/blog/:id/revisions/:revisionId/restore - restore from revision
router.post('/:id/revisions/:revisionId/restore', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, revisionId } = req.params;

    const revision = await prisma.blogRevision.findUnique({
      where: { id: revisionId }
    });

    if (!revision || revision.postId !== id) {
      res.status(404).json({ success: false, message: 'Revision not found.' });
      return;
    }

    const current = await prisma.blogPost.findUnique({ where: { id } });
    if (current) {
      // Save current state as another revision before restoring
      await prisma.blogRevision.create({
        data: {
          postId: id,
          title: current.title,
          content: current.content,
          excerpt: current.excerpt,
          author: current.author
        }
      });
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title: revision.title,
        content: revision.content,
        excerpt: revision.excerpt,
        author: revision.author
      },
      include: {
        category: true,
        postTags: { include: { tag: true } }
      }
    });

    res.json({
      success: true,
      message: 'Article restored to selected revision.',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/blog/:id - delete article
router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await prisma.blogPost.delete({ where: { id } });

    await logAdminActivity({
      adminId: req.admin?.id,
      adminName: req.admin?.name,
      action: 'DELETE_POST',
      entity: 'BlogPost',
      entityId: id,
      metadata: { title: post.title }
    });

    res.json({
      success: true,
      message: 'Article deleted permanently.'
    });
  } catch (err) {
    next(err);
  }
});

// ======================== CATEGORY ENDPOINTS ========================

router.get('/categories/all', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    let categories = await prisma.blogCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { posts: true } } }
    });

    // Seed defaults if empty
    if (categories.length === 0) {
      const defaultCats = [
        { name: 'SEO', slug: 'seo', description: 'Search engine optimization strategies, technical audits, and ranking factors', sortOrder: 1 },
        { name: 'Local SEO', slug: 'local-seo', description: 'Google Business Profile, local citations, and geo-targeted dominance', sortOrder: 2 },
        { name: 'AI Automation', slug: 'ai-automation', description: 'Autonomous agentic workflows, LLM integrations, and process optimization', sortOrder: 3 },
        { name: 'Digital Marketing', slug: 'digital-marketing', description: 'Omnichannel growth, conversion rate optimization, and brand scaling', sortOrder: 4 },
        { name: 'Web Development', slug: 'web-development', description: 'Full-stack engineering, high-performance web applications, and headless architectures', sortOrder: 5 },
        { name: 'Social Media Marketing', slug: 'social-media-marketing', description: 'B2B/B2C social distribution, viral loops, and community architecture', sortOrder: 6 },
        { name: 'PPC & Paid Search', slug: 'ppc', description: 'Google Ads, programmatic display, and ROAS-driven performance campaigns', sortOrder: 7 },
        { name: 'Content Marketing', slug: 'content-marketing', description: 'Authority-building editorial systems and semantic keyword clusters', sortOrder: 8 }
      ];

      for (const cat of defaultCats) {
        await prisma.blogCategory.create({ data: cat });
      }

      categories = await prisma.blogCategory.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { _count: { select: { posts: true } } }
      });
    }

    res.json({ success: true, data: categories });
  } catch (err) {
    next(err);
  }
});

router.post('/categories', authenticateAdmin, validateBody(z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional()
})), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const cleanSlug = req.body.slug.toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
    const category = await prisma.blogCategory.create({
      data: {
        ...req.body,
        slug: cleanSlug
      }
    });
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
});

router.delete('/categories/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.blogCategory.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Category deleted.' });
  } catch (err) {
    next(err);
  }
});

// ======================== TAG ENDPOINTS ========================

router.get('/tags/all', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    let tags = await prisma.blogTag.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { postTags: true } } }
    });

    if (tags.length === 0) {
      const defaultTags = [
        { name: 'SEO', slug: 'seo' },
        { name: 'Google Rankings', slug: 'google-rankings' },
        { name: 'AI Automation', slug: 'ai-automation' },
        { name: 'Local SEO', slug: 'local-seo' },
        { name: 'Content Strategy', slug: 'content-strategy' },
        { name: 'Web Performance', slug: 'web-performance' },
        { name: 'Lead Generation', slug: 'lead-generation' }
      ];

      for (const t of defaultTags) {
        await prisma.blogTag.create({ data: t });
      }

      tags = await prisma.blogTag.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { postTags: true } } }
      });
    }

    res.json({ success: true, data: tags });
  } catch (err) {
    next(err);
  }
});

router.post('/tags', authenticateAdmin, validateBody(z.object({
  name: z.string().min(2),
  slug: z.string().optional()
})), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const slug = (req.body.slug || req.body.name).toLowerCase().trim().replace(/[^a-z0-9-_]/g, '-');
    const tag = await prisma.blogTag.upsert({
      where: { slug },
      update: { name: req.body.name },
      create: { name: req.body.name, slug }
    });
    res.status(201).json({ success: true, data: tag });
  } catch (err) {
    next(err);
  }
});

router.delete('/tags/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.blogTag.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Tag deleted.' });
  } catch (err) {
    next(err);
  }
});

// ======================== AUTHOR ENDPOINTS ========================

router.get('/authors/all', authenticateAdmin, async (_req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    let authors = await prisma.author.findMany({
      orderBy: { name: 'asc' }
    });

    if (authors.length === 0) {
      const defaultAuthors = [
        {
          name: 'Marcus Vance',
          role: 'Head of Growth & AI Strategy',
          bio: '12+ years pioneering algorithmic growth, technical SEO infrastructure, and enterprise AI automation systems.',
          avatar: '/images/avatar-marcus.svg',
          email: 'marcus@houserobotics.com'
        },
        {
          name: 'Elena Rostova',
          role: 'Technical SEO & Data Architect',
          bio: 'Specialist in crawl budget optimization, dynamic schema rendering, and semantic search authority clusters.',
          avatar: '/images/avatar-elena.svg',
          email: 'elena@houserobotics.com'
        },
        {
          name: 'Julian Mercer',
          role: 'Chief Technology Officer',
          bio: 'Full-stack systems architect engineering real-time autonomous agent pipelines and high-velocity web platforms.',
          avatar: '/images/avatar-julian.svg',
          email: 'julian@houserobotics.com'
        },
        {
          name: 'House Robotics Strategy Team',
          role: 'Agency Editorial Board',
          bio: 'Curated research, benchmark telemetry, and market intelligence produced directly by House Robotics practice leads.',
          avatar: '/images/avatar-marcus.svg',
          email: 'strategy@houserobotics.com'
        }
      ];

      for (const a of defaultAuthors) {
        await prisma.author.create({ data: a });
      }

      authors = await prisma.author.findMany({
        orderBy: { name: 'asc' }
      });
    }

    res.json({ success: true, data: authors });
  } catch (err) {
    next(err);
  }
});

router.post('/authors', authenticateAdmin, validateBody(z.object({
  name: z.string().min(2),
  role: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().email().optional().or(z.literal(''))
})), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const author = await prisma.author.create({
      data: req.body
    });
    res.status(201).json({ success: true, data: author });
  } catch (err) {
    next(err);
  }
});

router.put('/authors/:id', authenticateAdmin, validateBody(z.object({
  name: z.string().min(2).optional(),
  role: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  email: z.string().email().optional().or(z.literal(''))
})), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const author = await prisma.author.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json({ success: true, data: author });
  } catch (err) {
    next(err);
  }
});

router.delete('/authors/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    await prisma.author.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Author deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;

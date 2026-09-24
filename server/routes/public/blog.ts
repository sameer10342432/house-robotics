import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../../prisma';

const router = Router();

// Auto-publish scheduled posts
async function checkScheduledPosts() {
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

// GET /api/blog/categories - list all categories
router.get('/categories', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await checkScheduledPosts();
    const categories = await prisma.blogCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: { select: { posts: { where: { status: 'PUBLISHED' } } } }
      }
    });

    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/blog - list published blog posts with filtering & pagination
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await checkScheduledPosts();
    const { category, tag, search, featured, page = '1', limit = '12' } = req.query;

    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      status: 'PUBLISHED'
    };

    if (category && category !== 'All') {
      where.OR = [
        { category: { name: { equals: category as string } } },
        { category: { slug: { equals: category as string } } }
      ];
    }

    if (tag) {
      where.postTags = {
        some: {
          tag: {
            OR: [
              { name: { equals: tag as string } },
              { slug: { equals: tag as string } }
            ]
          }
        }
      };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.AND = [
        {
          OR: [
            { title: { contains: search as string } },
            { excerpt: { contains: search as string } },
            { content: { contains: search as string } }
          ]
        }
      ];
    }

    const [total, posts] = await Promise.all([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }, { createdAt: 'desc' }],
        include: {
          category: { select: { id: true, name: true, slug: true } },
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

// GET /api/blog/:slug - get article by slug
router.get('/:slug', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await checkScheduledPosts();
    const { slug } = req.params;
    const isPreview = req.query.preview === 'true';

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        category: true,
        postTags: { include: { tag: true } }
      }
    });

    if (!post) {
      res.status(404).json({
        success: false,
        message: 'Article not found.',
        code: 'POST_NOT_FOUND'
      });
      return;
    }

    // If not in preview mode and not published, forbid public viewing
    if (!isPreview && post.status !== 'PUBLISHED') {
      res.status(404).json({
        success: false,
        message: 'This article is not currently published.',
        code: 'POST_NOT_PUBLISHED'
      });
      return;
    }

    // Increment public views if not admin preview
    if (!isPreview && post.status === 'PUBLISHED') {
      try {
        await prisma.blogPost.update({
          where: { id: post.id },
          data: { views: { increment: 1 } }
        });
      } catch (e) {
        // Non-fatal
      }
    }

    // Resolve related articles
    let relatedPosts: any[] = [];
    if (post.relatedPostIds) {
      try {
        const ids = JSON.parse(post.relatedPostIds);
        if (Array.isArray(ids) && ids.length > 0) {
          relatedPosts = await prisma.blogPost.findMany({
            where: {
              id: { in: ids },
              status: 'PUBLISHED'
            },
            take: 4,
            include: { category: true }
          });
        }
      } catch (e) {
        // Invalid JSON fallback
      }
    }

    // If no manual related posts found, fallback to category recommendations
    if (relatedPosts.length === 0 && post.categoryId) {
      relatedPosts = await prisma.blogPost.findMany({
        where: {
          categoryId: post.categoryId,
          id: { not: post.id },
          status: 'PUBLISHED'
        },
        take: 3,
        orderBy: { publishedAt: 'desc' },
        include: { category: true }
      });
    }

    res.json({
      success: true,
      data: {
        ...post,
        relatedPosts
      }
    });
  } catch (err) {
    next(err);
  }
});

export default router;

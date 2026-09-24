import { Router, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { prisma } from '../../prisma';
import { authenticateAdmin, AuthenticatedRequest } from '../../middleware/auth';
import { logAdminActivity } from '../../services/auditService';

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${cleanName}-${uniqueSuffix}${ext}`);
  }
});

// File filter: images, documents, icons
const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'image/gif',
    'application/pdf'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, SVG, GIF, and PDF are supported.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// GET /api/admin/media - list media assets
router.get('/', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { search, page = '1', limit = '24' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10)));
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (search) {
      where.OR = [
        { originalName: { contains: search as string } },
        { filename: { contains: search as string } },
        { altText: { contains: search as string } },
        { title: { contains: search as string } },
        { caption: { contains: search as string } }
      ];
    }

    const [total, items] = await Promise.all([
      prisma.media.count({ where }),
      prisma.media.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    res.json({
      success: true,
      data: items,
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

// POST /api/admin/media/upload - single or multiple file upload with SEO metadata
router.post('/upload', authenticateAdmin, upload.array('files', 10), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, message: 'No files uploaded' });
      return;
    }

    const altText = req.body.altText as string | undefined;
    const title = req.body.title as string | undefined;
    const caption = req.body.caption as string | undefined;
    const description = req.body.description as string | undefined;
    const uploader = req.admin?.name || 'Admin';

    const savedMedia = await Promise.all(
      files.map((file) =>
        prisma.media.create({
          data: {
            filename: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size,
            url: `/uploads/${file.filename}`,
            altText: altText || file.originalname.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
            title: title || file.originalname.replace(/\.[^/.]+$/, ''),
            caption: caption || null,
            description: description || null,
            uploadedBy: uploader
          }
        })
      )
    );

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'MEDIA_UPLOAD',
      entity: 'Media',
      metadata: { count: savedMedia.length, files: savedMedia.map(m => m.filename) }
    });

    res.status(201).json({
      success: true,
      data: savedMedia.length === 1 ? savedMedia[0] : savedMedia
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/media/:id - update media SEO metadata
router.put('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { altText, title, caption, description } = req.body;

    const media = await prisma.media.update({
      where: { id },
      data: {
        altText,
        title,
        caption,
        description
      }
    });

    res.json({
      success: true,
      message: 'Media details updated.',
      data: media
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/media/:id - delete media
router.delete('/:id', authenticateAdmin, async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const media = await prisma.media.findUnique({ where: { id } });

    if (!media) {
      res.status(404).json({ success: false, message: 'Media not found' });
      return;
    }

    // Try deleting file from disk
    const filePath = path.join(uploadDir, media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (e) {
        // Disk delete failed, log silently
      }
    }

    await prisma.media.delete({ where: { id } });

    await logAdminActivity({
      adminId: req.admin?.id,
      action: 'MEDIA_DELETE',
      entity: 'Media',
      entityId: id,
      metadata: { filename: media.filename }
    });

    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (err) {
    next(err);
  }
});

export default router;

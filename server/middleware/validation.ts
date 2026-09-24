import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError || error?.issues) {
        const issuesList = (error.issues || error.errors || []).map((err: any) => ({
          field: Array.isArray(err.path) ? err.path.join('.') : String(err.path || ''),
          message: err.message
        }));

        res.status(400).json({
          success: false,
          message: 'Validation error: please check required fields.',
          errors: issuesList,
          code: 'VALIDATION_FAILED'
        });
        return;
      }

      res.status(400).json({
        success: false,
        message: 'Invalid request payload format.',
        code: 'BAD_REQUEST'
      });
    }
  };
};

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req.query);
      (req as any).query = parsed;
      next();
    } catch (error: any) {
      if (error instanceof ZodError || error?.issues) {
        res.status(400).json({
          success: false,
          message: 'Invalid query parameters.',
          errors: error.issues || error.errors,
          code: 'INVALID_QUERY'
        });
        return;
      }
      next(error);
    }
  };
};

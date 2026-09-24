import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected server error occurred.';

  // Log in server console
  console.error(`[API ERROR] ${req.method} ${req.originalUrl}:`, {
    message,
    code,
    statusCode,
    ...(config.isProd ? {} : { stack: err.stack })
  });

  res.status(statusCode).json({
    success: false,
    message: config.isProd && statusCode === 500 ? 'A server error occurred. Please contact support.' : message,
    code
  });
};

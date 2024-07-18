import {Request, Response, NextFunction} from 'express';
import logger from '@/utils/logger';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Status: ${status}, Message: ${message}, Stack: ${err.stack}`);

  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

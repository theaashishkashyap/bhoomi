import type { NextFunction, Request, Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

export const successResponse = (res: Response, data: any, message = 'Success', code = 200) => {
  return res.status(code).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res: Response, message = 'Error', code = 500, errors = null) => {
  return res.status(code).json({
    success: false,
    message,
    errors,
  });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const code = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return errorResponse(res, message, code, err.errors);
};

export class AppError extends Error {
  statusCode: number;
  errors: any;

  constructor(message: string, statusCode = 500, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

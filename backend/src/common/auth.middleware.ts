import type { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma.js';
import { AppError } from './response.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const protect = async (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AppError('Unauthorized - No token provided', 401));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    // Check if user still exists
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return next(new AppError('Unauthorized - User no longer exists. Please log in again.', 401));
    }

    req.user = decoded;
    next();
  } catch (error) {
    return next(new AppError('Unauthorized - Invalid token', 401));
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden - Insufficient permissions', 403));
    }
    next();
  };
};

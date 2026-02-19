import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../common/prisma.js';
import { successResponse, AppError } from '../../common/response.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, phone, role, name } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: role || 'GUEST',
      },
    });

    return successResponse(res, { id: user.id, email: user.email, name: user.name }, 'User registered successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError('Invalid credentials', 401);

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    return successResponse(res, { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const googleCallback = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as any;
    if (!user) {
      throw new AppError('Authentication failed', 401);
    }
    
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    // Redirect to frontend with token
    // Assuming frontend runs on localhost:3000
    // In production, this should be an env var
    res.redirect(`http://localhost:3000/auth/callback?token=${token}&userId=${user.id}`);
  } catch (error) {
    next(error);
  }
};

import admin from '../../common/firebase.js';

export const firebaseLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, email, name, googleId } = req.body;

    let verifiedEmail = email;
    let verifiedGoogleId = googleId;
    let verifiedName = name;

    // Verify token with Firebase Admin if initialized
    if (admin.apps.length) {
      try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        verifiedEmail = decodedToken.email;
        verifiedGoogleId = decodedToken.uid;
        verifiedName = decodedToken.name || name;
      } catch (err: any) {
        console.error('Firebase Token Verification Failed:', err);
        
        // FAIL-SAFE FOR DEVELOPMENT:
        // If verification fails (e.g. project mismatch between frontend/backend credentials),
        // and we are in development, allow proceeding with the data from the request.
        if (process.env.NODE_ENV === 'development') {
           console.warn('⚠️ DEV MODE FALLBACK: Proceeding with unverified Firebase data due to verification error.');
           // Proceed using the variables already set from req.body
        } else {
           throw new AppError('Invalid Firebase Token', 401);
        }
      }
    } else {
      console.warn('WARNING: Firebase Admin not initialized. Skipping token verification (DEV ONLY).');
      // In production, this block should be removed or throw error
      if (process.env.NODE_ENV === 'production') {
         throw new AppError('Server misconfigured for Firebase Auth', 500);
      }
    }

    if (!verifiedEmail) {
      throw new AppError('Email is required', 400);
    }

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ googleId: verifiedGoogleId }, { email: verifiedEmail }],
      },
    });

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: verifiedEmail,
          name: verifiedName,
          googleId: verifiedGoogleId,
          role: 'GUEST' 
        },
      });
    } else if (!user.googleId && verifiedGoogleId) {
       // Link Google ID
       user = await prisma.user.update({
         where: { id: user.id },
         data: { googleId: verifiedGoogleId },
       });
    }

    const appToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    return successResponse(res, { token: appToken, user: { id: user.id, email: user.email, role: user.role, name: user.name } }, 'Firebase Login Successful');

  } catch (error) {
    next(error);
  }
};

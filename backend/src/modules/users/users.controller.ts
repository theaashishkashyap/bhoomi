import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../../common/prisma.js';
import { successResponse, AppError } from '../../common/response.js';

export const getProfile = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });
    
    if (!user) throw new AppError('User not found', 404);
    
    return successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const upgradeVerification = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { targetRole, verificationData } = req.body;
    
    // In a real app, this would trigger document verification logic
    // For now, we'll implement the transition as a mock approval
    
    let nextRole = targetRole;
    
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { role: nextRole }
    });
    
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: `VERIFICATION_UPGRADE_${nextRole}`,
        details: verificationData
      }
    });
    
    return successResponse(res, user, `Verification upgraded to ${nextRole}`);
  } catch (error) {
    next(error);
  }
};

export const verifyAadhar = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { aadharNumber } = req.body;
    
    // Validating 12 digit format
    if (!/^\d{12}$/.test(aadharNumber)) {
      throw new AppError('Invalid Aadhar number. Must be 12 digits.', 400);
    }
    
    // Check if user is already verified
    const currentUser = await prisma.user.findUnique({
      where: { id: req.user.id }
    });
    
    if (currentUser?.isAadharVerified) {
      throw new AppError('Detailed verification already completed.', 400);
    }
    
    // Check if aadhar is already verified by another user (unique constraint)
    const existingVer = await prisma.user.findFirst({
      where: { 
        aadharNumber,
        isAadharVerified: true,
        id: { not: req.user.id }
      }
    });
    
    if (existingVer) {
      throw new AppError('This Aadhar number is already linked to another account.', 400);
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        aadharNumber,
        isAadharVerified: true,
        // Assuming default showIdentity is false, but user can toggle later
      }
    });
    
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'VERIFICATION_AADHAR_SUCCESS',
        details: { aadharLast4: aadharNumber.slice(-4) }
      }
    });

    return successResponse(res, user, 'Aadhar verification successful');
  } catch (error) {
    next(error);
  }
};

export const toggleIdentityDisclosure = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    
    if (!user) throw new AppError('User not found', 404);
    
    if (!user.isAadharVerified) {
      throw new AppError('You must verify your identity first.', 400);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        showIdentity: !user.showIdentity
      }
    });

    return successResponse(res, updatedUser, `Identity disclosure ${updatedUser.showIdentity ? 'enabled' : 'disabled'}`);
  } catch (error) {
    next(error);
  }
};

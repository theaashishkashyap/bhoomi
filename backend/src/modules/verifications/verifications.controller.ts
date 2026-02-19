import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../../common/prisma.js';
import { successResponse, AppError } from '../../common/response.js';

export const createVerificationRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { listingId, documents } = req.body;
    const sellerId = (req as any).user.id;
    const documentsList = Array.isArray(documents) ? documents.join(',') : '';

    const verification = await prisma.verification.create({
      data: {
        listingId,
        sellerId,
        documents: documentsList,
        status: 'PENDING',
      },
    });

    return successResponse(res, verification, 'Verification request submitted', 201);
  } catch (error) {
    next(error);
  }
};

export const getAllVerifications = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verifications = await prisma.verification.findMany({
      include: {
        listing: true,
        seller: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return successResponse(res, verifications, 'Verifications retrieved');
  } catch (error) {
    next(error);
  }
};

export const updateVerificationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const { status, adminReview } = req.body;

    const verification = await prisma.verification.update({
      where: { id },
      data: {
        status,
        adminReview: (typeof adminReview === 'string' ? adminReview : null) as any,
        reviewedAt: new Date(),
      },
    });

    // If verified, update the listing badge
    if (status === 'VERIFIED') {
      await prisma.listing.update({
        where: { id: verification.listingId },
        data: { verifiedBadge: true }
      });
    }

    return successResponse(res, verification, 'Verification status updated');
  } catch (error) {
    next(error);
  }
};

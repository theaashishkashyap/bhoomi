import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../../common/prisma.js';
import { successResponse, AppError } from '../../common/response.js';

export const createProposal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { listingId } = req.body;
    const userId = (req as any).user.id;
    console.log(`[Proposal] Creating proposal for listing ${listingId} by user ${userId}`);

    // Check if listing exists
    const listing = await prisma.listing.findUnique({ where: { id: listingId } });
    if (!listing) {
      console.log(`[Proposal] Listing ${listingId} not found`);
      throw new AppError('Listing not found', 404);
    }
    console.log(`[Proposal] Found listing: ${listing.title}`);

    const proposal = await prisma.contactRequest.create({
      data: {
        listingId,
        userId,
        consentGiven: true,
      },
    });

    return successResponse(res, proposal, 'Proposal submitted successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getMyProposals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req as any).user.id;
    const proposals = await prisma.contactRequest.findMany({
      where: { userId },
      include: { listing: true },
      orderBy: { createdAt: 'desc' }
    });

    return successResponse(res, proposals, 'Proposals retrieved successfully');
  } catch (error) {
    next(error);
  }
};

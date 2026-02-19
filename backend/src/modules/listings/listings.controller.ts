import type { Request, Response, NextFunction } from 'express';
import * as listingService from './listings.service.js';
import { successResponse, AppError } from '../../common/response.js';

export const getListings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, search, state } = req.query;
    
    const listings = await listingService.getAllListings({
      category: typeof category === 'string' ? category : undefined,
      search: typeof search === 'string' ? search : undefined,
      state: typeof state === 'string' ? state : undefined,
    });

    return successResponse(res, listings, 'Listings retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getListingDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const listing = await listingService.getListingById(id as string);

    if (!listing) {
      throw new AppError('Listing not found', 404);
    }

    return successResponse(res, listing, 'Listing details retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const postListing = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sellerId = (req as any).user.id;
    const listing = await listingService.createListing({
      ...req.body,
      sellerId,
    });
    return successResponse(res, listing, 'Listing created successfully', 201);
  } catch (error) {
    console.error('Error creating listing:', error);
    next(error);
  }
};

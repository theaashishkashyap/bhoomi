import * as listingService from './listings.service.js';
import { successResponse, AppError } from '../../common/response.js';
export const getListings = async (req, res, next) => {
    try {
        const { category, search, state } = req.query;
        const listings = await listingService.getAllListings({
            category: typeof category === 'string' ? category : undefined,
            search: typeof search === 'string' ? search : undefined,
            state: typeof state === 'string' ? state : undefined,
        });
        return successResponse(res, listings, 'Listings retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
export const getListingDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const listing = await listingService.getListingById(id);
        if (!listing) {
            throw new AppError('Listing not found', 404);
        }
        return successResponse(res, listing, 'Listing details retrieved successfully');
    }
    catch (error) {
        next(error);
    }
};
export const postListing = async (req, res, next) => {
    try {
        const listing = await listingService.createListing(req.body);
        return successResponse(res, listing, 'Listing created successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=listings.controller.js.map
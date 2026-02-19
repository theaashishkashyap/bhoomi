import { Router } from 'express';
import * as listingController from './listings.controller.js';
import { protect } from '../../common/auth.middleware.js';

const router = Router();

router.get('/', listingController.getListings);
router.get('/:id', listingController.getListingDetail);
router.post('/', protect, listingController.postListing);

export default router;

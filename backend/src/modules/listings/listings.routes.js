import { Router } from 'express';
import * as listingController from './listings.controller.js';
const router = Router();
router.get('/', listingController.getListings);
router.get('/:id', listingController.getListingDetail);
router.post('/', listingController.postListing);
export default router;
//# sourceMappingURL=listings.routes.js.map
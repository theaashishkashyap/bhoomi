import { Router } from 'express';
import * as controller from './proposals.controller.js';
import { protect } from '../../common/auth.middleware.js';

const router = Router();

router.post('/', protect, controller.createProposal);
router.get('/me', protect, controller.getMyProposals);

export default router;

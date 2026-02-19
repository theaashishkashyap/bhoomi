import { Router } from 'express';
import * as controller from './verifications.controller.js';
import { protect, restrictTo } from '../../common/auth.middleware.js';

const router = Router();

router.post('/', protect, controller.createVerificationRequest);
router.get('/', protect, restrictTo('ADMIN'), controller.getAllVerifications);
router.patch('/:id/status', protect, restrictTo('ADMIN'), controller.updateVerificationStatus);

export default router;

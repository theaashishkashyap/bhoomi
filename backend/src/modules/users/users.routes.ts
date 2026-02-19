import { Router } from 'express';
import { getProfile, upgradeVerification, verifyAadhar, toggleIdentityDisclosure } from './users.controller.js';
import { protect } from '../../common/auth.middleware.js';

const router = Router();

router.get('/profile', protect, getProfile);
router.post('/upgrade', protect, upgradeVerification);
router.post('/verify-aadhar', protect, verifyAadhar);
router.post('/toggle-identity-disclosure', protect, toggleIdentityDisclosure);

export default router;

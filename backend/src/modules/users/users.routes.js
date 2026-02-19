import { Router } from 'express';
import { getProfile, upgradeVerification } from './users.controller.js';
import { protect } from '../../common/auth.middleware.js';
const router = Router();
router.get('/profile', protect, getProfile);
router.post('/upgrade', protect, upgradeVerification);
export default router;
//# sourceMappingURL=users.routes.js.map
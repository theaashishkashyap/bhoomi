import { Router } from 'express';
import { register, login, googleCallback, firebaseLogin } from './auth.controller.js';
import passport from '../../common/passport.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  googleCallback
);

router.post('/firebase-login', firebaseLogin);

export default router;

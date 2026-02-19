import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from './prisma.js';
import jwt from 'jsonwebtoken';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'YOUR_GOOGLE_CLIENT_SECRET';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(new Error('No email found directly from Google Profile'), false);
        }

        let user = await prisma.user.findFirst({
          where: {
            OR: [{ googleId: profile.id }, { email: email }],
          },
        });

        if (!user) {
          // Create new user
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
              googleId: profile.id,
              // Password is optional now
            },
          });
        } else if (!user.googleId) {
          // Link Google ID to existing email account
          user = await prisma.user.update({
            where: { id: user.id },
            data: { googleId: profile.id },
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;

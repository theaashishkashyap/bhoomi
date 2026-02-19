import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import passport from './common/passport.js';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/users.routes.js';
import listingRoutes from './modules/listings/listings.routes.js';
import verificationRoutes from './modules/verifications/verifications.routes.js';
import proposalRoutes from './modules/proposals/proposals.routes.js';
import { errorHandler } from './common/response.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'BHOOMI Backend is running' });
});

// Modular Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/verifications', verificationRoutes);
app.use('/api/proposals', proposalRoutes);

// Error Handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🚀 BHOOMI Backend initialized on port ${port}`);
  console.log(`📡 URL Mode: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

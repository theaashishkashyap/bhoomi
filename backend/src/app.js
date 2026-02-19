import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/users.routes.js';
import listingRoutes from './modules/listings/listings.routes.js';
import { errorHandler } from './common/response.js';
const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'BHOOMI Backend is running' });
});
// Modular Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
// Error Handling
app.use(errorHandler);
app.listen(port, () => {
    console.log(`BHOOMI Backend listening at http://localhost:${port}`);
});
export default app;
//# sourceMappingURL=app.js.map
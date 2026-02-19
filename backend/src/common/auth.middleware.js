import jwt from 'jsonwebtoken';
import { AppError } from './response.js';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return next(new AppError('Unauthorized - No token provided', 401));
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return next(new AppError('Unauthorized - Invalid token', 401));
    }
};
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('Forbidden - Insufficient permissions', 403));
        }
        next();
    };
};
//# sourceMappingURL=auth.middleware.js.map
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../common/prisma.js';
import { successResponse, AppError } from '../../common/response.js';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const register = async (req, res, next) => {
    try {
        const { email, password, phone, role, name } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new AppError('User already exists', 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone,
                role: role || 'GUEST',
            },
        });
        return successResponse(res, { id: user.id, email: user.email, name: user.name }, 'User registered successfully', 201);
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new AppError('Invalid credentials', 401);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new AppError('Invalid credentials', 401);
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
        return successResponse(res, { token, user: { id: user.id, email: user.email, role: user.role, name: user.name } }, 'Login successful');
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map
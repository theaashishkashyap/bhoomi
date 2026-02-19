import express from 'express';
import { prisma } from '../../common/prisma.js';
import { successResponse, AppError } from '../../common/response.js';
export const getProfile = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });
        if (!user)
            throw new AppError('User not found', 404);
        return successResponse(res, user);
    }
    catch (error) {
        next(error);
    }
};
export const upgradeVerification = async (req, res, next) => {
    try {
        const { targetRole, verificationData } = req.body;
        // In a real app, this would trigger document verification logic
        // For now, we'll implement the transition as a mock approval
        let nextRole = targetRole;
        const user = await prisma.user.update({
            where: { id: req.user.id },
            data: { role: nextRole }
        });
        await prisma.auditLog.create({
            data: {
                userId: user.id,
                action: `VERIFICATION_UPGRADE_${nextRole}`,
                details: verificationData
            }
        });
        return successResponse(res, user, `Verification upgraded to ${nextRole}`);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=users.controller.js.map
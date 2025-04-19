import prisma from "../../lib/prisma.js";
import logger from "../../lib/logger.js";
import { hashPassword, generateVerificationCode } from "../../lib/auth.js";
import { isSignupEnabled } from "../../lib/utilsService.js";
import { sendVerificationEmail } from "../../lib/emailService.js";

export const findUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: { email },
        });
    } catch (error) {
        logger.error("Error finding user by email:", error);
        return null;
    }
};

export const createUser = async (userData) => {
    try {
        const signupsEnabled = await isSignupEnabled();
        if (!signupsEnabled) {
            logger.warn(`Signup attempt when signups are disabled: ${userData.email}`);
            return { error: "Signups are currently disabled" };
        }

        // Hash the password
        const hashedPassword = await hashPassword(userData.password);
        
        // Generate verification code
        const verificationCode = generateVerificationCode();
        const verificationCodeExpires = new Date(Date.now() + 10 * 60000); // 10 minutes
        
        // Create user with verification code
        const newUser = await prisma.user.create({
            data: {
                email: userData.email,
                username: userData.username,
                password: hashedPassword,
                verificationCode,
                verificationCodeExpires,
            },
        });

        // Send verification email
        await sendVerificationEmail(userData.email, verificationCode);
        
        // Remove sensitive data before returning
        const { password, verificationCode: code, ...userToReturn } = newUser;
        return userToReturn;
    } catch (error) {
        logger.error("Error creating user:", error);
        if (error.code === "P2002") {
            return { error: "Email already exists" };
        }
        return { error: "Error creating user" };
    }
};

/**
 * Verify a user's email with verification code
 * @param {string} email - User email
 * @param {string} code - Verification code
 * @returns {Promise<Object>} Result object with success status
 */
export const verifyUser = async (email, code) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        if (user.isVerified) {
            return { success: true, message: "User already verified" };
        }

        if (!user.verificationCode) {
            return { success: false, message: "No verification code found" };
        }

        if (user.verificationCodeExpires < new Date()) {
            return { success: false, message: "Verification code has expired" };
        }

        if (user.verificationCode !== code) {
            return { success: false, message: "Invalid verification code" };
        }

        // Update user to verified and clear verification code
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationCode: null,
                verificationCodeExpires: null,
            },
        });

        return { success: true, message: "User verified successfully" };
    } catch (error) {
        logger.error("Error verifying user:", error);
        return { success: false, message: "Error verifying user" };
    }
};

/**
 * Get user profile data (excludes sensitive information)
 * @param {string} userId - User ID
 * @returns {Promise<Object|null>} User profile data or null
 */
export const getUserProfile = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return null;
        }

        // Remove sensitive data
        const { password, verificationCode, verificationCodeExpires, ...userProfile } = user;
        return userProfile;
    } catch (error) {
        logger.error("Error getting user profile:", error);
        return null;
    }
};

export default {
    findUserByEmail,
    createUser,
    verifyUser,
    getUserProfile
}; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import logger from "./logger.js";

const SALT_ROUNDS = 10;

export const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        logger.error("Token verification failed:", error);
        return null;
    }
};

export default {
    generateVerificationCode,
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
}; 
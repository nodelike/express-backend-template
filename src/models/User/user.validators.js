import { errorResponse } from "../../lib/helpers.js";

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json(errorResponse("Email is required", 400));
    }

    if (!password) {
        return res.status(400).json(errorResponse("Password is required", 400));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json(errorResponse("Invalid email format", 400));
    }

    if (password.length < 6) {
        return res.status(400).json(errorResponse("Password must be at least 6 characters", 400));
    }

    next();
};

export const validateVerify = (req, res, next) => {
    const { email, code } = req.body;

    if (!email) {
        return res.status(400).json(errorResponse("Email is required", 400));
    }

    if (!code) {
        return res.status(400).json(errorResponse("Verification code is required", 400));
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json(errorResponse("Invalid email format", 400));
    }

    // Code should be 6 digits
    if (!/^\d{6}$/.test(code)) {
        return res.status(400).json(errorResponse("Verification code must be 6 digits", 400));
    }

    next();
};

export default {
    validateLogin,
    validateVerify
}; 
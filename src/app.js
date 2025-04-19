import express from "express";
import logger from "./lib/logger.js";
import "dotenv/config";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`, {
        method: req.method,
        url: req.url,
        ip: req.ip,
    });
    next();
});

// Routes
// We'll import routes here as we create them
// Example: app.use('/api/users', require('./models/User/user.routes'));

// Default route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Chronos REST API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error("Application error:", {
        error: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
    });

    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "production" ? {} : err,
    });
});

export default app;

import winston from "winston";
import "dotenv/config";

const logLevel = process.env.LOG_LEVEL || "info";

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

const logger = winston.createLogger({
    level: logLevel,
    format: logFormat,
    defaultMeta: { service: "chronos-rest" },
    transports: [
        // Write logs to console
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ level, message, timestamp, ...metadata }) => {
                    let metaStr = "";
                    if (Object.keys(metadata).length > 0 && metadata.service) {
                        metaStr = JSON.stringify(metadata);
                    }
                    return `${timestamp} [${level}]: ${message} ${metaStr}`;
                })
            ),
        }),

        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({
            filename: "logs/combined.log",
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: "logs/exceptions.log",
        }),
    ],
    rejectionHandlers: [
        new winston.transports.File({
            filename: "logs/rejections.log",
        }),
    ],
});

export default logger;

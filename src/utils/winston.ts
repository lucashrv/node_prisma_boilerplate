import winston from "winston";

const { combine, printf, colorize, timestamp, errors, json } = winston.format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
});

export const logger = winston.createLogger({
    level:
        process.env.NODE_ENV === "production"
            ? "info"
            : process.env.LOG_LEVEL || "debug",
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [
        new winston.transports.Console({
            format: combine(colorize(), customFormat),
        }),

        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "logs/combined.log" }),
    ],
    defaultMeta: { service: "service" },
    exceptionHandlers: [
        new winston.transports.File({ filename: "logs/exceptions.log" }),
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: "logs/rejections.log" }),
    ],
});

/*
    *Use in service files*
    Alter the service name.

    const serviceNameLogger = logger.child({ service: 'name-service' });
*/

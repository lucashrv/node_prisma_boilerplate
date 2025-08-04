import expressWinston from "express-winston";
import { transports, format } from "winston";

const { combine, printf, colorize, timestamp } = format;

const isProd = process.env.NODE_ENV === "production";

const consoleFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

const fileFormatLogger = printf(
    ({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`,
);

export const expressWinstonLogger = expressWinston.logger({
    level:
        process.env.NODE_ENV === "production"
            ? "info"
            : process.env.LOG_LEVEL || "debug",
    transports: [
        new transports.Console({
            level: isProd ? "error" : "debug",
            format: combine(colorize(), consoleFormat),
        }),
        new transports.File({ filename: "logs/combined.log" }),
        new transports.File({ filename: "logs/error.log", level: "error" }),
    ],
    format: combine(timestamp(), fileFormatLogger),
    meta: true,
    msg: (req, res) => `HTTP ${req.method} ${req.url} ${res.statusCode}`,
    expressFormat: false,
    colorize: false,
    statusLevels: { error: "error", warn: "warn" },
});

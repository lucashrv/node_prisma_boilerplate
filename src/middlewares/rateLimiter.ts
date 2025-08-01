import rateLimit from "express-rate-limit";

// Define rate limiter for User IP
const rateLimiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!.",
    statusCode: 429,
    headers: true,
});

export default rateLimiter;

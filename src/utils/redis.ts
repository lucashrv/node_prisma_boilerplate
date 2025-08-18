import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: +process.env.REDIS_PORT! || 6379,
    // username:
    // password:
});

export { redis };

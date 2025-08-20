import { env } from "@/schemas/zodSchema";
import Redis from "ioredis";

const redis = new Redis({
    host: env.REDIS_HOST || "127.0.0.1",
    port: +env.REDIS_PORT! || 6379,
    // username:
    // password:
});

export { redis };

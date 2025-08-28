import { z } from "zod";

export const envSchema = z
    .strictObject({
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
        PORT: z
            .string()
            .default("3000")
            .transform((port) => Number(port)),
        DATABASE_URL: z.url().min(1, "DATABASE_URL is required"),
        POSTGRES_USER: z.string().min(1, "POSTGRES_USER is required"),
        POSTGRES_PASSWORD: z.string().min(1, "POSTGRES_PASSWORD is required"),
        POSTGRES_DB: z.string().min(1, "POSTGRES_DB is required"),
        BCRYPT_SALT: z.string().min(1, "BCRYPT_SALT is required"),
        JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET is required"),
        JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
        JWT_EXPIRES_IN: z.string().min(1, "JWT_EXPIRES_IN is required"),
        LOG_LEVEL: z.enum(["info", "error", "debug"]).default("error"),
        REDIS_HOST: z.string().optional(),
        REDIS_PORT: z.string().optional(),
        COOKIE_SECRET: z.string().min(1, "COOKIE_SECRET is required"),
    })
    .loose();

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.log("Erro de validação das variáveis de ambiente:", _env.error);
    process.exit(1);
}

export const env = _env.data;

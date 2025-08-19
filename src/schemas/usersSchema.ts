import { Schema } from "@/middlewares/zodValidation";
import { z } from "zod";

export const createUserSchema: Schema = {
    bodySchema: z
        .strictObject({
            name: z.string(),
            email: z.email(),
            password: z.string().min(6),
            confirmPassword: z.string().min(6),
            role: z.enum(["USER", "ADMIN"]).optional(),
            photoUrl: z.string().optional(),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Senhas não coincidem",
            path: ["confirmPassword"],
        }),
};

export const loginUserSchema: Schema = {
    bodySchema: z.strictObject({
        email: z.email(),
        password: z.string().min(6),
    }),
};

export const emailParamSchema: Schema = {
    paramsSchema: z.strictObject({
        email: z.email(),
    }),
};

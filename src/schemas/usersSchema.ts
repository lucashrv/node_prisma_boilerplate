import { Schema } from "@/middlewares/zodValidation";
import { z } from "zod";

export const createUserSchema: Schema = {
    bodySchema: z
        .strictObject({
            name: z.string(),
            email: z.email(),
            password: z.string().min(6),
            confirmPassword: z.string().min(6),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: "Senhas não coincidem",
            path: ["confirmPassword"],
        }),
};

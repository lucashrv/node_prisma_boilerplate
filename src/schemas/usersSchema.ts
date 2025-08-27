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
        .superRefine((data, ctx) => {
            if (data.password !== data.confirmPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: "As senhas não coincidem.",
                    path: ["password", "confirmPassword"],
                });
            }
        }),
};

export const changeUserPassSchema: Schema = {
    paramsSchema: z.strictObject({
        id: z.string(),
    }),
    bodySchema: z
        .strictObject({
            currentPassword: z.string().min(6),
            newPassword: z.string().min(6),
            confirmNewPassword: z.string().min(6),
        })
        .superRefine((data, ctx) => {
            if (data.newPassword !== data.confirmNewPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: "As senhas não coincidem.",
                    path: ["newPassword", "confirmNewPassword"],
                });
            }
            if (data.currentPassword === data.newPassword) {
                ctx.addIssue({
                    code: "custom",
                    message: "Senha atual 'igual' a 'nova'.",
                    path: ["currentPassword", "newPassword"],
                });
            }
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

export const updateSchema: Schema = {
    paramsSchema: z.strictObject({
        id: z.string(),
    }),
    bodySchema: z.strictObject({
        name: z.string(),
        email: z.email(),
        role: z.enum(["USER", "ADMIN"]).default("USER"),
        photoUrl: z.string(),
        isActive: z.boolean(),
    }),
};

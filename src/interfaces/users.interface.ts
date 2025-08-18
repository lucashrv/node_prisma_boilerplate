import { User } from "@prisma/client";

export interface ICreateUser extends User {
    confirmPassword: string;
}

export const UserNoPassword = {
    id: true,
    name: true,
    email: true,
    role: true,
    photoUrl: true,
    isActive: true,
    lastLogin: true,
    passwordResetToken: true,
    passwordResetExpires: true,
    passwordChangedAt: true,
    createdAt: true,
    updatedAt: true,
};

import { Role, User } from "@prisma/client";

export interface ICreateUser extends User {
    confirmPassword: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface IUpdateUser {
    name: string;
    email: string;
    role: Role;
    photoUrl: string;
    isActive: boolean;
}

export const UserNoPassword = {
    id: true,
    name: true,
    email: true,
    role: true,
    photoUrl: true,
    isActive: true,
    lastLogin: true,
    passwordChangedAt: true,
    refreshToken: true,
    createdAt: true,
    updatedAt: true,
};

import { User } from "@prisma/client";

export interface ICreateUser extends User {
    confirmPassword: string;
}

import { User } from "@prisma/client";
import { handleServices } from "./handlers/handleServices";
import { NextFunction } from "express";
import bcrypt from "bcrypt";
import { ICreateUser } from "@/interfaces/users.interface";
import { BadRequestException } from "./handlers/handleErrors";

class UsersServices {
    public createUser = async (
        body: ICreateUser,
        next: NextFunction,
    ): Promise<User | void> => {
        const { name, email, password, confirmPassword } = body;

        const user = await handleServices.getOne<User>("user", { email });
        if (user) return next(new BadRequestException("E-mail já cadastrado."));

        if (password !== confirmPassword) {
            return next(new BadRequestException("Senhas não correspondem."));
        }

        const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT));
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await handleServices.create<User>(
            "user",
            {
                name,
                email,
                password: hash,
            },
            {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true,
                },
            },
        );

        return newUser;
    };

    public getAllUsers = async (): Promise<User[]> => {
        const users = await handleServices.getAll<User>("user");

        return users;
    };

    // public getUserById = async () => {
    // };

    // public updateUser = async () => {
    // };

    // public deleteUser = async () => {
    // };
}

export default UsersServices;

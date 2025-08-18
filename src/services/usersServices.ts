import { User } from "@prisma/client";
import { handleServices } from "./handlers/handleServices";
import { NextFunction } from "express";
import bcrypt from "bcrypt";
import { ICreateUser, UserNoPassword } from "@/interfaces/users.interface";
import {
    BadRequestException,
    NotFoundException,
} from "./handlers/handleErrors";

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

        const salt = bcrypt.genSaltSync(+process.env.BCRYPT_SALT!);
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
        const users = await handleServices.getAll<User>("user", {
            select: UserNoPassword,
        });

        return users;
    };

    public getUserById = async (id: string, next: NextFunction) => {
        const user = await handleServices.getOneById<User>("user", +id, {
            select: UserNoPassword,
        });

        if (!user) return next(new NotFoundException("Usuário não encontrado"));

        return user;
    };

    // public updateUser = async () => {
    // };

    // public deleteUser = async () => {
    // };
}

export default UsersServices;

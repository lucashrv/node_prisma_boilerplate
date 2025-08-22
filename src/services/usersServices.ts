import { User } from "@prisma/client";
import { handleServices } from "./handlers/handleServices";
import bcrypt from "bcrypt";
import {
    ICreateUser,
    ILoginUser,
    IUpdateUser,
    UserNoPassword,
} from "@/interfaces/users.interface";
import {
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
} from "./handlers/handleErrors";
import jwt from "jsonwebtoken";
import { env } from "@/schemas/zodSchema";
import { JwtUserPayload } from "@/types/express";

export interface IUserServices {
    createUser(body: ICreateUser): Promise<User>;
    login(body: ILoginUser): Promise<string>;
    getConnectedUser(connectedUser: JwtUserPayload): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    updateUser(body: IUpdateUser, id: number): Promise<User>;
}

export class UsersServices implements IUserServices {
    public createUser = async (body: ICreateUser) => {
        const { name, email, password, confirmPassword, role, photoUrl } = body;

        const user = await handleServices.getOne<User>("user", { email });

        if (user) throw new BadRequestException("E-mail já cadastrado.");
        if (password !== confirmPassword) {
            throw new BadRequestException("Senhas não correspondem.");
        }

        const salt = bcrypt.genSaltSync(+env.BCRYPT_SALT!);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await handleServices.create<User>(
            "user",
            {
                name,
                email,
                password: hash,
                role: role || "USER",
                photoUrl: photoUrl || "default_photo_url",
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

    public login = async (body: ILoginUser) => {
        const { email, password } = body;

        const user = await handleServices.getOne<User>("user", { email });

        if (!user) throw new NotFoundException("E-mail inválido");

        if (!user.isActive)
            throw new UnauthorizedException("Usuário desativado");

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) throw new BadRequestException("Senha inválida");

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name,
            },
            env.JWT_SECRET!,
            {
                expiresIn: "3d",
            },
        );

        await handleServices.update<User>("user", user.id, {
            lastLogin: new Date().toISOString(),
        });

        return token;
    };

    public getConnectedUser = async (connectedUser: JwtUserPayload) => {
        const { id } = connectedUser;

        const user = await handleServices.getOneById<User>("user", +id, {
            select: UserNoPassword,
        });

        return user;
    };

    public getAllUsers = async () => {
        const users = await handleServices.getAll<User>("user", {
            select: UserNoPassword,
        });

        return users;
    };

    public getUserById = async (id: number) => {
        const user = await handleServices.getOneById<User>("user", +id, {
            select: UserNoPassword,
        });

        if (!user) throw new NotFoundException("Usuário não encontrado");

        return user;
    };

    public getUserByEmail = async (email: string) => {
        const user = await handleServices.getOne<User>(
            "user",
            { email },
            {
                select: UserNoPassword,
            },
        );

        if (!user) throw new NotFoundException("Usuário não encontrado");

        return user;
    };

    public updateUser = async (body: IUpdateUser, id: number) => {
        const { name, email, photoUrl, role, isActive } = body;

        const user = await handleServices.getOneById<User>("user", id);
        if (!user) throw new NotFoundException("Usuário não encontrado");

        if (email !== user.email) {
            const emailExists = await handleServices.getOne<User>("user", {
                email,
            });
            if (emailExists)
                throw new BadRequestException("Email já cadastrado");
        }

        const update = await handleServices.update<User>(
            "user",
            id,
            {
                name,
                email,
                photoUrl,
                role,
                isActive,
            },
            { select: UserNoPassword },
        );

        return update;
    };

    public disabledUser = async (id: number) => {
        // Set User isActive = false
        const user = await this.getUserById(id);

        if (!user.isActive)
            throw new BadRequestException("Usuário já desabilitado");

        return await this.updateUser({ ...user, isActive: false }, id);
    };
}

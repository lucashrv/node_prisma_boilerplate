import { User } from "@prisma/client";
import { handleServices } from "./handlers/handleServices";
import bcrypt from "bcrypt";
import {
    ICreateUser,
    ILoginUser,
    UserNoPassword,
} from "@/interfaces/users.interface";
import {
    BadRequestException,
    NotFoundException,
} from "./handlers/handleErrors";
import jwt from "jsonwebtoken";
import { env } from "@/schemas/zodSchema";

export class UsersServices {
    public createUser = async (body: ICreateUser): Promise<User | void> => {
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

    public login = async (body: ILoginUser): Promise<string | void> => {
        const { email, password } = body;

        const user = await handleServices.getOne<User>("user", { email });

        if (!user) throw new NotFoundException("E-mail inválido");

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

        return token;
    };

    public getAllUsers = async (): Promise<User[]> => {
        const users = await handleServices.getAll<User>("user", {
            select: UserNoPassword,
        });

        return users;
    };

    public getUserById = async (id: string) => {
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

    // public updateUser = async () => {};

    // public deleteUser = async () => {
    // };
}

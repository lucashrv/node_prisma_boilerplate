import catchAsync from "@/utils/catchAsync";
import { RequestHandler } from "express";
import UsersServices from "@/services/usersServices";

class UsersController {
    private usersServices: UsersServices;

    constructor() {
        this.usersServices = new UsersServices();
    }

    public create: RequestHandler = catchAsync(async (req, res) => {
        const user = await this.usersServices.createUser(req.body);

        return res
            .status(201)
            .json({ message: "Usuário criado com sucesso", data: user });
    });

    public login: RequestHandler = catchAsync(async (req, res) => {
        const token = await this.usersServices.login(req.body);

        return res.status(200).json({
            message: "Autenticado do sucesso",
            token,
        });
    });

    public getAll: RequestHandler = catchAsync(async (req, res) => {
        const users = await this.usersServices.getAllUsers();
        return res.status(200).json(users);
    });

    public getById: RequestHandler = catchAsync(async (req, res) => {
        const user = await this.usersServices.getUserById(req.params.id!);
        return res.status(200).json(user);
    });

    public getByEmail: RequestHandler = catchAsync(async (req, res) => {
        const user = await this.usersServices.getUserByEmail(req.params.email!);
        return res.status(200).json(user);
    });
}

export default UsersController;

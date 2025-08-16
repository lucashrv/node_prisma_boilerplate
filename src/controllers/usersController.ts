import catchAsync from "@/utils/catchAsync";
import { RequestHandler } from "express";
import UsersServices from "@/services/usersServices";

class UsersController {
    private usersServices: UsersServices;

    constructor() {
        this.usersServices = new UsersServices();
    }

    public create: RequestHandler = catchAsync(async (req, res, next) => {
        const user = await this.usersServices.createUser(req.body, next);
        return res.status(201).json(user);
    });

    public getAll: RequestHandler = catchAsync(async (req, res) => {
        const users = await this.usersServices.getAllUsers();
        return res.status(200).json(users);
    });
}

export default UsersController;

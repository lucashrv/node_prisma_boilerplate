import catchAsync from "@/utils/catchAsync";
import { RequestHandler } from "express";
import UsersServices from "@/services/usersServices";

class UsersController {
    private usersServices: UsersServices;

    constructor() {
        this.usersServices = new UsersServices();
    }

    public getAll: RequestHandler = catchAsync(async (req, res, next) => {
        const users = await this.usersServices.getAllUsers(next);
        return res.status(200).json({ message: users });
    });
}

export default UsersController;

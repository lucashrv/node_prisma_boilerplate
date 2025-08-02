import catchAsync from "@/utils/catchAsync";
import { Request, Response } from "express";

class UsersController {
    public getAll = catchAsync(async (req: Request, res: Response) => {
        return res.status(200).send("List of users");
    });
}

export default UsersController;

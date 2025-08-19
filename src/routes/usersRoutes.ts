import UsersController from "@/controllers/usersController";
import { Router } from "express";
import { zodValidation } from "@/middlewares/zodValidation";
import {
    createUserSchema,
    emailParamSchema,
    loginUserSchema,
} from "@/schemas/usersSchema";
import { idParamSchema } from "@/schemas/genericSchema";

class UsersRoutes {
    private router: Router;
    private usersController: UsersController;

    constructor() {
        this.router = Router();
        this.usersController = new UsersController();
    }

    public init() {
        this.router.post(
            "/user/signup",
            zodValidation(createUserSchema),
            this.usersController.create,
        );
        this.router.post(
            "/user/login",
            zodValidation(loginUserSchema),
            this.usersController.login,
        );
        this.router.get("/users", this.usersController.getAll);
        this.router.get(
            "/user/id/:id",
            zodValidation(idParamSchema),
            this.usersController.getById,
        );
        this.router.get(
            "/user/email/:email",
            zodValidation(emailParamSchema),
            this.usersController.getByEmail,
        );

        return this.router;
    }
}

export default new UsersRoutes();

import UsersController from "@/controllers/usersController";
import { Router } from "express";
import { zodValidation } from "@/middlewares/zodValidation";
import { validateToken } from "@/middlewares/validateToken";
import { idParamSchema } from "@/schemas/genericSchema";
import {
    createUserSchema,
    emailParamSchema,
    loginUserSchema,
} from "@/schemas/usersSchema";
import { permissions } from "@/middlewares/permissionsVerify";

class UsersRoutes {
    private router: Router;
    private usersController: UsersController;

    constructor() {
        this.router = Router();
        this.usersController = new UsersController();
    }

    public init() {
        // Public Routes
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

        // Private Routes ADMIN
        this.router.get(
            "/users",
            validateToken,
            permissions(["ADMIN"]),
            this.usersController.getAll,
        );
        this.router.get(
            "/user/id/:id",
            validateToken,
            permissions(["ADMIN"]),
            zodValidation(idParamSchema),
            this.usersController.getById,
        );
        this.router.get(
            "/user/email/:email",
            validateToken,
            permissions(["ADMIN"]),
            zodValidation(emailParamSchema),
            this.usersController.getByEmail,
        );

        return this.router;
    }
}

export default new UsersRoutes();

import { Router } from "express";
import { zodValidation } from "@/middlewares/zodValidation";
import { validateToken } from "@/middlewares/validateToken";
import { permissions } from "@/middlewares/permissionsVerify";
import { idParamSchema } from "@/schemas/genericSchema";
import {
    createUserSchema,
    emailParamSchema,
    loginUserSchema,
    updateSchema,
} from "@/schemas/usersSchema";
import { UsersServices } from "@/services/usersServices";
import { UsersController } from "@/controllers/usersController";

class UsersRoutes {
    private router: Router;
    private usersController: UsersController;
    private usersServices: UsersServices;

    constructor() {
        this.router = Router();
        this.usersServices = new UsersServices();
        this.usersController = new UsersController(this.usersServices);
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
        this.router.put(
            "/user/:id",
            validateToken,
            permissions(["ADMIN"]),
            zodValidation(updateSchema),
            this.usersController.update,
        );
        this.router.put(
            "/user/disabled/:id",
            validateToken,
            permissions(["ADMIN"]),
            zodValidation(idParamSchema),
            this.usersController.disabled,
        );

        // Private Routes USER ADMIN
        this.router.get(
            "/user/connected",
            validateToken,
            permissions(["USER", "ADMIN"]),
            this.usersController.getConnected,
        );

        return this.router;
    }
}

export default new UsersRoutes();

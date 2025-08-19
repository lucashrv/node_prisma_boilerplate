import UsersController from "@/controllers/usersController";
import { zodValidation } from "@/middlewares/zodValidation";
import { createUserSchema } from "@/schemas/usersSchema";
import { Router } from "express";

class UsersRoutes {
    private router: Router;
    private usersController: UsersController;

    constructor() {
        this.router = Router();
        this.usersController = new UsersController();
    }

    public init() {
        this.router.post(
            "/user",
            zodValidation(createUserSchema),
            this.usersController.create,
        );
        this.router.get("/users", this.usersController.getAll);
        this.router.get("/user/id/:id", this.usersController.getById);
        this.router.get("/user/email/:email", this.usersController.getByEmail);

        return this.router;
    }
}

export default new UsersRoutes();

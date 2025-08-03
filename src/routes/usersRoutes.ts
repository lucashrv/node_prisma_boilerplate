import UsersController from "@/controllers/usersController";
import { Router } from "express";

class UsersRoutes {
    private router: Router;
    private usersController: UsersController;

    constructor() {
        this.router = Router();
        this.usersController = new UsersController();
    }

    public init() {
        this.router.get("/users", this.usersController.getAll);

        return this.router;
    }
}

export default new UsersRoutes();

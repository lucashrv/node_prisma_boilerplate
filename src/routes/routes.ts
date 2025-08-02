import { Router } from "express";
import UsersRoutes from "./usersRoutes";

class IndexRoutes {
    private router: Router;
    private usersRoutes: UsersRoutes;

    constructor() {
        this.router = Router();
        this.usersRoutes = new UsersRoutes();
        this.init();
    }

    public init() {
        this.router.use("/api", this.usersRoutes.init());

        return this.router;
    }
}

export default IndexRoutes;

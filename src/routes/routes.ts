import { Router } from "express";

// Routes
import UsersRoutes from "./usersRoutes";

class IndexRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.use("/api", UsersRoutes.init());

        return this.router;
    }
}

export default IndexRoutes;

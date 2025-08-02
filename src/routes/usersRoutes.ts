import { Router } from "express";

class UsersRoutes {
    private router: Router;

    constructor() {
        this.router = Router();
    }

    public init() {
        this.router.get("/users", (req, res) => {
            res.send("List of users");
        });

        return this.router;
    }
}

export default UsersRoutes;

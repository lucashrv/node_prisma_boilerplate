import { Router } from "express";

class IndexRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get("/", (req, res) => {
            res.send("Hello World");
        });

        return this.router;
    }
}

export default IndexRoutes;

import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import { swaggerDocument } from "@/docs";

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

        // Swagger Route
        if (process.env.NODE_ENV === "development") {
            this.router.use(
                "/api-docs",
                swaggerUI.serve,
                swaggerUI.setup(swaggerDocument),
            );
        }

        return this.router;
    }
}

export default IndexRoutes;

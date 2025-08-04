import express, { Application } from "express";
import { config } from "dotenv";
import cors from "cors";
import sanitizeMiddleware from "@/middlewares/sanitize";
import helmet from "helmet";
import rateLimiter from "./middlewares/rateLimiter";
import hpp from "hpp";
import globalErrorHandling from "@/middlewares/globalErrorHandling";
import routeNotFound from "@/middlewares/routeNotFound";
import IndexRoutes from "./routes/routes";
import { expressWinstonLogger } from "./middlewares/expressWinston";

config();

export default class App {
    private app: Application;
    private routes: IndexRoutes;

    constructor() {
        this.app = express();
        this.routes = new IndexRoutes();
        this.initializeMiddlewares();
    }

    private initializeMiddlewares() {
        // Parse incoming JSON, TEXT and URL-encoded data
        this.app.use(express.json({ limit: "10mb" }));
        this.app.use(express.text({ limit: "10mb" }));
        this.app.use(express.urlencoded({ extended: true }));

        // Enable CORS
        this.app.use(
            cors({
                origin: ["http://localhost:3001"],
                methods: [
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "PATCH",
                    "HEAD",
                    "OPTIONS",
                ],
            }),
        );

        // Sanitize input to prevent XSS attacks
        this.app.use(sanitizeMiddleware);

        // Set Helmet to secure HTTP headers
        this.app.use(helmet());

        // Rate limiting requests
        this.app.use("/api", rateLimiter);

        // Prevent HTTP Parameter Pollution (HPP) attacks
        this.app.use(
            hpp({
                // Parameters whitelist
                whitelist: [],
            }),
        );

        // Logger for HTTP requests
        this.app.use(expressWinstonLogger);

        // Initialize routes
        this.app.use(this.routes.init());

        // Route not found 404
        this.app.use(routeNotFound);

        // Global error handling
        this.app.use(globalErrorHandling);
    }

    public start(port: number) {
        this.app.listen(port, async () => {
            console.log(`Server started`);
        });
    }
}

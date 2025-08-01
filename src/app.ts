import express, { Application } from "express";
import { config } from "dotenv";

config();

export default class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares() {
        this.app.use(express.json({ limit: "10mb" }));
        this.app.use(express.text({ limit: "10mb" }));
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes() {
        this.app.get("/", (req, res) => {
            res.send("Hello World");
        });
    }

    public start(port: number) {
        this.app.listen(port, async () => {
            console.log(`Server started`);
        });
    }
}

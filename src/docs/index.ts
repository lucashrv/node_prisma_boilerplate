import { getUsersDoc } from "./users.doc";
import { env } from "@/schemas/zodSchema";

export const swaggerDocument = {
    openapi: "3.0.1",
    info: {
        title: "API Name",
        version: "1.0.0",
        description: "Documentation from API",
    },
    servers: [
        {
            url: `http://localhost:${env.PORT || 3000}`,
        },
    ],
    apis: ["./src/routes/*.ts"],
    schemas: ["http"],
    paths: {
        "/api/users": {
            get: getUsersDoc,
        },
    },
};

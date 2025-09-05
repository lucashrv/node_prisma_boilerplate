import { env } from "@/schemas/zodSchema";

//Docs
import { usersDocs } from "./users.doc";

export const swaggerDocument = {
    openapi: "3.0.1",
    info: {
        title: "BOILERPLATE",
        version: "1.0.0",
        description: "Documentation from BOILERPLATE",
    },
    servers: [
        {
            url: `http://localhost:${env.PORT || 3000}`,
        },
    ],
    apis: ["./src/routes/*.ts"],
    schemas: ["http"],
    paths: {
        ...usersDocs,
    },
};

import { JwtPayload } from "jsonwebtoken";

interface JwtUserPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
    name: string;
}

declare global {
    namespace Express {
        export interface Request {
            connectedUser?: JwtUserPayload;
        }
    }
}

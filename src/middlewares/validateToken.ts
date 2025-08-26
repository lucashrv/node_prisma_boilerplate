import { env } from "@/schemas/zodSchema";
import { JwtUserPayload } from "@/types/express";
import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const validateToken: RequestHandler = (req, res, next) => {
    try {
        // Bearer Token
        const authHeaders = req.headers["authorization"];
        const token = authHeaders && authHeaders.split(" ")[1];

        // Token Cookie Http-Only and signed
        // const token = req.signedCookies.token;

        if (!token)
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Acesso negado!" });

        const verifyToken = jwt.verify(token, env.JWT_SECRET) as JwtUserPayload;

        req.connectedUser = verifyToken;

        next();
    } catch {
        return res
            .status(StatusCodes.FORBIDDEN)
            .json({ message: "Token inválido" });
    }
};

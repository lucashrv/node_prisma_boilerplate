import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const validateToken: RequestHandler = (req, res, next) => {
    try {
        const authHeaders = req.headers["authorization"];
        const token = authHeaders && authHeaders.split(" ")[1];

        if (!token)
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Acesso negado!" });

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET!);

        req.connectedUser = verifyToken;

        next();
    } catch {
        return res
            .status(StatusCodes.FORBIDDEN)
            .json({ message: "Token inválido" });
    }
};

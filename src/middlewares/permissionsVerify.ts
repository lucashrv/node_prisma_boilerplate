import { handleServices } from "@/services/handlers/handleServices";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export enum Roles {
    USER = "USER",
    ADMIN = "ADMIN",
}

export const permissions = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.connectedUser?.id)
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Usuário não autenticado" });

        const user = await handleServices.getOneById<User>(
            "user",
            req.connectedUser.id,
            { select: { role: true, isActive: true } },
        );

        if (!user || !roles.includes(user.role)) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ message: "Você não possui permissões de acesso" });
        }

        if (!user.isActive) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "Usuário desativado" });
        }

        next();
    };
};

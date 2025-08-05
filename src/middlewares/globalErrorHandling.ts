/* eslint-disable */

import { Request, Response } from "express";
import AppError from "@/utils/appError";
import { NextFunction } from "express-serve-static-core";

const sendErrorDev = (err: AppError, res: Response) => {
    res.status(err.statusCode).json({
        message: err.message,
        name: err.name,
        status: err.status,
        statusCode: err.statusCode,
        isOperational: err.isOperational,
        stack: err.stack,
    });
};

const sendErrorProd = (err: AppError, req: Request, res: Response) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            message: err.message,
            status: err.status,
            statusCode: err.statusCode,
        });
    } else {
        res.status(500).json({
            message: "Internal Server Error",
            status: "error",
            statusCode: 500,
        });
    }
};

const handleErrors = {
    handleJWTError: () => new AppError("Token inválido", 401),
    handleJWTExpiredError: () =>
        new AppError("Token expirado, faça login novamente!", 401),
    PrismaClientInitializationError: () =>
        new AppError("Erro ao inicializar o Prisma", 400),
    prismaClientKnownRequestError: () =>
        new AppError("Erro na solicitação do Prisma", 400),
    PrismaClientRustPanicError: () =>
        new AppError("Erro interno do Prisma", 500),
    PrismaClientValidationError: () =>
        new AppError("Erro de validação do Prisma: ", 400),
};

const globalErrorHandling = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        error.message = err.message;
        error.name = err.name;

        // JWT
        if (error.name === "JsonWebTokenError")
            error = handleErrors.handleJWTError();
        if (error.name === "TokenExpiredError")
            error = handleErrors.handleJWTExpiredError();

        // Prisma
        if (error.name === "PrismaClientInitializationError")
            error = handleErrors.PrismaClientInitializationError();
        if (error.name === "PrismaClientKnownRequestError")
            error = handleErrors.prismaClientKnownRequestError();
        if (error.name === "PrismaClientRustPanicError")
            error = handleErrors.PrismaClientRustPanicError();
        if (error.name === "PrismaClientValidationError")
            error = handleErrors.PrismaClientValidationError();

        sendErrorProd(error, req, res);
    }
};

export default globalErrorHandling;

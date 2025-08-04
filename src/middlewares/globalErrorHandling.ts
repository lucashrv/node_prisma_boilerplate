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
        });
    }
};

const handleCastErrorDB = (err: any) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: any) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err: any) => {
    const errors = Object.values(err.errors).map((el: any) => el.message);

    const message = `Invalid input data. ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const handleJWTError = () => new AppError("Token inválido", 401);

const handleJWTExpiredError = () =>
    new AppError("Token expirado, faça login novamente!", 401);

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

        if (error.name === "CastError") error = handleCastErrorDB(error);
        if (error.name === "ValidationError")
            error = handleValidationErrorDB(error);
        if (error.name === "JsonWebTokenError") error = handleJWTError();
        if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

        sendErrorProd(error, req, res);
    }
};

export default globalErrorHandling;

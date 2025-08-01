import AppError from "@/utils/appError";
import { NextFunction, Request, Response } from "express";

const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Route not found '${req.originalUrl}'`, 404));
};

export default routeNotFound;

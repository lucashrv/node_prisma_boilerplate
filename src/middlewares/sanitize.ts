import { Request, Response, NextFunction } from "express";
import xss from "xss";

function sanitizeInput(obj: any): any {
    if (typeof obj === "string") {
        return xss(obj);
    } else if (Array.isArray(obj)) {
        return obj.map(sanitizeInput);
    } else if (obj !== null && typeof obj === "object") {
        const sanitizedObj: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                sanitizedObj[key] = sanitizeInput(obj[key]);
            }
        }
        return sanitizedObj;
    }
    return obj;
}

export default function sanitizeMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    if (req.body) req.body = sanitizeInput(req.body);

    if (req.query) {
        Object.keys(req.query).forEach((key) => {
            req.query[key] = sanitizeInput(req.query[key]);
        });
    }

    if (req.params) {
        Object.keys(req.params).forEach((key) => {
            req.params[key] = sanitizeInput(req.params[key]);
        });
    }

    next();
}

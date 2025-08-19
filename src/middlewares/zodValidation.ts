import { ZodType, z } from "zod";
import { Request } from "express";
import { Response } from "express";
import { NextFunction } from "express";

export type Schema = {
    querySchema?: ZodType;
    bodySchema?: ZodType;
    paramsSchema?: ZodType;
    headerSchema?: ZodType;
};

export const zodValidation =
    ({ querySchema, bodySchema, paramsSchema, headerSchema }: Schema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (querySchema) querySchema.parse(req.query);
            if (bodySchema) bodySchema.parse(req.body);
            if (paramsSchema) paramsSchema.parse(req.params);
            if (headerSchema) headerSchema.parse(req.headers);

            return next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({ zod_errors: err.issues });
            }
            next(err);
        }
    };

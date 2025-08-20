import { Schema } from "@/middlewares/zodValidation";
import { z } from "zod";

export const idParamSchema: Schema = {
    paramsSchema: z.strictObject({
        id: z.string(),
    }),
};

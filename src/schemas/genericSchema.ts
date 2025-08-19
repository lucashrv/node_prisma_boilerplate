import { Schema } from "@/middlewares/zodValidation";
import { z } from "zod";

export const idSchema: Schema = {
    paramsSchema: z.strictObject({
        id: z.string(),
    }),
};

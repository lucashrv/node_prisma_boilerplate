import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ModelName = keyof PrismaClient;

const getAll = async (model: ModelName) => {
    const getAll = await (prisma[model] as any).findMany();
    return getAll;
};

export const handleFactory = {
    getAll,
};

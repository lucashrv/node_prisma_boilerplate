/* eslint-disable */
import { PrismaClient } from "@prisma/client";
import { redis } from "@/utils/redis";

const prisma = new PrismaClient();

type ModelName = keyof PrismaClient;

const getAll = async <T>(model: ModelName): Promise<T[]> => {
    const modelCache = await redis.get(`${model.toString()}:get-all`);

    if (modelCache) return JSON.parse(modelCache);

    const getAll = await (prisma[model] as any).findMany();

    await redis.set(
        `${model.toString()}:get-all`,
        JSON.stringify(getAll),
        "EX",
        60 * 10,
    );

    return getAll;
};

const getOneById = async <T>(model: ModelName, id: string): Promise<T> => {
    const getOneById = await (prisma[model] as any).findUnique({
        where: {
            id,
        },
    });

    return getOneById;
};

const getOne = async <T>(
    model: ModelName,
    filter: object,
    options?: object,
): Promise<T> => {
    const getOne: Promise<T> = await (prisma[model] as any).findUnique({
        where: filter,
        ...options,
    });

    return getOne;
};

const create = async <T>(
    model: ModelName,
    data: object,
    options?: object,
): Promise<T> => {
    const create: Promise<T> = await (prisma[model] as any).create({
        data,
        ...options,
    });

    await redis.del(`${model.toString()}:get-all`);

    return create;
};

export const handleServices = {
    getAll,
    getOneById,
    getOne,
    create,
};

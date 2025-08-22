/* eslint-disable */
import { PrismaClient } from "@prisma/client";
import { redis } from "@/utils/redis";

const prisma = new PrismaClient();

type ModelName = keyof PrismaClient;

const getAll = async <T>(model: ModelName, options?: object): Promise<T[]> => {
    const modelCache = await redis.get(`${model.toString()}:get-all`);

    if (modelCache) return JSON.parse(modelCache);

    const getAll = await (prisma[model] as any).findMany(options);

    await redis.set(
        `${model.toString()}:get-all`,
        JSON.stringify(getAll),
        "EX",
        60 * 10,
    );

    return getAll;
};

const getOneById = async <T>(
    model: ModelName,
    id: string | number,
    options?: object,
): Promise<T> => {
    const getOneById = await (prisma[model] as any).findUnique({
        where: {
            id,
        },
        ...options,
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

const update = async <T>(
    model: ModelName,
    id: number,
    data: object,
    options?: object,
): Promise<T> => {
    const user: Promise<T> = await (prisma[model] as any).update({
        where: { id },
        data,
        ...options,
    });

    return user;
};

export const handleServices = {
    prisma,
    getAll,
    getOneById,
    getOne,
    create,
    update,
};

import { User } from "@prisma/client";
import { handleFactory } from "./handlers/handleFactory";
import { redis } from "@/utils/redis";

class UsersServices {
    public getAllUsers = async (): Promise<User[]> => {
        const usersCache = await redis.get("users-get-all");
        if (usersCache) return JSON.parse(usersCache);

        const users = await handleFactory.getAll("user");

        await redis.set("users-get-all", JSON.stringify(users), "EX", 60 * 10);

        return users;
    };

    // public getUserById = async () => {
    // };

    // public createUser = async () => {
    // };

    // public updateUser = async () => {
    // };

    // public deleteUser = async () => {
    // };
}

export default UsersServices;

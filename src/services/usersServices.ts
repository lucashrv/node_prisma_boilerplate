import { handleFactory } from "./handlers/handleFactory";

class UsersServices {
    public getAllUsers = async () => {
        const users = await handleFactory.getAll("user");
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

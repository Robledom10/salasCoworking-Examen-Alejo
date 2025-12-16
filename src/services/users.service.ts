import { User } from "../models/user.models"
import { pool } from "../config/conexion";

class UserService {
    async getUsersAll(): Promise<User[]> {
        const connection = await pool.getConnection();
        const [users] = await connection.query("SELECT * FROM users;");
        connection.destroy();
        return users as User[];
    }

    async getUsersById(id: number): Promise<User | undefined> {
        const connection = await pool.getConnection();
        const [users] = await connection.query("SELECT * FROM users WHERE id = ?", [id])
        connection.destroy();
        return (users as User[])[0]
    }

    async postUsers(user: Omit<User, "id">): Promise<User> {
        const connection = await pool.getConnection();
        const [inserted] = await connection.query("INSERT INTO users (name, email) VALUES (?, ?)", [user.name, user.email]);
        connection.destroy();
        return inserted as unknown as User;
    }

    async usersUpdated(id: number, data: Partial<Omit<User, "id">>): Promise<User | undefined> {
        const connection = await pool.getConnection();
        const users = await this.getUsersById(id);
        if (!users) return undefined;


        const [inserted]: any = await connection.query("UPDATE users SET ? WHERE id = ?", [data, id])
        connection.destroy();
        return inserted;
    }

    async usersDelete(id: number): Promise<boolean> {
        const exists = await this.getUsersById(id);

        if (exists) {
            const connection = await pool.getConnection();
            await connection.query("DELETE FROM users WHERE id = ?", [id]);
            connection.destroy();

            return true;
        } else {
            return false;
        }
    }
}
export const userService = new UserService();
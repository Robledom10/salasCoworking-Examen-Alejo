import { pool } from "../config/conexion";
import { Room } from "../models/rooms.models";

class RoomService {
    async getRoomsAll(): Promise<Room[]> {
        const connection = await pool.getConnection();
        const [rooms] = await connection.query("SELECT * FROM rooms;");
        connection.destroy();
        return rooms as Room[];
    }

    async getRoomsById(id: number): Promise<Room | undefined> {
        const connection = await pool.getConnection();
        const [rooms] = await connection.query("SELECT * FROM rooms WHERE id = ?", [id])
        connection.destroy();
        return (rooms as Room[])[0]
    }

    async postRooms(room: Omit<Room, "id">): Promise<Room> {
        try {
            const connection = await pool.getConnection();
            const normalizedRoom = {
                ...room,
                name: room.name.trim().toLowerCase()
            }

            const [inserted] = await connection.query("INSERT INTO rooms (name, capacity) VALUES (?, ?)", [normalizedRoom.name, room.capacity]);
            connection.destroy();

            return inserted as unknown as Room;

        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("ROOM" + room.name + "ya existe");
            }
            throw error;
        }

    }

    async updatedRooms(id: number, data: Partial<Omit<Room, "id">>): Promise<Room | undefined> {
        const connection = await pool.getConnection();
        const rooms = await this.getRoomsById(id);
        if (!rooms) return undefined;

        if (data.name) {
            data.name = data.name.trim().toLowerCase();
        }

        const [inserted]: any = await connection.query("UPDATE rooms SET ? WHERE id = ?", [data, id])
        connection.destroy();
        return inserted;
    }

    async deleteRooms(id: number): Promise<boolean> {
        const exists = await this.getRoomsById(id);

        if (exists) {
            const connection = await pool.getConnection();
            await connection.query("DELETE FROM rooms WHERE id = ?", [id]);
            connection.destroy();
            return true;
        } else {
            return false;
        }
    }
}

export const roomService = new RoomService();
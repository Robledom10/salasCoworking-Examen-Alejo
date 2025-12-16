import { pool } from "../config/conexion";
import { Booking } from "../models/bookings.models";

class BookingService {
    async getBookingAll(): Promise<Booking[]> {
        const connection = await pool.getConnection();
        const [Booking] = await connection.query("SELECT * FROM bookings;");
        connection.destroy();
        return Booking as Booking[];
    }

    async getBookingById(id: number): Promise<Booking | undefined> {
        const connection = await pool.getConnection();
        const [Booking] = await connection.query("SELECT * FROM bookings WHERE id = ?", [id])
        connection.destroy();
        return (Booking as Booking[])[0]
    }

    async postBooking(booking: Omit<Booking, "id">): Promise<Booking> {
        const connection = await pool.getConnection();

        try {
            if (booking.endTime <= booking.startTime) {
                throw new Error("endTime debe ser mayor que startTime");
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const bookingDate = new Date(booking.date);
            bookingDate.setHours(0, 0, 0, 0);

            if (bookingDate < today) {
                throw new Error("No se pueden crear reservas en fechas pasadas");
            }

            const [users]: any = await connection.query("SELECT id FROM users WHERE id = ?",
                [booking.userId]);

            if (users.length === 0) {
                throw new Error("El usuario no existe");
            }

            const [rooms]: any = await connection.query("SELECT id FROM rooms WHERE id = ?",
                [booking.roomId]
            );

            if (rooms.length === 0) {
                throw new Error("La sala no existe");
            }

            const [userBookings]: any = await connection.query("SELECT COUNT(*) AS total FROM bookings WHERE user_id = ? AND date = ?",
                [booking.userId, booking.date]
            );

            if (userBookings[0].total >= 2) {
                throw new Error("El usuario ya tiene 2 reservas ese día");
            }

            const [overlaps]: any = await connection.query(`SELECT id FROM bookings WHERE room_id = ? AND date = ? AND start_time < ? AND end_time > ?`,
                [booking.roomId, booking.date, booking.endTime, booking.startTime]);

            if (overlaps.length > 0) {
                throw new Error("La sala ya está reservada en ese horario");
            }

            const [result]: any = await connection.query(`INSERT INTO bookings (user_id, room_id, date, start_time, end_time) VALUES (?, ?, ?, ?, ?)`,
                [booking.userId, booking.roomId, booking.date, booking.startTime, booking.endTime]);

            return {
                id: result.insertId,
                ...booking
            };

        } finally {
            connection.destroy();
        }
    }

    async getBookingsByRoomId(roomId: number): Promise<Booking[]> {
        const connection = await pool.getConnection();

        const [bookings] = await connection.query(`SELECT * FROM bookings WHERE room_id = ? ORDER BY date, start_time`,
            [roomId]);

        connection.release();
        return bookings as Booking[];
    }


    async updatedBooking(id: number, data: Partial<Omit<Booking, "id">>): Promise<Booking | undefined> {
        const connection = await pool.getConnection();
        const booking = await this.getBookingById(id);
        if (!booking) return undefined

        const [inserted]: any = await connection.query("UPDATE bookings SET ? WHERE id = ?", [data, id])
        connection.destroy();
        return inserted
    }

    async deleteBooking(id: number): Promise<boolean> {
        const exists = await this.getBookingById(id);

        if (exists) {
            const connection = await pool.getConnection();
            await connection.query("DELETE FROM bookings WHERE id = ?", [id]);
            connection.destroy();
            return true;
        } else {
            return false;
        }
    }
}

export const bookingService = new BookingService();
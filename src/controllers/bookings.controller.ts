import { Request, Response } from "express"
import { bookingService } from "../services/bookings.service";
import { Booking } from "../models/bookings.models";

export const bookingController = {
    getBookingsAll: async (req: Request, res: Response) => {
        const bookings = await bookingService.getBookingAll();
        return res.json(bookings);
    },

    getBookingById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        const bookings = await bookingService.getBookingById(id);

        if (!bookings) {
            return res.status(404).json({ message: "ROOM no encontrados" })
        }

        return res.json(bookings)
    },

    getBookingsByRoom: async (req: Request, res: Response) => {
        const roomId = Number(req.params.id);

        if (isNaN(roomId) || roomId <= 0) {
            return res.status(400).json({
                message: "roomId inválido"
            });
        }

        const bookings = await bookingService.getBookingsByRoomId(roomId);

        return res.json(bookings);


    },

    postBookings: async (req: Request, res: Response) => {
        const body: Omit<Booking, "id"> = req.body;

        const booking = await bookingService.postBooking(body);

        return res.status(201).json({ message: "Reserva creada correctamente", booking });

    },

    updateBookings: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { userId, roomId, date, startTime, endTime } = req.body;

        const updated = bookingService.updatedBooking(id, { userId, roomId, date, startTime, endTime });

        if (!updated) {
            return res.status(404).json({ message: "ROOM no encontrado" });
        }
        return res.json({
            message: "ROOM actualizado",
            todo: updated,
        });
    },

    deleteBookings: async (req: Request, res: Response) => {
        const { id } = req.params;

        const deleted = await bookingService.deleteBooking(parseInt(id))

        return res.json({ message: "ROOM eliminado", deleted });
    }
}
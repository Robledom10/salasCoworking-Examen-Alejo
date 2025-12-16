import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^\d{2}:\d{2}$/;

export const createBookingSchema = z.object({
    userId: z.number().int().positive("userId inválido"),
    roomId: z.number().int().positive("roomId inválido"),
    date: z.string().regex(dateRegex, "Formato de fecha inválido (YYYY-MM-DD)"),
    startTime: z.string().regex(timeRegex, "Formato de hora inválido (HH:mm)"),
    endTime: z.string().regex(timeRegex, "Formato de hora inválido (HH:mm)"),
}).refine(
    (data) => data.startTime < data.endTime,
    {
        message: "endTime debe ser mayor que startTime",
        path: ["endTime"],
    }
);

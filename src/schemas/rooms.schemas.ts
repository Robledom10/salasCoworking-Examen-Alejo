import { z } from "zod";

export const createRoomSchema = z.object({
    name: z.string().min(2, "El nombre debe tener mínimo 2 caracteres"),
    capacity: z.number().int().positive("La capacidad debe ser mayor a 0"),
});

export const updateRoomSchema = createRoomSchema.partial();

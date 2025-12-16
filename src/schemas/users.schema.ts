import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(2, "El nombre debe tener mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
});

export const updateUserSchema = createUserSchema.partial();

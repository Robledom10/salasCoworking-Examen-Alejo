import { Room } from "../models/rooms.models";
import { Request, Response } from "express";
import { roomService } from "../services/rooms.service";

export const roomController = {
    getRoomsAll: async (req: Request, res: Response) => {
        const rooms = await roomService.getRoomsAll();
        return res.json(rooms);
    },

    getRoomsById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        const rooms = await roomService.getRoomsById(id);

        if (!rooms) {
            return res.status(404).json({ message: "ROOM no encontrados" })
        }

        return res.json(rooms)
    },

      postRooms: async (req: Request, res: Response) => {
            const body: Omit<Room, "id"> = req.body;
    
            const rooms = await roomService.postRooms(body);
    
            return res.status(201).json({ message: "ROOM creado correctamente", rooms });
    
        },
    
        updateRooms: async (req: Request, res: Response) => {
            const id = parseInt(req.params.id);
            const { name, capacity } = req.body;
    
            const updated = roomService.updatedRooms(id, { name, capacity });
    
            if (!updated) {
                return res.status(404).json({ message: "ROOM no encontrado" });
            }
            return res.json({
                message: "ROOM actualizado",
                todo: updated,
            });
        },
    
        deleteRooms: async (req: Request, res: Response) => {
            const { id } = req.params;
    
            const deleted = await roomService.deleteRooms(parseInt(id))
    
            return res.json({ message: "ROOM eliminado", deleted});
        }
}
import { User } from '../models/user.models';
import { Request, Response } from 'express';
import { userService } from '../services/users.service';

export const userController = {
    getUsers: async (req: Request, res: Response) => {
        const users = await userService.getUsersAll();
        return res.json(users)
    },

    getUsersById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        const users = await userService.getUsersById;

        if (!users) {
            return res.status(404).json({ message: "USERS no encontrados" })
        }

        return res.json(users)
    },

    postUsers: async (req: Request, res: Response) => {
        const body: Omit<User, "id"> = req.body;

        const user = await userService.postUsers(body);

        return res.status(201).json({ message: "USER creado correctamente", user });

    },

    updateUsers: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { name, email } = req.body;

        const updated = userService.usersUpdated(id, { name, email });

        if (!updated) {
            return res.status(404).json({ message: "USER no encontrado" });
        }
        return res.json({
            message: "USER actualizado",
            todo: updated,
        });
    },

    deleteUser: async (req: Request, res: Response) => {
        const { id } = req.params;

        const deleted = await userService.usersDelete(parseInt(id))

        return res.json({ message: "USER eliminado" });
    }
}


import { Router } from "express";
import { roomController } from "../controllers/rooms.controller";
import { validateSchema } from "../middleware/validateSchema";
import { createRoomSchema, updateRoomSchema } from "../schemas/rooms.schemas";

const router = Router();

router.get("/", roomController.getRoomsAll);
router.get("/:id", roomController.getRoomsById);
router.post("/", validateSchema(createRoomSchema),roomController.postRooms);
router.put("/:id", validateSchema(updateRoomSchema),roomController.updateRooms);
router.delete("/:id", roomController.deleteRooms);

export default router
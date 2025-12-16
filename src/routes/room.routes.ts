import { Router } from "express";
import { roomController } from "../controllers/rooms.controller";

const router = Router();

router.get("/", roomController.getRoomsAll);
router.get("/:id", roomController.getRoomsById);
router.post("/", roomController.postRooms);
router.put("/:id", roomController.updateRooms);
router.delete("/:id", roomController.deleteRooms);

export default router
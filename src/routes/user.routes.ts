import { Router } from "express";
import { userController } from "../controllers/user.controller"

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUsersById);
router.post("/", userController.postUsers);
router.put("/:id", userController.updateUsers);
router.delete("/:id", userController.deleteUser);

export default router
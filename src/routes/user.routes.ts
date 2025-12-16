import { Router } from "express";
import { userController } from "../controllers/user.controller"
import { validateSchema } from "../middleware/validateSchema";
import { createUserSchema, updateUserSchema } from "../schemas/users.schema";

const router = Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUsersById);
router.post("/", validateSchema(createUserSchema), userController.postUsers);
router.put("/:id", validateSchema(updateUserSchema), userController.updateUsers);
router.delete("/:id", userController.deleteUser);

export default router
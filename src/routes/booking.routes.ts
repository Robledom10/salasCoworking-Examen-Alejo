import { Router } from "express";
import { bookingController } from "../controllers/bookings.controller";
import { validateSchema } from "../middleware/validateSchema";
import { createBookingSchema, updateBookingSchema } from "../schemas/bookings.schemas";


const router = Router();

router.get("/", bookingController.getBookingsAll);
router.get("/:id", bookingController.getBookingsAll);
router.get("/:id", bookingController.getBookingsByRoom)
router.post("/", validateSchema(createBookingSchema),bookingController.postBookings);
router.put("/:id",validateSchema(updateBookingSchema), bookingController.updateBookings );
router.delete("/:id", bookingController.deleteBookings);

export default router
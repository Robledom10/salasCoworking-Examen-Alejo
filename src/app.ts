import("./config/env")
import express from "express";
import userRouter from "./routes/user.routes"
import roomRouter from "./routes/room.routes"
import { loggerMiddleware } from "./middleware/logger.middleware.";
import { errorMiddleware } from "./middleware/error.middleware";


const app = express();

app.use(express.json())
app.use(loggerMiddleware)

app.use("/users", userRouter)
app.use("/rooms", roomRouter)
app.use("/bookings",)

app.use(errorMiddleware)

export default app;
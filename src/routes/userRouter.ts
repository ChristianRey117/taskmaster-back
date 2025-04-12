import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.post("/add", userController.registerUser);
userRouter.post("/", userController.loginUser);
userRouter.get("/:id/tasks", userController.getAllTaskUser);

export default userRouter;

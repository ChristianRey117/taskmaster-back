import { Router } from "express";
import taskRoutes from "./taskRouter";
import userRoutes from "./userRouter";

const router = Router();

router.use("/task", taskRoutes);
router.use("/user", userRoutes);

export default router;

import { Router } from "express";
import taskRoutes from "./taskRouter";
import userRoutes from "./userRouter";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = Router();

router.use("/task", authenticateJWT, taskRoutes);
router.use("/user", userRoutes);

export default router;

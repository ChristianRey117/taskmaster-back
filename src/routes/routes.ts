import { Router } from "express";
import taskRoutes from "./taskRouter";

const router = Router();

router.use("/task", taskRoutes);

export default router;

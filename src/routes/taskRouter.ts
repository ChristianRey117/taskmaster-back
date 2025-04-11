import { Router } from "express";
import taskController from "../controllers/taskController";
import { taskMiddleware } from "../middleware/taskMiddleware";

const taskRouter = Router();

taskRouter.get("/", taskController.getAllTask);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.post("/", taskMiddleware, taskController.postTask);
taskRouter.put("/:id", taskMiddleware, taskController.putTask);
taskRouter.delete("/:id", taskController.deleteTask);

export default taskRouter;

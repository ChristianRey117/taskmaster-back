import { Router } from "express";
import taskController from "../controllers/taskController";

const taskRouter = Router();

taskRouter.get("/", taskController.getAllTask);
taskRouter.get("/:id", taskController.getProductById);
taskRouter.post("/", taskController.postTask);

export default taskRouter;

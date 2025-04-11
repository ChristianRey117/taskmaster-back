import { Request, Response } from "express";
import taskService from "../services/taskService";
import { sendError, sendSuccess } from "../utils/requestHandler";

class TaskController {
  async getAllTask(req: Request, res: Response) {
    try {
      const tasks = await taskService.getAllTask();
      sendSuccess(res, tasks);
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const task = await taskService.getProductById(id);
      if (task) {
        sendSuccess(res, task);
      } else {
        sendError(res, "Task not found");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async postTask(req: Request, res: Response) {
    try {
      const data = req.body;
      const task = taskService.postTask(data);
      if (task) {
        sendSuccess(res, task);
      } else {
        sendError(res, "Task not created");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new TaskController();

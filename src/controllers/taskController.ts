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

  async getTaskById(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const task = await taskService.getTaskById(id);
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
      const task = await taskService.postTask(data);
      if (task) {
        sendSuccess(res, task);
      } else {
        sendError(res, "Task not created");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async putTask(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const data = req.body;
      const task = await taskService.putTask(data, id);

      if (task) {
        sendSuccess(res, task);
      } else {
        sendError(res, `Product not found`, 404);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const deleted = await taskService.deleteTask(id);
      if (deleted) {
        sendSuccess(res, {});
      } else {
        sendError(res, `Product not found`, 404);
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new TaskController();

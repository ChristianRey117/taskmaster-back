import { Request, Response } from "express";
import userService from "../services/userService";
import { sendError } from "utils/requestHandler";

class UserController {
  async getUserById(req: Request, res: Response) {
    try {
      const id = Number(req.params["id"]);
      const user = await userService.getUserById(id);
      if (user) {
        //   sendSuccess(res, task);
      } else {
        sendError(res, "Task not found");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new UserController();

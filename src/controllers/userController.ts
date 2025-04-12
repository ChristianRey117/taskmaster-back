import { Request, Response } from "express";
import userService from "../services/userService";
import { sendError } from "../utils/requestHandler";
import bcrypt from "bcrypt";
import { IUser } from "models/user";

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

  async registerUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Verifica si el usuario ya existe por email o username
      const existingUser = await userService.verifyIfExistUser(email);
      if (existingUser) {
        sendError(res, "User is register", 409);
      }

      // Hashea la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crea un nuevo usuario
      const newUser = await userService.registerUser({
        email: email,
        password: hashedPassword,
      } as IUser);

      if (newUser) {
        res.status(201).json({ message: "User register success." });
      } else {
        sendError(res, "Error to register user");
      }
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
      sendError(res, error.message, 500);
    }
  }
}

export default new UserController();

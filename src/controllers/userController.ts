import { Request, Response } from "express";
import userService from "../services/userService";
import { sendError } from "utils/requestHandler";
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
      const existingUser = await this.findIsExistUser(email);
      if (existingUser) {
        return res.status(409).json({
          message: "El usuario o el correo electrónico ya están registrados.",
        });
      }

      // Hashea la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crea un nuevo usuario
      const newUser = await userService.registerUser({
        email: email,
        password: hashedPassword,
      } as IUser);

      if (newUser) {
        res.status(201).json({ message: "Usuario registrado exitosamente." });
      } else {
        sendError(res, "Error to register user");
      }
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
      sendError(res, error.message, 500);
    }
  }

  async findIsExistUser(email: string): Promise<boolean> {
    return false;
  }
}

export default new UserController();

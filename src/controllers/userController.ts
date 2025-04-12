import { Request, Response } from "express";
import userService from "../services/userService";
import { sendError, sendSuccess } from "../utils/requestHandler";
import { idUserHandler } from "../utils/idUserHandler";
import bcrypt from "bcrypt";
import { IUser } from "models/user";
import jwt from "jsonwebtoken";
import { AuthPayload } from "middleware/authMiddleware";

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

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Busca al usuario por su correo electrónico
      const user = await userService.verifyIfExistUser(email);
      if (!user) {
        sendError(res, "Incorrect information.", 401);
      }

      const userVerify = await userService.getUserByEmail(email);

      // Compara la contraseña proporcionada con la contraseña hasheada en la base de datos
      const isPasswordValid = await bcrypt.compare(
        password,
        userVerify.password
      );
      if (!isPasswordValid) {
        sendError(res, "Incorrect Information.", 401);
      }

      // Crea un token JWT
      const token = jwt.sign({ userId: userVerify.id }, "JWT_SECRET", {
        expiresIn: "1h",
      }); // Ajusta la expiración según tus necesidades

      res.json({ token });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ message: "Error al iniciar sesión." });
    }
  }

  async getAllTaskUser(req: Request, res: Response) {
    try {
      const iduser = idUserHandler(req);
      if (iduser) {
        const taskUser = await userService.getTasksByIdUser(
          Number(iduser.userId)
        );
        if (taskUser) {
          sendSuccess(res, taskUser);
        } else {
          sendError(res, "Error to get task");
        }
      } else {
        sendError(res, "Error to get task");
      }
    } catch (error: any) {
      sendError(res, error.message);
    }
  }
}

export default new UserController();

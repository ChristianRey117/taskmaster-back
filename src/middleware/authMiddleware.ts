import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userService from "../services/userService";
import { sendError } from "../utils/requestHandler";

// Define una interfaz para el payload del token
interface AuthPayload {
  userId: string;
}

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers["authorization"];

  if (!authHeader?.startsWith("Bearer ")) {
    sendError(res, "Access denied", 401);
    return res.status(401).json({
      message: "Acceso denegado. Token no proporcionado o formato incorrecto.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, "JWT_SECRET") as AuthPayload;
    // Busca al usuario en la base de datos basado en el ID del token
    const user = await userService.getUserById(Number(decoded.userId));
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    // Adjunta el usuario al objeto de la solicitud para que esté disponible en las rutas protegidas
    (req as any).user = user;
    next(); // Permite el acceso a la siguiente ruta
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(403).json({ message: "Token inválido." }); // Token inválido
  }
};

import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const taskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3).max(1000),
  description: z.string().min(3).max(1000),
  state: z.enum(["TODO", "DOING", "DONE"]),
});

export type validatedTaskData = z.infer<typeof taskSchema>;

export const taskMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    // Si la validación es exitosa, adjunta los datos validados al objeto de la solicitud
    (req as any).validatedData = validatedData;
    next(); // Pasa al siguiente middleware o ruta
  } catch (error) {
    // Si la validación falla, el error será una instancia de ZodError
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      // Maneja otros tipos de errores si es necesario
      console.error("Error unexpected:", error);
      res.status(500).json({ message: "Error server validation." });
    }
  }
};

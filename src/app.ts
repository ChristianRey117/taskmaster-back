import express, { Request, Response } from "express";
import db from "./database/database";

const app = express();
const PORT = 3000;

app.get("/", async (req: Request, res: Response) => {
  const result = await db.query("SELECT * FROM task");
  console.log(result);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Express is running in port: ${PORT}`);
});

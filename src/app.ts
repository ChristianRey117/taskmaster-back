import express, { Request, Response } from "express";
import db from "./database/database";
import routes from "./routes/routes";
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  const result = await db.query("SELECT * FROM task");
  console.log(result);
  res.json(result);
});
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Express is running in port: ${PORT}`);
});

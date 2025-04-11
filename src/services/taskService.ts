import db from "../database/database";
import { ITask } from "../models/task";
import { ResultSetHeader, RowDataPacket } from "mysql2";

class TaskService {
  async getAllTask(): Promise<ITask[]> {
    const task = await db.query<RowDataPacket[]>("SELECT * FROM task");
    return task as ITask[];
  }

  async getTaskById(id: number): Promise<ITask | null> {
    const task = await db.query<RowDataPacket[]>(
      "SELECT * FROM task WHERE id = ?",
      id
    );
    if (Array.isArray(task) && task.length > 0) {
      return task[0] as ITask;
    }
    return null;
  }

  async postTask(data: ITask): Promise<ITask | null> {
    const result = await db.query<ResultSetHeader>(
      `INSERT INTO task SET ?`,
      data
    );
    if (result.insertId) {
      return await this.getTaskById(result.insertId);
    }
    return null;
  }

  async putTask(data: ITask, id: number): Promise<ITask | null> {
    const result = await db.query<ResultSetHeader>(
      `UPDATE task SET ? WHERE id = ?`,
      [data, id]
    );

    if (result.affectedRows) {
      return await this.getTaskById(id);
    }
    return null;
  }
}

export default new TaskService();

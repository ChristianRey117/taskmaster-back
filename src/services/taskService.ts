import db from "../database/database";
import { ITask } from "../models/task";

class TaskService {
  async getAllTask(): Promise<ITask[]> {
    const task = await db.query("SELECT * FROM task");
    return task as ITask[];
  }

  async getProductById(id: number): Promise<ITask | null> {
    const task = await db.query("SELECT * FROM task WHERE id = ?", id);
    if (Array.isArray(task) && task.length > 0) {
      return task[0] as ITask;
    }
    return null;
  }
}

export default new TaskService();

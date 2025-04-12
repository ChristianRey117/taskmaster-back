import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../database/database";
import { IUser } from "models/user";

class User {
  async getUserById(id: number) {
    const user = await db.query<RowDataPacket[]>(
      "SELECT * FROM user WHERE id = ?",
      id
    );
    if (Array.isArray(user) && user.length > 0) {
      return user[0] as IUser;
    }
    return null;
  }

  async registerUser(data: IUser) {
    const result = await db.query<ResultSetHeader>(
      `INSERT INTO user SET ?`,
      data
    );
    if (result.insertId) {
      return await this.getUserById(result.insertId);
    }
    return null;
  }
}

export default new User();

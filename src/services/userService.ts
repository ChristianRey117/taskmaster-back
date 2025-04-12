import { RowDataPacket } from "mysql2";
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
}

export default new User();

import mysql2, { ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { config } from "../configDatabase";

const pool = mysql2.createPool(config);

class Database {
  async query<T extends RowDataPacket[] | ResultSetHeader>(
    sql: string,
    values: any = null
  ) {
    const connection = await pool.getConnection();

    try {
      const [result] = await connection.query(sql, values);
      return result as T;
    } finally {
      connection.release();
    }
  }
}

export default new Database();

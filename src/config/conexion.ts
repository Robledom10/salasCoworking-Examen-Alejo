import mysql2 from "mysql2/promise";
import "../config/env";

export const pool = mysql2.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    port: Number(process.env.DB_PORT) || 3306
});

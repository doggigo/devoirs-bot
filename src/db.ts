import type { Connection } from "mysql";
import mysql from "mysql";
import type { Matiere } from "./types";

export function createDevoirsConnection(host: string, username: string, password: string, dbName: string) {
  return mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: dbName,
  });
}

export function addDevoir(connection: Connection, matiere: Matiere, date: string, contenu: string) {
  return new Promise((resolve, reject) => {
    connection.commit();
    connection.query(
      "INSERT INTO Devoirs(matiere, date_limite, contenu) VALUES (?, ?, ?)",
      [matiere, date, contenu],
      (error) => {
        error ? reject(error) : resolve(true);
      }
    );
  });
}

export function getDevoirs(connection: Connection) {
  return new Promise<null|Object>((resolve, reject) => connection.query("SELECT * FROM Devoirs",(error, result:Object|null, fields) => {
    error? reject(error) : resolve(result)
  }));
}

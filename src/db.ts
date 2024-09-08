import type { Connection } from "mysql";
import mysql from "mysql";
import type { Matiere } from "./types";

export function createDevoirsConnection(
  host: string,
  username: string,
  password: string,
  dbName: string
) {
  return mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: dbName,
  });
}

export function addDevoir(
  connection: Connection,
  matiere: Matiere,
  date: string,
  contenu: string
) {
  return new Promise((resolve, reject) => {
    connection.commit();
    connection.query(
      "INSERT INTO Devoirs(matiere, date_limite, contenu) VALUES (?, ?, ?)",
      [matiere, date, contenu],
      (error, results, fields) => {
        error ? reject(error) : resolve(results);
      }
    );
  });
}

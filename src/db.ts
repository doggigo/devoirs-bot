import type { Connection } from 'mysql';
import mysql from 'mysql';
import type { Matiere } from './types';

export function createDevoirsConnection(host:string, username:string, password:string, dbName:string) {
  return mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: dbName
  });
}

export async function addDevoir(connection: Connection, matiere:Matiere, date:string, contenu:string) {
  try {
    //connection.execute('INSERT INTO Devoirs(matiere, date_limite, contenu) VALUES (?, ?, ?)', [matiere, date, contenu]);
    return true;
  } catch {
    return false;
  }
}
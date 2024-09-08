import type { Connection } from 'mysql2';
import mysql from 'mysql2/promise';
import type { Matiere } from './types';

export async function createConnection(host:string, username:string, password:string, dbName:string) {
  return await mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: dbName
  });
}

export async function addDevoir(connection: Connection, matiere:Matiere, date:string, content:string) {
  try {
    connection.execute('INSERT INTO Devoirs VALUES (?, ?, ?)', [matiere, date, content]);
    return true;
  } catch {
    return false;
  }
}
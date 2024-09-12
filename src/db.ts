import type { Matiere } from "./types";
import sqlite from "bun:sqlite"

export function addDevoir(matiere: Matiere, date: string, contenu: string) {
  
}

// export function getDevoirs(connection: Connection) {
//   return new Promise<null | Object>((resolve, reject) =>
//     connection.query("SELECT * FROM Devoirs", (error, result: Object | null, fields) => {
//       error ? reject(error) : resolve(result);
//     })
//   );
// }

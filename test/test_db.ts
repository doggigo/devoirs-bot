import sqlite from 'bun:sqlite'

let db = sqlite.open('devoirs.db');
console.log(db.query('SELECT * FROM Devoirs').all());

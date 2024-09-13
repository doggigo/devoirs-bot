import sqlite from 'bun:sqlite'

let db = sqlite.open('devoirs.db');
db.query('SELECT * FROM Devoirs').all();
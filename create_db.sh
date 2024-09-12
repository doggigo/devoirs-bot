#!/bin/bash
DB_NAME="devoirs.db"

SQL_COMMAND="CREATE TABLE IF NOT EXISTS Devoirs (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    matiere TEXT,
    date_rendu DATE,
    contenu TEXT
);"

sqlite3 "$DB_NAME" "$SQL_COMMAND"

echo "Database '$DB_NAME' created."
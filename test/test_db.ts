import mysql from 'mysql2/promise'

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = Bun.env;
async function main() {

  console.log(`${DB_USERNAME}@${DB_HOST} PASSWORD : ${DB_PASSWORD} ON DB '${DB_NAME}'`)
  return await mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
  });
}

main();
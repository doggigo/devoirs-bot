import mysql from 'mysql';

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = Bun.env;
async function main() {

  console.log(`${DB_USERNAME}@${DB_HOST} PASSWORD : ${DB_PASSWORD} ON DB '${DB_NAME}'`)
  let conn = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    port:3306,
    password: DB_PASSWORD,
    database: DB_NAME
  });
}

main();
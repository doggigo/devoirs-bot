import server from "bunrest";
import { db } from ".";

const { SERVER_PORT } = Bun.env;

if (!SERVER_PORT) {
  console.error("No SECRET_KEY environment variable set");
  process.exit(1);
}

const app = server();


app.get("/devoirs", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (typeof req.query?.date != "string" || typeof req.query?.subject != "string") {
    return res.status(422).json({error: "Bad arguments"});
  }
  const { date, subject } = req.query;

  let devoirs = db.query('SELECT * FROM Devoirs WHERE date_rendu = ? AND matiere = ?').all(date,subject);

  if (devoirs) {
  console.log(devoirs);
    res.status(200).json(devoirs);
  } else {
    res.status(404).json({ error: "No results" });
  }
});

export const startBackend = async () => {
  app.listen(SERVER_PORT, () => {
  console.log(`Server started on port ${SERVER_PORT}`);
  })
}
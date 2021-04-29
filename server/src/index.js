import express from "express";
import morgan from "morgan";
import { sequelize } from "./db";
import { User } from "./models/User";

async function main() {
  await sequelize.authenticate();
  await sequelize.sync();

  const app = express();

  app.use(morgan("dev"));
  app.use(express.json());

  app.listen(5000, () => {
    console.log("http://localhost:5000");
  });
}

main();

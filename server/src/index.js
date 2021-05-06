import express from "express";
import sequelize from "./db";
import authRoutes from "./routes/auth";

const main = async () => {
  await sequelize.authenticate();

  const app = express();

  app.use(authRoutes);

  app.listen(5000, () => {
    console.log("Listening at http://localhost:5000");
  });
};

main();

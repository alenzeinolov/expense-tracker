import express from "express";
import morgan from "morgan";
import cors from "cors";
import sequelize from "./db";
import authRoutes from "./routes/auth";
import expenseRoutes from "./routes/expenses";

const main = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  const app = express();

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors({ origin: "http://localhost:3000" }));

  app.use("/auth", authRoutes);
  app.use("/expenses", expenseRoutes);

  app.listen(5000, () => {
    console.log("Listening at http://localhost:5000");
  });
};

main();

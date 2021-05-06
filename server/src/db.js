import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  database: "postgres",
});

export default sequelize;

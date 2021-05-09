import { DataTypes } from "sequelize";
import sequelize from "../db";
import User from "./User";

const Expense = sequelize.define("Expense", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(2),
    allowNull: false,
  },
});

User.hasMany(Expense, {
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Expense.belongsTo(User);

export default Expense;

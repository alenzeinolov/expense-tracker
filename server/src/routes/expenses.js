import { Router } from "express";
import Expense from "../models/Expense";

const router = Router();

router.get("/", async (_, res) => {
  const expenses = await Expense.findAll();

  res.json({
    status: "success",
    data: expenses,
  });
});

export default router;

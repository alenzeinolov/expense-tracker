import { Router } from "express";
import Expense from "../models/Expense";
import isAuth from "../utils/isAuth";

const router = Router();

router.get("/", isAuth, async (_, res) => {
  const expenses = await Expense.findAll();

  res.json({
    status: "success",
    data: {
      expenses,
    },
  });
});

export default router;

import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User";

const router = express.router();

router.post(
  "/register",
  body("username").isAlphanumeric().isLength({ min: 4 }),
  body("password").isStrongPassword(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(user);
    res.status(201).json(user);
  }
);

export default router;

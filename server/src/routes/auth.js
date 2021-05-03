import express from "express";
import { body, validationResult } from "express-validator";
import User from "../models/User";
import isAuth from "../utils/isAuth";
import argon2 from "argon2";

const router = express.Router();

router.get("/me", isAuth, (_, res) => {
  res.status(204);
});

router.post(
  "/login",
  body("username").isAlphanumeric().isLength({ min: 4 }),
  body("password").isString({ min: 8 }),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isValid = await argon2.verify(user.password, req.body.password);
    if (!isValid)
      return res.status(400).json({ message: "Password is incorrect" });

    req.session.userId = user.id;
    return res.status(200).json(user);
  }
);

router.post("/logout", (req, res) => {
  console.log("logout");
  req.session.destroy(() => res.status(204));
});

router.post(
  "/register",
  body("username").isAlphanumeric().isLength({ min: 4 }),
  body("password").isString({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const checkUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (checkUser)
      return res.status(400).json({ message: "Username already tak" });

    const user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.userId = user.id;
    res.status(201).json(user);
  }
);

export default router;

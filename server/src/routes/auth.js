import Router from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import User from "../models/User";

const router = Router();

const generateToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY,
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
};

router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      data: {
        username: "User with given username does not exist.",
      },
    });
  }

  const isValid = await argon2.verify(user.password, req.body.password);
  if (!isValid) {
    return res.status(400).json({
      status: "fail",
      data: {
        password: "Password is not correct.",
      },
    });
  }

  const token = await generateToken(user);

  res.json({
    status: "success",
    data: {
      token,
      ...user,
    },
  });
});

router.post("/register", async (req, res) => {
  let user = await User.findOne({ where: { username: req.body.username } });
  if (user) {
    return res.status(400).json({
      status: "fail",
      data: {
        username: "User with given username already exists.",
      },
    });
  }

  hash = await argon2.hash(req.body.password);
  user = await User.create({ username: req.body.username, password: hash });

  const token = await generateToken(user);

  return res.json({
    status: "success",
    data: {
      token,
      ...user,
    },
  });
});

export default Router;

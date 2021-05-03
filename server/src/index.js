import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";
import { sequelize } from "./db";
import authRoutes from "./routes/auth";
import redis from "redis";
import connectRedis from "connect-redis";

async function main() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });

  const app = express();

  app.use(morgan("dev"));
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
      name: "sesid",
      resave: false,
      saveUninitialized: false,
      secret: process.env.SECRET,
    })
  );
  app.use(express.json());

  app.use("/auth", authRoutes);

  app.listen(5000, () => {
    console.log("http://localhost:5000");
  });
}

main();

import express, { Express } from "express";
import sauceRouter from "./routes/sauces";
import userRouter from "./routes/users";

const app: Express = express();

app.use(express.json());

app.use("/api/sauces", sauceRouter);
app.use("/api/auth", userRouter);

module.exports = app;

import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(process.env.TOKEN_SECRET);
  next();
  //   try {
  //     const token = req.headers.authorization.split(" ")[1];
  //     const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  //     const userId = decodedToken.userId;
  //     if (req.body.userId && req.body.userId !== userId) {
  //       throw "Invalid user ID";
  //     } else {
  //       next();
  //     }
  //   } catch (err) {
  //     res.status(401).send("Please login");
  //   }
}

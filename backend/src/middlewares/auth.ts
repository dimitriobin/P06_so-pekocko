import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const decodedToken = jwt.verify(
        token,
        process.env.TOKEN_SECRET as Secret
      );
      const decoded = decodedToken;
      (req as CustomRequest).token = decoded;

      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    res.status(401).send("Please login");
  }
}

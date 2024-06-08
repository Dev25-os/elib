import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { verify } from "jsonwebtoken";
import { config } from "../../config/config";

export interface AuthInterface extends Request {
  userId: string;
}

export const Authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return next(createHttpError(401, "Token not found"));
    }

    const parsedToken = token.split(" ")[1];

    const decoded = verify(parsedToken, config.jwtScreatKey as string);
    console.log("decode", decoded);

    const _req = req as AuthInterface;

    _req.userId = decoded.sub as string;

    next();
  } catch (error) {
    return next(createHttpError(401, "Token expired"));
  }
};

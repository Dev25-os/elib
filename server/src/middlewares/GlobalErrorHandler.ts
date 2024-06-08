import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

export default function GlobalErrorHandler(
  error: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = error.statusCode;

  res.status(statusCode).json({
      message: error.message,
      errorStack:process.env.NODE_ENV==="development"?error.stack:""
  });
}

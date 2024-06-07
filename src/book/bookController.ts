import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../../config/config";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log("files", req.files);
};

export { createBook };

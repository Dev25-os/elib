import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { userModal } from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  // fetching user from db
  const user = await userModal.findOne({ email });
  if (user) {
    return next(createHttpError(400, "Usr already exist with this email!"));
  }

  // hash password
  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await userModal.create({
    name,
    email,
    password: hashPass,
  });

  // configure jwt
  const token = sign({ sub: newUser._id }, config.jwtScreatKey as string, {
    expiresIn: "1d",
  });

  res.json({ _id: newUser._id, accessToken: token });
};

export { createUser };

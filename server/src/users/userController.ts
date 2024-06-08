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

  res.status(201).json({ _id: newUser._id, accessToken: token });
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createHttpError(400, "All Fields are important"));
  }

  // fetch user
  let user;
  try {
    user = await userModal.findOne({ email });
  } catch (error) {
    return next(createHttpError(500, "Internal server error"));
  }
  if (!user) {
    return next(createHttpError(404, "User not found"));
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return next(createHttpError(401, "Email or password does not match"));
  }

  // generate token

  const token = sign({ sub: user._id }, config.jwtScreatKey as string, {
    expiresIn: "1d",
  });

  res.status(200).json({ accessToken: token });
};

export { createUser, loginUser };

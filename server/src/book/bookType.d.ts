import { Date } from "mongoose";
import { UserType } from "../users/userType";

export type BookType = {
  _id: string;
  title: string;
  author: UserType;
  genre: string;
  coverImage: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
};

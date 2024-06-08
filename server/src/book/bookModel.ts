import mongoose, { Schema } from "mongoose";
import { BookType } from "./bookType";
import { userModal } from "../users/userModel";
import { type } from "os";

const bookSchema = new Schema<BookType>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: userModal,
    },
    coverImage: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const bookModel = mongoose.model("book", bookSchema);

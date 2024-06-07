import express from "express";
import { createBook, updateBook, getBooks, getBook } from "./bookController";
import multer from "multer";
import path from "node:path";
import { Authenticate } from "../middlewares/Authenticate";

const bookRouter = express.Router();

const multerConfig = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, //30mb
});

bookRouter.post(
  "/create",
  Authenticate,
  multerConfig.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

bookRouter.put(
  "/update-one/:bookId",
  Authenticate,
  multerConfig.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

bookRouter.get("/getBooks", getBooks);
bookRouter.get("/getBook/:bookId", getBook);

export default bookRouter;

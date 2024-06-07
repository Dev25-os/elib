import express from "express";
import { createBook } from "./bookController";

const bookRouter = express.Router();

bookRouter.post("/create", createBook);

export default bookRouter;

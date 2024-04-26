import express from "express";
import GlobalErrorHandler from "./middlewares/GlobalErrorHandler";
import createHttpError from "http-errors";

const app = express();

app.get("/", (req, res) => {
  const createError = createHttpError("something went wrong!");

  // throw createError;
  res.json("hello from the root ");
});

//global error handler
app.use(GlobalErrorHandler);

export default app;

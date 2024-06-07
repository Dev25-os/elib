import express from "express";
import GlobalErrorHandler from "./middlewares/GlobalErrorHandler";
import createHttpError from "http-errors";
import userRouter from "./users/userRoutes";
import bookRouter from "./book/bookRoute";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const createError = createHttpError("something went wrong!");

  // throw createError;
  res.json("hello from the root ");
});

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/book", bookRouter);

//global error handler
app.use(GlobalErrorHandler);

export default app;

import express from "express";
import GlobalErrorHandler from "./middlewares/GlobalErrorHandler";
import createHttpError from "http-errors";
import userRouter from "./users/userRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const createError = createHttpError("something went wrong!");

  // throw createError;
  res.json("hello from the root ");
});

// Routes
app.use("/api/users", userRouter);

//global error handler
app.use(GlobalErrorHandler);

export default app;

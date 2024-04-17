import { config } from "./config/config";
import connectDB from "./config/db";
import app from "./src/app";

let startServer = async () => {
  // connect to database
  await connectDB();

  let PORT = config.PORT || 4000;
  app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
  });
};

startServer();

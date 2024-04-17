import { config } from "./config/config";
import app from "./src/app";

let startServer = () => {
  let PORT = config.PORT || 4000;
  app.listen(PORT, () => {
    console.log("Server listening on port:", PORT);
  });
};

startServer();

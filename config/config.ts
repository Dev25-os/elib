import { config as dotenvconfig } from "dotenv";

dotenvconfig();

const _config = {
  PORT: process.env.PORT,
  db: process.env.MONGO_URI,
};

export const config = Object.freeze(_config);

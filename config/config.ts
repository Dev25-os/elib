import { config as dotenvconfig } from "dotenv";

dotenvconfig();

const _config = {
  PORT: process.env.PORT,
  db: process.env.MONGO_URI,
  jwtScreatKey: process.env.JWT_SCREAT_KEY,
};

export const config = Object.freeze(_config);

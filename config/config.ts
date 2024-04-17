import { config as dotenvconfig } from "dotenv";

dotenvconfig();

const _config = {
  PORT: process.env.PORT,
};

export const config = Object.freeze(_config);

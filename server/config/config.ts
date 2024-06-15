import { config as dotenvconfig } from "dotenv";

dotenvconfig();

const _config = {
  PORT: process.env.PORT,
  db: process.env.MONGO_URI,
  jwtScreatKey: process.env.JWT_SCREAT_KEY,
  cloudniaryName: process.env.CLOUD_NAME,
  cloudniaryApiKey: process.env.API_KEY,
  cloudniaryApiSecreat: process.env.API_SECREAT,
  frontEndUrl: process.env.FRONTEND_URL,
};

export const config = Object.freeze(_config);

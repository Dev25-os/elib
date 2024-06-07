import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";

// Configuration
cloudinary.config({
  cloud_name: config.cloudniaryName,
  api_key: config.cloudniaryApiKey,
  api_secret: config.cloudniaryApiSecreat,
});

export default cloudinary;

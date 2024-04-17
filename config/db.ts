import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
  try {
    //   Need to register first
    mongoose.connection.on("connected", () => {
      console.log("Database connection successful");
    });
    mongoose.connection.on("error", (err) => {
      console.log("Error connecting to database", err);
    });

    //   adding connection string
    await mongoose.connect(config.db as string);
  } catch (error) {
    console.log("Failed to connect to database");
    process.exit(1);
  }
};

export default connectDB;

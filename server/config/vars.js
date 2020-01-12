import path from "path";
import dotenv from "dotenv";
import { ENV } from "./constants";

const { PRODUCTION } = ENV;

dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  },
  logs: process.env.NODE_ENV === PRODUCTION ? "combined" : "dev"
};

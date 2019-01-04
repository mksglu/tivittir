import * as dotenv from "dotenv";
dotenv.config();
export default {
  connectionStr: {
    dev: process.env.MONGODB_STR_DEV,
    prod: process.env.MONGODB_STR_PROD
  },
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT
};

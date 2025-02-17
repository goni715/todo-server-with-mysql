import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

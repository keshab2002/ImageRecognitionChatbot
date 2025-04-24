import dotenv from "dotenv";
dotenv.config();

let MONGODB_URI = "";
if (process.env.NODE_ENV === "production") {
  MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
} else if (process.env.NODE_ENV === "development") {
  MONGODB_URI = `mongodb://${process.env.DEV_MONGO_HOST}:${process.env.DEV_MONGO_PORT}/${process.env.DEV_MONGO_DB}`;
} else {
  throw new Error("NODE_ENV is not set to production or development");
}
export default MONGODB_URI;

import MONGODB_URI from "#config/db.js";
import { swaggerDocs } from "#config/swagger.js";
import { uploadImage } from "#controllers/upload/endpoint.js";
import chatRouter from "#routes/chat.js";
import messageRouter from "#routes/message.js";
import userRouter from "#routes/user.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

// Import ENV variables
dotenv.config();

//Initialize Express app
const app = express();

// CORS middleware
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

//Express-FileUpload middleware
app.use(fileUpload());

// Middleware to serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

// API Routes
app.use("/api", [userRouter, chatRouter, messageRouter]);
app.use("/upload", uploadImage);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Connect to MongoDB
await mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

//Listen on specified port
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});

//Handle uncaught exceptions and unhandled rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection at:", promise, "reason:", reason);
});

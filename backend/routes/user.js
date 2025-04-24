import express from "express";
import { readUser } from "#controllers/user/read.js";
import { createUser } from "#controllers/user/create.js";
import { deleteUser } from "#controllers/user/delete.js";
const userRouter = express.Router();
userRouter.get("/user/:userId", readUser); // Read a user by ID

userRouter.post("/user", createUser); // Create a new user

userRouter.delete("/user/:userId", deleteUser); // Delete a user by ID

export default userRouter;

import { createMessage } from "#controllers/message/create.js";
import { deleteMessage } from "#controllers/message/delete.js";
import { getMessagesByChat } from "#controllers/message/read.js";
import express from "express";

const messageRouter = express.Router();

messageRouter.get("/message/:chatId", getMessagesByChat); // Read a message by ID

messageRouter.post("/message", createMessage); // Create a new message

messageRouter.delete("/message", deleteMessage); // Delete a message by ID

export default messageRouter;

import { createChat } from "#controllers/chat/create.js";
import { deleteChat } from "#controllers/chat/delete.js";
import { readChat } from "#controllers/chat/read.js";
import { updateChatTitle } from "#controllers/chat/update.js";
import express from "express";

const chatRouter = express.Router();

chatRouter.get("/chat/:chatId", readChat);

chatRouter.post("/chat", createChat);

chatRouter.delete("/chat", deleteChat);

chatRouter.put("/chat", updateChatTitle);

export default chatRouter;

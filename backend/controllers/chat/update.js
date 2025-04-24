import Chat from "#models/Chat.Model.js";

/**
 * @swagger
 * paths:
 *   /api/chat/title:
 *     put:
 *       summary: Update the title of a specific chat
 *       tags:
 *         - Chat
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - chatId
 *                 - title
 *               properties:
 *                 chatId:
 *                   type: string
 *                   description: MongoDB ObjectId of the chat to update
 *                   example: "661fe2a6f854ee2ac8752f33"
 *                 title:
 *                   type: string
 *                   description: New title for the chat
 *                   example: "Updated Project Brainstorm"
 *       responses:
 *         "200":
 *           description: Chat title updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: true
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   message:
 *                     type: string
 *                     example: Chat title updated successfully
 *                   chat:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "661fe2a6f854ee2ac8752f33"
 *                       title:
 *                         type: string
 *                         example: "Updated Project Brainstorm"
 *                       messages:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *         "400":
 *           description: Missing chatId or title
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   message:
 *                     type: string
 *                     example: Failed to update chat title
 *                   error:
 *                     type: string
 *                     example: chatId and title are required
 *         "404":
 *           description: Chat not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   message:
 *                     type: string
 *                     example: Failed to update chat title
 *                   error:
 *                     type: string
 *                     example: Chat not found
 *         "500":
 *           description: Server error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   success:
 *                     type: boolean
 *                     example: false
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                   message:
 *                     type: string
 *                     example: Failed to update chat title
 *                   error:
 *                     type: string
 *                     example: Internal Server Error
 */

export const updateChatTitle = async (req, res) => {
  try {
    const { chatId, title } = req.body; // New title from the body

    if (!chatId || !title)
      throw { status: 400, message: "chatId and title are required" };

    // 1. Find the chat by chatId
    const chat = await Chat.findById(chatId);
    if (!chat) throw { status: 404, message: "Chat not found" };

    // 2. Update the chat title
    chat.title = title;
    await chat.save();

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Chat title updated successfully",
      chat: {
        _id: chat._id,
        title: chat.title,
        messages: chat.messages,
      },
    });
  } catch (err) {
    console.error("Error updating chat title:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to update chat title",
      error: err.message || "Internal Server Error",
    });
  }
};

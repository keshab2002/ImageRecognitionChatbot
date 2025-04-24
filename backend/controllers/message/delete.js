import Chat from "#models/Chat.Model.js";
import Message from "#models/Message.Model.js";

/**
 * @swagger
 *   /api/message:
 *     delete:
 *       summary: Delete a specific message from a chat
 *       tags:
 *         - Message
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - chatId
 *                 - messageId
 *               properties:
 *                 chatId:
 *                   type: string
 *                   description: ID of the chat where the message will be deleted
 *                   example: "661fe2a6f854ee2ac8752f33"
 *                 messageId:
 *                   type: string
 *                   description: ID of the message to be deleted
 *                   example: "661fe2a6f854ee2ac8752f34"
 *       responses:
 *         "200":
 *           description: Message deleted successfully
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
 *                     example: Message deleted successfully
 *         "400":
 *           description: Missing chatId or messageId
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
 *                     example: Failed to delete message
 *                   error:
 *                     type: string
 *                     example: chatId and messageId are required
 *         "404":
 *           description: Chat or message not found
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
 *                     example: Failed to delete message
 *                   error:
 *                     type: string
 *                     example: Chat or Message not found
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
 *                     example: Failed to delete message
 *                   error:
 *                     type: string
 *                     example: Internal Server Error
 */
export const deleteMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.body;

    if (!chatId || !messageId) {
      throw { status: 400, message: "chatId and messageId are required" };
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw { status: 404, message: "Chat not found" };
    }

    const message = await Message.findById(messageId);
    if (!message) {
      throw { status: 404, message: "Message not found" };
    }

    // Remove message reference from chat
    chat.messages = chat.messages.filter(
      (msgId) => msgId.toString() !== messageId
    );
    await chat.save();

    // Delete the message
    await Message.findByIdAndDelete(messageId);

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Message deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to delete message",
      error: err.message || "Internal Server Error",
    });
  }
};

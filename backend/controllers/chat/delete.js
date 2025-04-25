import Chat from "#models/Chat.Model.js";
import Message from "#models/Message.Model.js";
import User from "#models/User.Model.js";

/**
 * @swagger
 * paths:
 *   /api/chat:
 *     delete:
 *       summary: Delete a chat and its associated messages
 *       tags:
 *         - Chat
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - userId
 *                 - chatId
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: MongoDB ObjectId of the user
 *                   example: "661fe2a6f854ee2ac8752f33"
 *                 chatId:
 *                   type: string
 *                   description: MongoDB ObjectId of the chat to delete
 *                   example: "661fe2a6f854ee2ac8752f34"
 *       responses:
 *         "200":
 *           description: Chat deleted successfully
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
 *                     example: Chat deleted successfully
 *                   data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "661fe5a8fa987a0012a3c456"
 *                       title:
 *                         type: string
 *                         example: "Project Brainstorm"
 *                       messages:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *         "400":
 *           description: Missing userId or chatId
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
 *                     example: Failed to delete chat
 *                   error:
 *                     type: string
 *                     example: userId and chatId are required
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
 *                     example: Failed to delete chat
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
 *                     example: Failed to delete chat
 *                   error:
 *                     type: string
 *                     example: Internal Server Error
 */
export const deleteChat = async (req, res) => {
  try {
    const { userId, chatId } = req.body;

    if (!userId || !chatId) {
      throw {
        status: 400,
        message: "userId and chatId are required",
      };
    }
    // 1. Remove the chat from the user's chat list
    await User.findOneAndUpdate(
      { userId },
      {
        $pull: { chats: chatId },
      }
    );

    // 2. Fetch the chat to get message IDs
    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw {
        status: 404,
        message: "Chat not found",
      };
    }
    // 3. Delete associated messages
    await Message.deleteMany({ _id: { $in: chat.messages } });

    // 4. Delete the chat itself
    await Chat.findByIdAndDelete(chatId);

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Chat deleted successfully",
      data: chat,
    });
  } catch (err) {
    console.error("Error deleting chat:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to delete chat",
      error: err.message || "Internal Server Error",
    });
  }
};

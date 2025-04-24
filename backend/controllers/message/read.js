import Chat from "#models/Chat.Model.js";
/**
 * @swagger
 * paths:
 *   /api/message/{chatId}:
 *     get:
 *       summary: Get all messages for a specific chat
 *       tags:
 *         - Message
 *       parameters:
 *         - name: chatId
 *           in: path
 *           description: ID of the chat to fetch messages from
 *           required: true
 *           schema:
 *             type: string
 *             example: "661fe2a6f854ee2ac8752f33"
 *       responses:
 *         "200":
 *           description: Messages fetched successfully
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
 *                     example: Messages fetched successfully
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "661fe2a6f854ee2ac8752f33"
 *                         role:
 *                           type: string
 *                           example: "user"
 *                         content:
 *                           type: string
 *                           example: "Hello! How can I assist you today?"
 *                         imageUrl:
 *                           type: string
 *                           example: "https://example.com/image.jpg"
 *         "400":
 *           description: Missing chatId parameter
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
 *                     example: Failed to fetch messages
 *                   error:
 *                     type: string
 *                     example: chatId is required
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
 *                     example: Failed to fetch messages
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
 *                     example: Failed to fetch messages
 *                   error:
 *                     type: string
 *                     example: Internal Server Error
 */
export const getMessagesByChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    if (!chatId) {
      throw { status: 400, message: "chatId is required" };
    }

    const chat = await Chat.findById(chatId).populate("messages");
    if (!chat) {
      throw { status: 404, message: "Chat not found" };
    }

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Messages fetched successfully",
      data: chat.messages,
    });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to fetch messages",
      error: err.message || "Internal Server Error",
    });
  }
};

import Chat from "#models/Chat.Model.js";

/**
 * @swagger
 * paths:
 *   /api/chat/{chatId}:
 *     get:
 *       summary: Get details of a specific chat
 *       tags:
 *         - Chat
 *       parameters:
 *         - in: path
 *           name: chatId
 *           required: true
 *           description: MongoDB ObjectId of the chat to fetch
 *           schema:
 *             type: string
 *             example: "661fe2a6f854ee2ac8752f33"
 *       responses:
 *         "200":
 *           description: Chat fetched successfully
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
 *                     example: Chat fetched successfully
 *                   data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "661fe2a6f854ee2ac8752f33"
 *                       title:
 *                         type: string
 *                         example: "Project Brainstorm"
 *                       messages:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: []
 *         "400":
 *           description: Missing chatId
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
 *                     example: Failed to fetch chat
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
 *                     example: Failed to fetch chat
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
 *                     example: Failed to fetch chat
 *                   error:
 *                     type: string
 *                     example: Internal Server Error
 */

export const readChat = async (req, res) => {
  try {
    const { chatId } = req.params; // Using URL params to get chatId

    if (!chatId) throw { status: 400, message: "chatId is required" };

    // 1. Find the chat by chatId
    const chat = await Chat.findById(chatId).populate("messages"); // Assuming messages is a reference to another model

    if (!chat) throw { status: 404, message: "Chat not found" };

    // 2. Send the chat details including the messages
    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Chat fetched successfully",
      data: chat,
    });
  } catch (err) {
    console.error("Error fetching chat:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to fetch chat",
      error: err.message || "Internal Server Error",
    });
  }
};

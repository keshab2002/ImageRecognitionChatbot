import Chat from "#models/Chat.Model.js";
import Message from "#models/Message.Model.js";

/**
 * @swagger
 *   /api/message:
 *     post:
 *       summary: Create a new message in a chat
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
 *                 - role
 *               properties:
 *                 chatId:
 *                   type: string
 *                   description: ID of the chat to send the message to
 *                   example: "661fe2a6f854ee2ac8752f33"
 *                 role:
 *                   type: string
 *                   description: Role of the message sender (e.g., user or admin)
 *                   example: "user"
 *                 content:
 *                   type: string
 *                   description: Text content of the message
 *                   example: "How can I help you?"
 *                 imageUrl:
 *                   type: string
 *                   description: Optional image URL attached to the message
 *                   example: "https://example.com/image.jpg"
 *       responses:
 *         "201":
 *           description: Message created and added to chat
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
 *                     example: Message created and added to chat
 *                   data:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "661fe2a6f854ee2ac8752f33"
 *                       role:
 *                         type: string
 *                         example: "user"
 *                       content:
 *                         type: string
 *                         example: "How can I help you?"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/image.jpg"
 *         "400":
 *           description: Missing chatId or role
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
 *                     example: Failed to create message
 *                   error:
 *                     type: string
 *                     example: chatId and role are required
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
 *                     example: Failed to create message
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
 *                     example: Failed to create message
 *                   error:
 *                     type: string
 *                     example: Internal Server Error
 * */

export const createMessage = async (req, res) => {
  try {
    const { chatId, role, content, imageUrl } = req.body;

    if (!chatId || !role) {
      throw { status: 400, message: "chatId and role are required" };
    }

    if (!content && !imageUrl) {
      throw { status: 400, message: "Either content or imageUrl is required" };
    }

    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw { status: 404, message: "Chat not found" };
    }

    // 1. Create a new message with content or imageUrl
    const message = new Message({ role, content, imageUrl });
    await message.save();

    // 2. Add message to chat and save
    chat.messages.push(message._id);
    await chat.save();

    res.status(201).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Message created and added to chat",
      data: message,
    });
  } catch (err) {
    console.error("Error creating message:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to create message",
      error: err.message || "Internal Server Error",
    });
  }
};

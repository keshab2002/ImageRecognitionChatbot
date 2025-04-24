import Chat from "#models/Chat.Model.js";
import User from "#models/User.Model.js";
/**
 * @swagger
 * paths:
 *   /api/chat:
 *     post:
 *       summary: Create a new chat
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
 *                 - title
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: MongoDB ObjectId of the user
 *                   example: "661fe2a6f854ee2ac8752f33"
 *                 title:
 *                   type: string
 *                   description: Title of the chat
 *                   example: "Project Brainstorm"
 *       responses:
 *         "201":
 *           description: Chat created successfully
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
 *                     example: Chat created successfully
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
 *           description: Missing title or userId
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
 *                     example: Failed to create chat
 *                   error:
 *                     type: string
 *                     example: Title and userId are required
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
 *                     example: Failed to create chat
 *                   error:
 *                     type: string
 *                     example: Internal Server Error
 */

export const createChat = async (req, res) => {
  try {
    const { userId, title } = req.body;

    if (!title || !userId) {
      throw {
        status: 400,
        message: "Title and userId are required",
      };
    }

    // 1. Create the chat
    const newChat = await Chat.create({ title });

    // 2. Add the chat to the user’s chat list
    await User.findByIdAndUpdate(userId, {
      $push: { chats: newChat._id },
    });

    res.status(201).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Chat created successfully",
      data: newChat,
    });
  } catch (err) {
    console.error("Error creating chat:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to create chat",
      error: err.message || "Internal Server Error",
    });
  }
};

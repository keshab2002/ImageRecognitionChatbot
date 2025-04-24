import User from "#models/User.Model.js";
import Chat from "#models/Chat.Model.js";
import Message from "#models/Message.Model.js";

/**
 * @swagger
 * paths:
 *   /api/user/{userId}:
 *     delete:
 *       summary: Delete a user by userId
 *       tags:
 *         - User
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           description: The userId of the user to delete
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           description: User, chats, and messages deleted successfully
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
 *                     example: "2025-04-24T12:00:00Z"
 *                   message:
 *                     type: string
 *                     example: "User, chats, and messages deleted successfully"
 *         "400":
 *           description: userId is required
 *         "404":
 *           description: User not found
 *         "500":
 *           description: Internal server error
 */

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw { status: 400, message: "userId is required" };
    }

    const user = await User.findOne({ userId });

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    const chatIds = user.chats;

    // Step 1: Find all messages from the user's chats
    const chats = await Chat.find({ _id: { $in: chatIds } });
    const allMessageIds = chats.flatMap((chat) => chat.messages);

    // Step 2: Delete all those messages
    await Message.deleteMany({ _id: { $in: allMessageIds } });

    // Step 3: Delete all the user's chats
    await Chat.deleteMany({ _id: { $in: chatIds } });

    // Step 4: Delete the user
    await User.deleteOne({ userId });

    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "User, chats, and messages deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to delete user",
      error: err.message || "Internal Server Error",
    });
  }
};

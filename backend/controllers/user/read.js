import User from "#models/User.Model.js";

/**
 * @swagger
 * paths:
 *   /api/user/{userId}:
 *     get:
 *       summary: Get user details by userId
 *       tags:
 *         - User
 *       parameters:
 *         - name: userId
 *           in: path
 *           required: true
 *           description: The userId of the user to fetch
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           description: User found with linked chats
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
 *                     example: "User found with linked chats"
 *                   data:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: "12345"
 *                       chats:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             chatId:
 *                               type: string
 *                               example: "chat123"
 *         "400":
 *           description: userId is required
 *         "404":
 *           description: User not found
 *         "500":
 *           description: Internal server error
 *
 */

export const readUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw { status: 400, message: "userId is required" };
    }

    // Find user by userId
    const user = await User.findOne({ userId }).populate("chats");

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    // Return user with populated chats
    res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "User found with linked chats",
      data: user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to fetch user",
      error: err.message || "Internal Server Error",
    });
  }
};

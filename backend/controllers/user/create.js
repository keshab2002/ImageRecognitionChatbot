import User from "#models/User.Model.js";

/**
 * @swagger
 * paths:
 *   /api/user:
 *     post:
 *       summary: Create a new user
 *       tags:
 *         - User
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The userId of the user to create
 *                   example: "12345"
 *       responses:
 *         "201":
 *           description: User created successfully
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
 *                     example: "User created successfully"
 *                   data:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: "12345"
 *         "400":
 *           description: userId is required
 *         "500":
 *           description: Internal server error
 *
 */

export const createUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      throw { status: 400, message: "userId is required" };
    }

    // Check if a user with the given userId already exists
    let user = await User.findOne({ userId });

    if (user) {
      return res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        message: "User already exists",
        data: user,
      });
    }

    // Create new user
    user = new User({ userId });
    await user.save();

    res.status(201).json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "User created successfully",
      data: user,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(err.status || 500).json({
      success: false,
      timestamp: new Date().toISOString(),
      message: "Failed to create user",
      error: err.message || "Internal Server Error",
    });
  }
};

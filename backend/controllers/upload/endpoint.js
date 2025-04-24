import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { uploadToCloudinary } from "#utils/uploadImage.js";

/**
 * @swagger
 * paths:
 *   /upload/image:
 *     post:
 *       summary: Upload an image to the server and Cloudinary
 *       tags:
 *         - Image
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   format: binary
 *                   description: Image file to be uploaded
 *       responses:
 *         "200":
 *           description: Image uploaded successfully to Cloudinary
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Image uploaded successfully
 *                   cloudinary:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "https://res.cloudinary.com/democloud/image/upload/v1618822819/sample.jpg"
 *                       public_id:
 *                         type: string
 *                         example: "sample"
 *                       width:
 *                         type: integer
 *                         example: 500
 *                       height:
 *                         type: integer
 *                         example: 500
 *                   optimizedUrl:
 *                     type: string
 *                     example: "https://res.cloudinary.com/democloud/image/upload/w_500,c_fill/sample.jpg"
 *                   autoCropUrl:
 *                     type: string
 *                     example: "https://res.cloudinary.com/democloud/image/upload/c_crop/sample.jpg"
 *         "400":
 *           description: No file uploaded or invalid file type
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: No file uploaded
 *         "500":
 *           description: Internal server error during upload
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     example: Failed to upload image
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const image = req.files.image;
    const extension = path.extname(image.name); // e.g. ".png", ".jpg"

    const uploadsDir = path.join(__dirname, "..", "..", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const filename = `${uuidv4()}${extension}`;
    const filePath = path.join(uploadsDir, filename);

    // Move file to uploads folder
    await image.mv(filePath);

    // Upload to Cloudinary
    const result = await uploadToCloudinary(filePath);

    // Delete from local storage
    fs.unlinkSync(filePath);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.status(200).json({
      message: "Image uploaded successfully",
      cloudinary: result.data,
      optimizedUrl: result.optimizedUrl,
      autoCropUrl: result.autoCropUrl,
    });
  } catch (error) {
    console.error("Image upload failed:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

import { v2 as cloudinary } from "cloudinary";

// Cloudinary config (only call once at the top-level of your app)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image to Cloudinary
 * @param {string} imagePath - Local file path or image URL
 * @param {string} [publicId] - Optional public_id for the image
 * @returns {Promise<Object>} - Cloudinary upload result
 */
export const uploadToCloudinary = async (imagePath, publicId = undefined) => {
  try {
    const options = publicId ? { public_id: publicId } : {};
    const result = await cloudinary.uploader.upload(imagePath, options);
    return {
      success: true,
      data: result,
      optimizedUrl: cloudinary.url(result.public_id, {
        fetch_format: "auto",
        quality: "auto",
      }),
      autoCropUrl: cloudinary.url(result.public_id, {
        crop: "auto",
        gravity: "auto",
        width: 500,
        height: 500,
      }),
    };
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return {
      success: false,
      error: err.message || "Upload failed",
    };
  }
};

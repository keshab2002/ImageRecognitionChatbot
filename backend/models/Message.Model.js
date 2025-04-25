import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: { type: String }, // optional text
    imageUrl: { type: String }, // optional image
    geminiResponse: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

// Custom validation: must have either content or imageUrl
messageSchema.pre("save", function (next) {
  if (!this.content && !this.imageUrl) {
    return next(new Error("Either content or imageUrl is required"));
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);
export default Message;

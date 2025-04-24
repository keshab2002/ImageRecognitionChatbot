import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat", default: [] }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

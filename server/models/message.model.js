import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [
      {
        content: {
          type: String,
          required: true,
        },
        msgOwner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,  // Use Date.now instead of new Date()
        },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

// Optional: If you want the sender-receiver pair to be unique
messageSchema.index({ sender: 1, receiver: 1 }, { unique: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;

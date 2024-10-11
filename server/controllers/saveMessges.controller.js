import mongoose from 'mongoose';
import Message from "../models/message.model.js";

const saveMessages = async (req, res) => {
  try {
    const { sender, receiver, messages } = req.body;

    console.log("The sender is", sender);
    console.log("The receiver is", receiver);
    console.log("The content is", messages);

    // Convert sender and receiver to ObjectId using 'new'
    const senderId = new mongoose.Types.ObjectId(sender);
    const receiverId = new mongoose.Types.ObjectId(receiver);

    // Try to find an existing conversation between the two users, regardless of sender/receiver order
    let conversation = await Message.findOne({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId }
      ]
    });

    if (conversation) {
      // Append the new messages
      messages.forEach((message) => {
        // Ensure msgOwner is an ObjectId using 'new'
        message.msgOwner = new mongoose.Types.ObjectId(message.msgOwner);
        conversation.messages.push(message);
      });

      // Populate sender and receiver fields and then save the conversation
      await conversation.populate("sender receiver");
      await conversation.save();
    } else {
      // If no conversation exists, create a new one
      const newMessages = messages.map((message) => ({
        ...message,
        msgOwner: new mongoose.Types.ObjectId(message.msgOwner) // Convert msgOwner to ObjectId using 'new'
      }));

      await Message.create({
        sender: senderId,
        receiver: receiverId,
        messages: newMessages
      });
    }

    res.status(200).json({ message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ message: error.message });
  }
};

export  {saveMessages};

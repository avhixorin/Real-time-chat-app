// friendRequestController.js
import User from "../models/user.model.js";
import { io } from "../index.js"; 
import { users } from "../index.js";
import mongoose from "mongoose";

const handleFriendRequest = async (req, res) => {
  try {
    const { from, to } = req.body;

    const userFrom = await User.findById(from);
    const userTo = await User.findById(to);

    if (!userFrom || !userTo) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the friend request already exists
    const doesRequestExist = userTo.friendRequests.some((request) => {
      return request.from.toString() === from.toString();
    });

    if (doesRequestExist) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Add friend request
    const newRequest = {
      from,
      status: "pending",
    };
    userTo.friendRequests.push(newRequest);
    await userTo.save();
    console.log("The request has been pushed successfully");

    // Emit event to recipient
    if (users[to]) {
      io.to(users[to]).emit("friendRequestNotification", { from, status: "pending" });
    } else {
      console.log("The user is not online");
    }

    res.status(200).json({
      message: `Friend request from user ${from} to user ${to} has been sent.`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { requester, accepter, status } = req.params;
    console.log("requester", requester);
    console.log("accepter", accepter);
    console.log("status", status);

    // Fetch both users
    const userAccepter = await User.findById(new mongoose.Types.ObjectId(accepter));
    const userRequester = await User.findById(new mongoose.Types.ObjectId(requester));

    if (!userAccepter || !userRequester) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the friend request exists
    const requestIndex = userAccepter.friendRequests.findIndex((friendRequest) => {
      // Defensive check to ensure friendRequest and friendRequest.from are defined
      return friendRequest && friendRequest.from && friendRequest.from.toString() === requester.toString();
    });

    if (requestIndex === -1) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Update the status
    userAccepter.friendRequests[requestIndex].status = status;
    await userAccepter.save();

    // Add friend to both users if accepted
    if (status === "accepted") {
      userAccepter.friends.push(new mongoose.Types.ObjectId(requester));
      userRequester.friends.push(new mongoose.Types.ObjectId(accepter));
      await userAccepter.save();
      await userRequester.save();
    }

    // Emit event to requester
    if (users[requester]) {
      io.to(users[requester]).emit("friendRequestNotification", { accepter, status });
    } else {
      console.log("The user is not online");
    }

    res.status(200).json({
      message: `Friend request from user ${userRequester.name} to user ${userAccepter.name} has been ${status}.`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};


export { handleFriendRequest, acceptFriendRequest };

// friendRequestController.js
import User from "../models/user.model.js";
import { io } from "../index.js"; 
import { users } from "../index.js";
import mongoose from "mongoose";

const handleFriendRequest = async (req, res) => {
  try {
    const { from, to } = req.body;
    console.log("The request is from", from);
    console.log("The request is to", to);

    const userFrom = await User.findById(from).select("username name email profilePic _id");
    const userTo = await User.findById(to);

    if (!userFrom || !userTo) {
      console.log("User not found");
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
      io.to(users[to]).emit("friendRequestNotification", { userFrom });
    } else {
      console.log("The user is not online");
    }

    res.status(200).json({
      message: `Friend request from user ${userFrom.username} to user ${userTo.username} has been sent.`,
      userFrom: userFrom, 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const acceptFriendRequest = async (req, res) => {
  try {
    const { requester, accepter, status } = req.params;

    // Fetch both users
    const userAccepter = await User.findById(accepter);
    const userRequester = await User.findById(requester);

    if (!userAccepter || !userRequester) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the friend request exists
    const requestIndex = userAccepter.friendRequests.findIndex(
      (friendRequest) => friendRequest.from.toString() === requester.toString()
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    // Update the status
    userAccepter.friendRequests[requestIndex].status = status;
    await userAccepter.save();

    // If status is accepted, add friends to both users
    if (status === "accepted") {
      userAccepter.friends.push(userRequester._id);
      userRequester.friends.push(userAccepter._id);
      await userAccepter.save();
      await userRequester.save();
    }

    // Populate the updated friends list for the accepter
    // const updatedUserAccepter = await User.findById(accepter).populate('friends', '_id name username email profilePic');
    // const updatedUserRequester = await User.findById(requester).populate('friends', '_id name username email profilePic');

    // Emit event to requester
    if (users[requester]) {
      io.to(users[requester]).emit("friendRequesterNotification", {
        requestStatus: status
      });
    } else {
      console.log("The user is not online");
    }

    res.status(200).json({
      message: `Friend request from user ${userRequester.name} to user ${userAccepter.name} has been ${status}.`,
      updatedUserAccepter, // Return the accepter with the populated friends
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};



export { handleFriendRequest, acceptFriendRequest };

import User from "../models/user.model.js";
import mongoose from "mongoose";
import cloudinaryUpload from "../utils/cloudinaryUpload.js";

const registerUser = async (req, res) => {
  const { name, email,username, password } = req.body;
  try {
    const user = await User.create({ name, email,username, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.isPasswordCorrect(password))) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFriends = async (req, res) => {
  try {
    const { loggedInUserId } = req.body;
    
    if (loggedInUserId) {
      console.log("This is the userId of the currently logged-in user:", loggedInUserId);
    }

    // Fetch the user and populate the 'friends' array
    const user = await User.findById(loggedInUserId)
      .populate({
        path: 'friends', // Populate the friends array with full user details
        select: 'name email username profilePic' // Select specific fields
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: `All the friends of the user with ID ${loggedInUserId} have been fetched successfully`,
      friends: user.friends // Send the populated friends array
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { loggedInUserId } = req.body;
    if (loggedInUserId) console.log("This is the userId of the currently logged in user", loggedInUserId);

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("_id name email username profilePic");
    
    res.status(200).json({
      message: `All the friends of the user with ID ${loggedInUserId} have been fetched successfully`,
      users: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const uploadController = async(req, res) => {
  const { userId } = req.body;
  console.log("This is the user ID of the user uploading the file", userId);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const cloudinaryReponse = await cloudinaryUpload(req.file.path);

    if(!cloudinaryReponse.url) return res.status(500).json({ message: "File upload failed" });

    const user = await User.findById(req.body.userId);
    user.profilePic = cloudinaryReponse.url;
    await user.save();
    
    res.status(200).json({ message: "File uploaded successfully", user: user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export { registerUser, loginUser, getAllFriends,getAllUsers, uploadController };

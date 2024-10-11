import User from "../models/user.model.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
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
    if (loggedInUserId) console.log("This is the userId of the currently logged in user", loggedInUserId);

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("_id name email");
    
    res.status(200).json({
      message: `All the friends of the user with ID ${loggedInUserId} have been fetched successfully`,
      users: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email");
    res.status(200).json({
      message: "All users have been fetched successfully",
      users: users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const uploadController = (req, res) => {
  console.log(req.files);
  
  res.status(200).json({ message: "File uploaded successfully" });
};



export { registerUser, loginUser, getAllFriends,getAllUsers, uploadController };

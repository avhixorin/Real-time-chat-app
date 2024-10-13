import { Router } from "express";
import {
  loginUser,
  registerUser,
  uploadController,
  getAllFriends,
  getAllUsers,
} from "../controllers/user.controller.js";
import { saveMessages } from "../controllers/saveMessges.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";
import {
  handleFriendRequest,
  acceptFriendRequest,
} from "../controllers/friendRequest.controller.js";

const router = Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes
router.post("/getallfriends", getAllFriends);
router.post("/getallusers", getAllUsers);
// Friend Request Routes
router.post("/sendfriendrequest", handleFriendRequest);
router.patch('/friendrequest/:requester/:accepter/:status', acceptFriendRequest);


// File Upload Route
router.post(
  "/upload",
  upload.single("avatar"),
  uploadController
);

// Message Routes
router.post("/savemessages", saveMessages);

export default router;

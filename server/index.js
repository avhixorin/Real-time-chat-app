// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/user.routes.js";
import connectDB from "./utils/connectDb.js";
import { sendMsg } from "./sockets/chat.js";
dotenv.config({
  path: "./.env",
});

const app = express();
const httpServer = createServer(app); // Create HTTP server
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST","PATCH","DELETE","PUT"],
  credentials: true,
}));
app.use(express.json());

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PATCH","DELETE","PUT"],
    credentials: true,
  },
});

connectDB(); // Database connection

export { io };

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/users", router);

export const users = {}; // Track connected users
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("loggedInUserId", ({ loggedInUserId }) => {
    users[loggedInUserId] = socket.id;
    console.log("Users:", users);
  });

  sendMsg(io, socket);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
httpServer.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

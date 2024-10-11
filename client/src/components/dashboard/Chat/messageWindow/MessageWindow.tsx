import React, { useState, useEffect, useRef } from "react";
import Bubble from "./Chatbubble/Bubble";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import { addMessage, clearMessagesForUser, Message } from "../../../../Redux/features/messagesSlice";
import { useSocket } from "../../../Hooks/useSocket";

const randomImages = [
  "https://randomuser.me/api/portraits/women/48.jpg",
  "https://randomuser.me/api/portraits/women/49.jpg",
  "https://randomuser.me/api/portraits/women/50.jpg",
];

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const Chat: React.FC = () => {
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser) as { _id: string } | null;
  const dispatch = useDispatch();
  const [isOnline] = useState(true);
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [userImage] = useState(randomImages[getRandomInt(randomImages.length)]);

  const selectedUser = useSelector((state: RootState) => state.selectedUser.selectedUser);
  const messages = useSelector((state: RootState) =>
    selectedUser?._id ? state.messages.chatHistory[selectedUser._id] || [] : []
  );

  // Use the custom useSocket hook to handle socket connection and notifications
  const socket = useSocket();

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (!selectedUser?._id || message.trim() === "") {
      console.log("No user selected or empty message");
      return;
    }

    const newMessage: Message = {
      content: message,
      msgOwner: loggedInUser?._id || "",
      date: new Date().toISOString(),
    };

    dispatch(addMessage({ userId: selectedUser._id, message: newMessage }));
    setMessage("");

    // Emit message to the server with the current and selected user
    socket?.emit("message", { content: message, from: loggedInUser?._id, to: selectedUser._id });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(message);
    }
  };

  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#fffcf8]">
      {/* Chat Area */}
      <div className="h-full w-full bg-[#fbf1e3] rounded-md flex overflow-hidden shadow-xl">
        <main className="flex flex-col h-full w-full">
          {/* Header */}
          <header className="w-full py-2 px-4 flex items-center justify-between bg-[#00A884] text-slate-200">
            <div className="flex gap-6 items-center">
              <img
                src={userImage}
                className="rounded-full w-10 h-10"
                alt="User Profile"
              />
              <h3 className="font-medium text-lg">
                {selectedUser?.name || "Select a user to start chatting"}
              </h3>
            </div>
            <h3 className={isOnline ? "text-[#d7d0d0]" : "text-slate-400"}>
              {isOnline ? "Active now" : "Last online: 12:53 AM"}
            </h3>
          </header>

          {/* Chat Area (Messages) */}
          <div className="flex-grow w-full overflow-y-auto p-4 scrollbar-webkit" ref={chatContainerRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null}
                className={`flex ${msg.msgOwner === loggedInUser?._id ? "justify-end" : "justify-start"} mb-2`}
              >
                <Bubble message={msg.content} sender={msg.msgOwner} />
              </div>
            ))}
          </div>

          {/* Footer (Input field) */}
          <footer className="w-full py-2 px-4 flex items-center gap-2 bg-[#00A884] text-slate-200">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-grow py-2 px-4 rounded-lg bg-slate-100 text-slate-900"
            />
            <button
              onClick={() => handleSendMessage(message)}
              className="bg-white text-[#00A884] px-4 py-2 rounded-lg"
            >
              Send
            </button>
            <button
              onClick={() => dispatch(clearMessagesForUser(selectedUser?._id || ""))}
              className="bg-white text-[#00A884] px-4 py-2 rounded-lg"
            >
              Clear Messages
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Chat;

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { addMessage, Message } from "../../Redux/features/messagesSlice";
import { Notification, setNotification } from "../../Redux/features/notificationsSlice";
import { FriendRequest, addFriendRequest } from "@/Redux/features/friendRequestSlice";

// Custom hook to manage the socket connection and event listeners
export const useSocket = (): Socket | null => {
  // Reference to the socket instance, initialized to null
  const socketRef = useRef<Socket | null>(null);

  // Access user data from Redux store
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);

  // Dispatch function for Redux actions
  const dispatch = useDispatch();

  // Effect to handle socket connection and event listeners
  useEffect(() => {
    // Check if socket is not already created
    if (!socketRef.current) {
      // Create a new socket connection to the server
      const newSocket = io("http://localhost:3000");
      socketRef.current = newSocket;

      // Event listener for successful connection
      newSocket.on("connect", () => {
        console.log("Connected to server");

        // If a logged-in user exists, emit an event with their ID
        if (loggedInUser?._id) {
          newSocket.emit("loggedInUserId", { loggedInUserId: loggedInUser._id });
        }
      });

      // Event listener for incoming messages
      newSocket.on("message", ({ content, from }) => {
        // Create a new message object
        const newMessage: Message = {
          content,
          msgOwner: from || "", // Handle potential undefined 'from'
          date: new Date().toISOString(),
        };

        // Dispatch action to add the message to the Redux store
        dispatch(addMessage({ userId: from, message: newMessage }));
      });

      // Event listener for friend request notifications
      newSocket.on("friendRequestNotification", ({ userFrom }) => {
        if (userFrom) {
          // Create a new notification object for the friend request
          const newNotification: Notification = {
            message: `You have a friend request from ${userFrom?.name || "Unknown User"}`,
          };
          dispatch(setNotification(newNotification));

          // Create a new friend request object
          const newFriendRequest: FriendRequest = {
            from: userFrom,
            date: new Date(),
          };
          dispatch(addFriendRequest(newFriendRequest));
        } else {
          console.log("The received userFrom is undefined");
        }
      });

      // Event listener for friend request status notifications
      newSocket.on("friendRequesterNotification", ({ requestStatus }) => {
        // Create a notification object based on the friend request status
        const newNotification: Notification = {
          message: `Your friend request was ${requestStatus}`,
        };
        dispatch(setNotification(newNotification));
      });

      // Event listener for connection errors
      newSocket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });
    }

    // Cleanup function to clean up socket listeners on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.off("message");
        socketRef.current.off("friendRequestNotification");
        socketRef.current.off("friendRequesterNotification");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [dispatch, loggedInUser?._id]); // Dependency array for the effect

  // Return the current socket instance, or null if not connected
  return socketRef.current;
};
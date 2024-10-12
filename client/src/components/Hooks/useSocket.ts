import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { addMessage, Message } from "../../Redux/features/messagesSlice";
import { Notification, setNotification } from "../../Redux/features/notificationsSlice";
import { FriendRequest, addFriendRequest } from "@/Redux/features/friendRequestSlice";

export const useSocket = (): Socket | null => {
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      const newSocket = io("http://localhost:3000");
      socketRef.current = newSocket;

      newSocket.on("connect", () => {
        console.log("Connected to server");

        if (loggedInUser?._id) {
          newSocket.emit("loggedInUserId", { loggedInUserId: loggedInUser._id });
        }
      });

      newSocket.on("message", ({ content, from }) => {
        const newMessage: Message = {
          content,
          msgOwner: from || "",
          date: new Date().toISOString(),
        };
        dispatch(addMessage({ userId: from, message: newMessage }));
      });

      newSocket.on("friendRequestNotification", ({ userFrom }) => {

        if(userFrom){
          const newNotification:Notification = {
            message: `You have a friend request from ${userFrom?.name || "Unknown User"}`,
          }
          dispatch(setNotification(newNotification));

          const newFriendRequest:FriendRequest = {
            from: userFrom,
            date: new Date().toISOString(),
          }
          dispatch(addFriendRequest(newFriendRequest));
        }else{
          console.log("The received userFrom is undefined");
        }
      });

      newSocket.on("friendRequesterNotification",({requestStatus}) => {
        const newNotification:Notification = {
          message: `Your friend request was ${requestStatus}`,
        }
        dispatch(setNotification(newNotification));
      })

      newSocket.on("connect_error", (error) => {
        console.error("Connection error:", error);
      });
    }

    return () => {
      socketRef.current?.off("message");
      socketRef.current?.off("friendRequestNotification");
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [dispatch, loggedInUser?._id]);

  return socketRef.current;
};

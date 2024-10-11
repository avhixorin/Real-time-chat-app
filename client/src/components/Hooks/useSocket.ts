import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { addMessage, Message } from "../../Redux/features/messagesSlice";
import { Notification, setNotification } from "../../Redux/features/notificationsSlice";

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

      newSocket.on("friendRequestNotification", ({ status,from }) => {
        const newNotification:Notification = {
          from:from,
          status:status
        }
        dispatch(setNotification(newNotification))
        alert(`Friend Request ${status}`)
      });

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

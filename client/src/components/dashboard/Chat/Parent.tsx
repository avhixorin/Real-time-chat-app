import React, { useState } from "react";
import SearchBar from "../searchbar/searchbar";
import LeftSideBar from "./leftSideBar/LeftSideBar";
import MessageWindow from "./messageWindow/MessageWindow";
import RightSideBar from "./RightSideBar/RightSideBar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import CloseIcon from '@mui/icons-material/Close';

const Parent: React.FC = () => {
  const allusers = useSelector((state: RootState) => state.allUsers.allUsers);
  const [acceptButtonText, setAcceptButtonText] = useState<string>("Accept");
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser);
  const notifications = useSelector(
    (state: RootState) => state.notifications.notifications
  );

  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState<boolean>(false);
  const [isFriendRequestSectionOpen, setIsFriendRequestSectionOpen] = useState<boolean>(false);

  const handleNotificationClick = () => {
    setIsNotificationPanelOpen((prev) => !prev);
  };

  const handleFriendRequestPanelClick = () => {
    setIsFriendRequestSectionOpen((prev) => !prev);
  };

  const findUserName = (userId: string) => {
    const user = allusers.find((user) => user._id === userId);
    return user ? user.name : "Unknown User";
  };

  const handleRequest = async (requester: string, accepter: string, status: string) => {
    try {
      setAcceptButtonText("wait..");
      const response = await fetch(
        `http://localhost:3000/api/v1/users/friendRequest/${requester}/${accepter}/${status}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        console.log("The response was not ok");
      }

      const data = await response.json();
      setAcceptButtonText(status === "accepted" ? "Accepted" : "Rejected");

      setTimeout(() => {
        setIsFriendRequestSectionOpen(false);
        setAcceptButtonText("Accept");
      }, 1000);

      console.log(data);
    } catch (error) {
      console.log((error as Error).message);
      setAcceptButtonText("Accept");
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center py-10 gap-4 overflow-hidden">
      {/* Top Section with SearchBar and Notification */}
      <div className="w-full px-6 flex gap-8 justify-center items-center">
        <SearchBar />
        <div
          className="relative cursor-pointer"
          onClick={handleNotificationClick}
        >
          <NotificationsNoneIcon style={{ fontSize: 32, color: "white" }} />
          {notifications.length > 0 && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex justify-center items-center">
              <p className="text-white text-xs">{notifications.length}</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full h-full flex">
        {/* Left Sidebar */}
        <div className="min-w-72 h-full">
          <LeftSideBar />
        </div>

        {/* Message Window */}
        <div className="w-full h-full">
          <MessageWindow />
        </div>

        {/* Right Sidebar */}
        <div className="min-w-72 h-full">
          <RightSideBar handleFriendRequestPanelClick={handleFriendRequestPanelClick} />
        </div>

        {/* Notification Panel */}
        <div
          className={`${
            isNotificationPanelOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"
          } transition-all duration-300 absolute top-16 right-[6.5rem] w-64 p-4 bg-gray-800 text-white rounded-lg shadow-lg z-50`}
          style={{ transformOrigin: "top right" }}
        >
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>
            <div onClick={() => setIsNotificationPanelOpen(false)}>
              <CloseIcon className="cursor-pointer" />
            </div>
          </div>
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification, index) => (
                <li key={index} className="mb-1 flex justify-start items-center gap-4">
                  <img src="https://randomuser.me/api/portraits/men/49.jpg" className="w-8 h-8 rounded-full shadow-lg" alt="" />
                  {findUserName(notification.from)} : {notification.status}
                </li>
              ))}
            </ul>
          ) : (
            <p>No new notifications</p>
          )}
        </div>

        {/* Friend Request Section */}
        {isFriendRequestSectionOpen && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 bg-zinc-700 text-white shadow-xl">
            <div className="flex justify-between gap-8">
              <h3 className="text-xl font-semibold mb-4">Friend Requests</h3>
              <div onClick={() => setIsFriendRequestSectionOpen(false)}>
                <CloseIcon className="cursor-pointer" />
              </div>
            </div>
            <ul>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <li key={index} className="flex justify-between items-center gap-4">
                    <img src="https://randomuser.me/api/portraits/men/49.jpg" className="w-8 h-8 rounded-full shadow-lg" alt="" />
                    <p>{findUserName(notification.from)}</p>
                    <button
                      className="bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600"
                      onClick={() => loggedInUser && handleRequest(notification.from, loggedInUser._id, "accepted")}
                    >
                      {acceptButtonText}
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
                      onClick={() => loggedInUser && handleRequest(notification.from, loggedInUser._id, "rejected")}
                    >
                      Reject
                    </button>
                  </li>
                ))
              ) : (
                <p>No friend requests</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Parent;

import React from "react";
import ChatCard from "./chatCard/ChatCard";
import { useAllFriends } from "../../../Hooks/useAllFriends";

const randomImages = [
  "https://randomuser.me/api/portraits/women/48.jpg",
  "https://randomuser.me/api/portraits/men/49.jpg",
  "https://randomuser.me/api/portraits/women/50.jpg",
];

const LeftSideBar: React.FC = () => {
  const allFriends = useAllFriends();
  return (
    <div className="w-full h-full overflow-y-auto rounded-e-lg bg-slate-200">
      {Array.isArray(allFriends) && allFriends.length > 0 ? (
        allFriends.map((user, index) => (
          <ChatCard
            key={user._id || index}
            user={user}
            imgSrc={randomImages[index % randomImages.length]}
          />
        ))
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default LeftSideBar;
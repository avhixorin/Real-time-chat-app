import React from "react";
import ChatCard from "./chatCard/ChatCard";
import { useAllFriends } from "../../../Hooks/useAllFriends";

const LeftSideBar: React.FC = () => {
  const allFriends = useAllFriends();

  return (
    <div className="w-full h-full overflow-y-auto rounded-e-lg bg-slate-200">
      {Array.isArray(allFriends) && allFriends.length > 0 ? (
        allFriends.map((user, index) => (
          <ChatCard key={user._id || index} user={user} />
        ))
      ) : (
        <p className="w-full h-full text-xl text-gray-500 text-center px-4 py-2 flex justify-center items-center">
          Start sending friend requests to begin chatting!
        </p>
      )}
    </div>
  );
};

export default LeftSideBar;

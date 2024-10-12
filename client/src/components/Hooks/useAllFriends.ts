import { useDispatch, useSelector } from "react-redux";
import { setAllFriends } from "../../Redux/features/allFriendsSlice"; 
import { RootState } from "../../Redux/store"; 
import { useEffect } from "react";

export const useAllFriends = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser); 
  const allFriends = useSelector((state: RootState) => state.allFriends.allFriends);

  const loggedInUserId = loggedInUser?._id;

  const getallfriends = async () => {
    if (!loggedInUserId) {
      console.log("No logged in user ID found, skipping user fetch.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/getallfriends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ loggedInUserId })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch users`);
      }

      const data = await response.json();
      dispatch(setAllFriends(data.users));
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  useEffect(() => {
    getallfriends();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUserId]);

  return allFriends;
};

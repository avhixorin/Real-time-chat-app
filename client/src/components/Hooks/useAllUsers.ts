import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../Redux/features/allUsersSlice"; 
import { RootState } from "../../Redux/store"; 
import { useEffect } from "react";

export const useAllUsers = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser); 
  const allUsers = useSelector((state: RootState) => state.allUsers.allUsers);

  const loggedInuserId = loggedInUser?._id;

  const getAllUsers = async () => {
    if (!loggedInuserId) {
      console.log("No logged in user ID found, skipping user fetch.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/getallusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loggedInUserId: loggedInuserId }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch users`);
      }

      const data = await response.json();
      dispatch(setAllUsers(data.users));
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };


  useEffect(() => {
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInuserId]);

  return allUsers;
};

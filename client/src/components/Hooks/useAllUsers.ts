import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../Redux/features/allUsersSlice"; 
import { RootState } from "../../Redux/store"; 
import { useEffect } from "react";

export const useAllUsers = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state: RootState) => state.loggedInUser); 
  const allUsers = useSelector((state: RootState) => state.allUsers.allUsers);

  const loggedInUserId = loggedInUser?._id;

  const getAllUsers = async () => {
    if (!loggedInUserId) {
      console.log("No logged in user ID found, skipping user fetch.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/getallusers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
  }, [loggedInUserId]);

  return allUsers;
};

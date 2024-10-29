// Import necessary hooks and actions from React and Redux
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../Redux/features/allUsersSlice"; 
import { RootState } from "../../Redux/store"; 
import { useEffect } from "react";

// Custom hook to fetch and manage all users in the system
export const useAllUsers = () => {
 // Initialize Redux dispatch
 const dispatch = useDispatch();
 
 // Select relevant state from Redux store
 const loggedInUser = useSelector((state: RootState) => state.loggedInUser); 
 const allUsers = useSelector((state: RootState) => state.allUsers.allUsers);

 // Extract logged-in user's ID
 const loggedInuserId = loggedInUser?._id;

 // Function to fetch all users from the API
 const getAllUsers = async () => {
   // Guard clause: Skip if no user is logged in
   if (!loggedInuserId) {
     console.log("No logged in user ID found, skipping user fetch.");
     return;
   }

   try {
     // Make API request to fetch all users
     const response = await fetch("http://localhost:3000/api/v1/users/getallusers", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       // Include logged-in user's ID in request body
       body: JSON.stringify({ loggedInUserId: loggedInuserId }),
     });

     // Handle unsuccessful responses
     if (!response.ok) {
       throw new Error(`Error ${response.status}: Failed to fetch users`);
     }

     // Parse response and update Redux store with user data
     const data = await response.json();
     dispatch(setAllUsers(data.users));
     
   } catch (error) {
     // Log any errors that occur during the fetch
     console.error("Error fetching users:", error);
   }
 };

 // Effect to fetch users when logged in user changes
 useEffect(() => {
   getAllUsers();
 // Disable exhaustive-deps warning as we only want to run this when loggedInuserId changes
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [loggedInuserId]);

 // Return the users array for use in components
 return allUsers;
};
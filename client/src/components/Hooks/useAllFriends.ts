// Import necessary dependencies from React and Redux
import { useDispatch, useSelector } from "react-redux";
import { setAllFriends } from "../../Redux/features/allFriendsSlice"; 
import { RootState } from "../../Redux/store"; 
import { useEffect } from "react";

// Custom hook to manage and fetch all friends for the logged-in user
export const useAllFriends = () => {
 // Initialize Redux dispatch
 const dispatch = useDispatch();
 
 // Select necessary state from Redux store
 const loggedInUser = useSelector((state: RootState) => state.loggedInUser); 
 const allFriends = useSelector((state: RootState) => state.allFriends.allFriends);

 // Get the logged-in user's ID
 const loggedInUserId = loggedInUser?._id;

 // Function to fetch all friends from the API
 const getallfriends = async () => {
   // Guard clause: Skip if no user is logged in
   if (!loggedInUserId) {
     console.log("No logged in user ID found, skipping user fetch.");
     return;
   }

   try {
     // Make API request to fetch friends
     const response = await fetch("http://localhost:3000/api/v1/users/getallfriends", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       // Send logged in user's ID in request body
       body: JSON.stringify({ loggedInUserId })
     });

     // Handle unsuccessful response
     if (!response.ok) {
       throw new Error(`Error ${response.status}: Failed to fetch users`);
     }

     // Parse response data and update Redux store
     const data = await response.json();
     dispatch(setAllFriends(data.friends));
     
   } catch (error) {
     // Log any errors that occur during the fetch
     console.error("Error fetching users:", error);
   }
 };

 // Effect to fetch friends when logged in user changes
 useEffect(() => {
   getallfriends();
 // Disable exhaustive-deps warning as we only want to run this when loggedInUserId changes
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [loggedInUserId]);

 // Return the friends array for use in components
 return allFriends;
};
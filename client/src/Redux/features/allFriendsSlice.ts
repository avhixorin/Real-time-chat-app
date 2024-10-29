// Import necessary dependencies from Redux Toolkit
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User interface to specify the shape of user data
interface User {
  _id: string;      // Unique identifier for the user
  name: string;     // Full name of the user
  email: string;    // Email address of the user
  usrname: string;  // Username (likely used for display/identification)
  profilePic: string; // URL or path to user's profile picture
}

// Define the interface for the slice state
interface AllFriends {
  allFriends: User[]; // Array to store all friends' data
}

// Set up initial state for the slice
const initialState: AllFriends = {
  allFriends: [], // Initialize with empty array
};

// Create the Redux slice
const allFriendsSlice = createSlice({
  name: "allFriends", // Name of the slice (used in action types)
  initialState,       // Initial state defined above
  reducers: {
    // Reducer to update the entire friends list
    setAllFriends: (state, action: PayloadAction<User[]>) => {
      // Update state with new array of friends
      // PayloadAction<User[]> ensures type safety for the action payload
      state.allFriends = action.payload;
    },
  },
});

// Export the action creator for use in components
export const { setAllFriends } = allFriendsSlice.actions;
// Export the reducer for use in store configuration
export default allFriendsSlice.reducer;
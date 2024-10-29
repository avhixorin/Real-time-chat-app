// Import required dependencies from Redux Toolkit for creating slices and handling typed actions
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define and export User interface for reuse across the application
// This represents the structure of a single user's data
export interface User {
  _id: string;      // Unique identifier for each user
  name: string;     // User's full name
  email: string;    // User's email address
  username: string; // User's chosen username
  profilePic: string; // URL or path to user's profile picture
}

// Define the shape of the slice's state
// This interface holds an array of all users
interface AllUsers {
  allUsers: User[]; // Array to store all users in the system
}

// Define the initial state for the slice
// Start with an empty array of users
const initialState: AllUsers = {
  allUsers: [],
};

// Create the Redux slice for managing all users
const allUsersSlice = createSlice({
  name: "allUsers", // Unique name for this slice
  initialState,     // Use the initial state defined above
  reducers: {
    // Reducer to update the entire users list
    // Takes the current state and an action containing the new users array
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      // Updates the state with the new array of users
      // Redux Toolkit allows "mutating" logic thanks to Immer library
      state.allUsers = action.payload;
    },
  },
});

// Export the action creator for dispatching actions from components
export const { setAllUsers } = allUsersSlice.actions;
// Export the reducer for use in the Redux store configuration
export default allUsersSlice.reducer;
// Import createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the User interface representing the complete user data structure
export interface User {
 _id: string;           // Unique identifier for the user
 name: string;          // User's full name
 email: string;         // User's email address
 username: string;      // User's chosen username
 password: string;      // User's password (Note: storing in state might need security review)
 profilePic: string;    // URL or path to user's profile picture
 friends: string[];     // Array of friend user IDs
 friendRequests: string[]; // Array of pending friend request IDs
 messages: string[];    // Array of message IDs
 __v: number;          // Version key (typically used by MongoDB)
}

// Set up initial state with empty/default values
const initialState: User = {
 _id: '',
 name: "",
 username: "",
 email: "",
 password: "",
 profilePic: "",
 friends: [],
 friendRequests: [],
 messages: [],
 __v: 0
};

// Create the user slice to manage authentication state
export const userSlice = createSlice({
 name: "user",
 initialState,
 reducers: {
   // Handle user login by replacing entire state with user data
   setLoginUser: (_, action) => {
     // Return new state with all user data from payload
     return { ...action.payload }; 
   },
   // Handle user logout by resetting state to initial values
   setLogoutUser: () => {
     // Return to initial empty state
     return initialState; 
   },
 },
});

// Export action creators for use in components
export const { setLoginUser, setLogoutUser } = userSlice.actions;
// Export reducer for store configuration
export default userSlice.reducer;
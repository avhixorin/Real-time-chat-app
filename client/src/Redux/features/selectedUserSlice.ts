// Import required Redux Toolkit utilities
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a selected user's data
export interface SelectedUser {
 _id: string;       // Unique identifier for the user
 name: string;      // User's full name
 email: string;     // User's email address
 username: string;  // User's username
 profilePic: string; // URL or path to user's profile picture
}

// Define the state structure for selected user
interface SelectedUserState {
 selectedUser: SelectedUser | null;  // Can either be a user object or null when no user is selected
}

// Initialize state with no selected user
const initialState: SelectedUserState = {
 selectedUser: null,
};

// Create the selected user slice
const selectedUserSlice = createSlice({
 name: "selectedUser",
 initialState,
 reducers: {
   // Update the currently selected user
   setSelectedUser: (state, action: PayloadAction<SelectedUser>) => {
     // Set the selected user to the provided user object
     state.selectedUser = action.payload;
   },
 },
});

// Export action creator for use in components
export const { setSelectedUser } = selectedUserSlice.actions;
// Export reducer for store configuration
export default selectedUserSlice.reducer;
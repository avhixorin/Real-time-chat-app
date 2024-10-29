// Import necessary Redux Toolkit dependencies and User type from allUsersSlice
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./allUsersSlice";

// Define interface for a friend request object
export interface FriendRequest {
 from: User;     // User who sent the friend request
 date: Date;     // Date when the request was sent
}

// Define the shape of the friend request slice state
interface FriendRequestState {
 friendRequests: FriendRequest[];  // Array to store all friend requests
}

// Set initial state with empty friend requests array
const initialState: FriendRequestState = {
 friendRequests: [],
};

// Create slice for managing friend requests
const friendRequestSlice = createSlice({
 name: "friendRequest",
 initialState,
 reducers: {
   // Add a new friend request to the state
   addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
     if(action.payload) {
       // Initialize friendRequests array if it doesn't exist
       if (!state.friendRequests) {
         state.friendRequests = [];  
       }
       // Add new friend request to the array
       state.friendRequests.push(action.payload);
     }
   },

   // Remove a friend request at specified index
   removeFriendRequest: (state, action: PayloadAction<number>) => {
     // Remove one element at the specified index
     state.friendRequests.splice(action.payload, 1);
   },

   // Clear all friend requests
   clearFriendRequests: (state) => {
     // Reset friend requests array to empty
     state.friendRequests = [];
   },
 },
});

// Export action creators for use in components
export const { 
 addFriendRequest, 
 removeFriendRequest, 
 clearFriendRequests 
} = friendRequestSlice.actions;

// Export reducer for store configuration
export default friendRequestSlice.reducer;
// friendRequestSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./allUsersSlice";

// Define the structure of a single FriendRequest
export interface FriendRequest {
  from: User;
  date: Date;
}

// Define the structure of the slice state
interface FriendRequestState {
  friendRequests: FriendRequest[]; // An array to hold multiple friend requests
}

// Initialize the state with an empty array
const initialState: FriendRequestState = {
  friendRequests: [],
};

// Create the slice
const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {
    addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      if(action.payload) {
        if (!state.friendRequests) {
          state.friendRequests = [];  
        }
        state.friendRequests.push(action.payload);
      }
      
    },
    // Action to remove a friend request by index
    removeFriendRequest: (state, action: PayloadAction<number>) => {
      state.friendRequests.splice(action.payload, 1);
    },
    // Optional: Action to clear all friend requests
    clearFriendRequests: (state) => {
      state.friendRequests = [];
    },
  },
});

// Export actions
export const { addFriendRequest, removeFriendRequest, clearFriendRequests } = friendRequestSlice.actions;

// Export reducer
export default friendRequestSlice.reducer;

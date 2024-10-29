// Import necessary Redux Toolkit utilities
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a message
export interface Message {
 content: string;    // The actual message content
 msgOwner: string;   // ID or identifier of who sent the message
 date: string;       // Timestamp of when the message was sent
}

// Define the state structure for messages
// Uses a dictionary/hash map approach for efficient message storage and retrieval
export interface MessagesState {
 chatHistory: {
   [userId: string]: Message[];  // Key-value pairs where key is userId and value is array of messages
 };
}

// Initialize state with empty chat history object
const initialState: MessagesState = {
 chatHistory: {},
};

// Create the messages slice
const messagesSlice = createSlice({
 name: "messages",
 initialState,
 reducers: {
   // Add a new message to a specific user's chat history
   addMessage: (
     state,
     action: PayloadAction<{ userId: string; message: Message }>
   ) => {
     const { userId, message } = action.payload;
     // Initialize empty message array for new users
     if (!state.chatHistory[userId]) {
       state.chatHistory[userId] = []; 
     }
     // Add new message to the user's chat history
     state.chatHistory[userId].push(message); 
   },

   // Clear all messages for a specific user
   clearMessagesForUser: (state, action: PayloadAction<string>) => {
     const userId = action.payload;
     // Reset the specified user's message array to empty
     state.chatHistory[userId] = []; 
   },

   // Clear entire chat history for all users
   clearAllMessages: (state) => {
     // Reset entire chat history to empty object
     state.chatHistory = {}; 
   },
 },
});

// Export action creators for use in components
export const { addMessage, clearMessagesForUser, clearAllMessages } =
 messagesSlice.actions;
// Export reducer for store configuration
export default messagesSlice.reducer;
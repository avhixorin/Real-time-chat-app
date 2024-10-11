import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  content: string;
  msgOwner: string;
  date: string;
}

export interface MessagesState {
  chatHistory: {
    [userId: string]: Message[];
  };
}

const initialState: MessagesState = {
  chatHistory: {},
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{ userId: string; message: Message }>
    ) => {
      const { userId, message } = action.payload;
      if (!state.chatHistory[userId]) {
        state.chatHistory[userId] = []; // Initialize the user's message array if it doesn't exist
      }
      state.chatHistory[userId].push(message); // Push the new message to the user's message array
    },
    clearMessagesForUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.chatHistory[userId] = []; // Clear all messages for the specified user
    },
    clearAllMessages: (state) => {
      state.chatHistory = {}; // Clear messages for all users
    },
  },
});

export const { addMessage, clearMessagesForUser, clearAllMessages } =
  messagesSlice.actions;
export default messagesSlice.reducer;

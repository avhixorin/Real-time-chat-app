// Import necessary Redux Toolkit utilities for slice creation and typed actions
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a notification message
export interface Notification {
   message: string;  // The content of the notification
}

// Define the state structure for notifications
interface NotificationState {
   notifications: Notification[];  // Array to store all notifications
}

// Initialize state with empty notifications array
const initialState: NotificationState = {
   notifications: [],
}

// Create the notifications slice
const notificationSlice = createSlice({
   name: "notifications",
   initialState,
   reducers: {
       // Add a new notification to the state
       setNotification: (
           state,
           action: PayloadAction<Notification>
       ) => {
           // Add new notification to the array
           state.notifications.push(action.payload);
           // Log notification for debugging purposes
           console.log("This is action payload", action.payload)
       },
       
       // Clear all notifications
       clearAllNotifications: (state) => {
           // Reset notifications array to empty
           state.notifications = [];
       }
   }
});

// Export action creators for use in components
export const { setNotification, clearAllNotifications } = notificationSlice.actions;
// Export reducer for store configuration
export default notificationSlice.reducer;
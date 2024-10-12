import { createSlice, PayloadAction } from "@reduxjs/toolkit";



export interface Notification {
    message: string;
}

interface NotificationState {
    notifications: Notification[]; 
}

const initialState: NotificationState = {
    notifications: [],
}

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        setNotification: (
            state,
            action: PayloadAction<Notification>
        ) => {
            state.notifications.push(action.payload);
            console.log("This is action payload",action.payload)
        },
        
        clearAllNotifications: (state) => {
            state.notifications = [];
        }
    }
});

export const { setNotification, clearAllNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

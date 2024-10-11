import { createSlice, PayloadAction } from "@reduxjs/toolkit";

enum NotificationStatus {
    pending = "pending",
    accepted = "accepted",
    rejected = "rejected",
}

export interface Notification {
    from: string;
    status: NotificationStatus;
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
        clearNotification: (state, action: PayloadAction<{ user: string }>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.from !== action.payload.user
            );
        },
        clearAllNotifications: (state) => {
            state.notifications = [];
        }
    }
});

export const { setNotification, clearNotification, clearAllNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;

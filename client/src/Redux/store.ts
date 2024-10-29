// Import necessary dependencies from Redux Toolkit and Redux Persist
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";  // Uses localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";

// Import all slice reducers
import userSlice from "../Redux/features/userSlice";
import allFriendsSlice from "./features/allFriendsSlice";
import allUsersSlice from "./features/allUsersSlice"
import selectedUserSlice from "./features/selectedUserSlice";
import notificationSlice from "./features/notificationsSlice"
import messagesSlice from "./features/messagesSlice"; 
import friendRequestSlice from "./features/friendRequestSlice";

// Configure Redux Persist
const persistConfig = {
 key: "root",        // Key for localStorage
 storage,           // Storage engine (localStorage)
};

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
 loggedInUser: userSlice,          // Current user's data
 allFriends: allFriendsSlice,      // List of user's friends
 allUsers: allUsersSlice,          // List of all users
 selectedUser: selectedUserSlice,   // Currently selected user
 messages: messagesSlice,          // Chat messages
 notifications: notificationSlice,  // System notifications
 friendRequests: friendRequestSlice, // Friend requests
});

// Wrap root reducer with persistence capability
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
 reducer: persistedReducer,
 // Configure middleware to handle Redux Persist actions
 middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware({
     serializableCheck: {
       // Ignore Redux Persist actions in serialization check
       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
     },
   }),
});

// Create persistor for Redux Persist
export const persistor = persistStore(store);
// Export RootState type for TypeScript support
export type RootState = ReturnType<typeof rootReducer>;
// Export the configured store
export default store;
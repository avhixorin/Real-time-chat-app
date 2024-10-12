import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "../Redux/features/userSlice";
import allFriendsSlice from "./features/allFriendsSlice";
import allUsersSlice from "./features/allUsersSlice"
import selectedUserSlice from "./features/selectedUserSlice";
import notificationSlice from "./features/notificationsSlice"
import messagesSlice from "./features/messagesSlice"; 
import friendRequestSlice from "./features/friendRequestSlice";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist/es/constants";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  loggedInUser: userSlice,
  allFriends: allFriendsSlice,
  allUsers:allUsersSlice,
  selectedUser: selectedUserSlice,
  messages: messagesSlice,
  notifications:notificationSlice,
  friendRequests: friendRequestSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export default store;

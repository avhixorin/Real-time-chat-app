import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;

}
interface AllFriends {
  allFriends: User[];
}

const initialState: AllFriends = {
  allFriends: [],
};

const allFriendsSlice = createSlice({
  name: "allFriends",
  initialState,
  reducers: {
    setAllFriends: (state, action: PayloadAction<User[]>) => {
      state.allFriends = action.payload;
    },
  },
});

export const { setAllFriends } = allFriendsSlice.actions;
export default allFriendsSlice.reducer;

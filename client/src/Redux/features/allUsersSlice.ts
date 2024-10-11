import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;

}
interface AllUsers {
  allUsers: User[];
}

const initialState: AllUsers = {
  allUsers: [],
};

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;

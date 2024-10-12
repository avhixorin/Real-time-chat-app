import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SelectedUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  profilePic: string;
}

interface SelectedUserState {
  selectedUser: SelectedUser | null;
}

const initialState: SelectedUserState = {
  selectedUser: null,
};

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<SelectedUser>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;

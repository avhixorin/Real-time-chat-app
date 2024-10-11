import { createSlice } from "@reduxjs/toolkit";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  friends: string[];
  friendRequests: string[];
  messages: string[]; 
  __v: number;
}

const initialState: User = {
  _id: '',
  name: "",
  email: "",
  password: "",
  friends: [],
  friendRequests: [],
  messages: [],
  __v: 0
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginUser: (_, action) => {
      return { ...action.payload }; 
    },
    setLogoutUser: () => {
      return initialState; 
    },
  },
});

export const { setLoginUser, setLogoutUser } = userSlice.actions;
export default userSlice.reducer;

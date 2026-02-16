import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.token = localStorage.getItem("token");
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

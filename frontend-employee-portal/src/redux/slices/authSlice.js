import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userDetails: null,                       // employee object in memory only
  GetToken: null, // JWT token
  isLoggedIn: false,     // derived from token
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, { payload }) => { 
      console.log(payload,"payload");
      debugger
      state.userDetails = payload;
      state.isLoggedIn = true;
            debugger

    },

    // Save JWT token
    setGetToken: (state, { payload }) => {
      state.GetToken = payload;
      localStorage.setItem("token", payload);
      state.isLoggedIn = true;
    },

    // Logout
    logout: (state) => {
      state.userDetails = null;
      state.GetToken = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});
export const { setUserDetails, setGetToken, logout } = AuthSlice.actions;
export default AuthSlice.reducer;

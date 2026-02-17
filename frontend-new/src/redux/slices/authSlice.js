import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
  token: null,
  accessibleRoutes: [], // Routes from backend API
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails: (state, { payload }) => {
      state.userDetails = payload;
      state.isLoggedIn = true;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
      localStorage.setItem('token', payload);
      state.isLoggedIn = true;
    },
    setAccessibleRoutes: (state, { payload }) => {
      state.accessibleRoutes = payload || [];
    },
    logout: (state) => {
      state.userDetails = null;
      state.token = null;
      state.accessibleRoutes = [];
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setUserDetails, setToken, setAccessibleRoutes, logout } = authSlice.actions;
export default authSlice.reducer;

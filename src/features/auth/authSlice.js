import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  remember: false,
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setRemember(state, action) {
      state.remember = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    clearEmail(state) {
      state.email = "";
    },
  },
});

export const {
  setToken,
  clearAuth,
  setUser,
  setRemember,
  setEmail,
  clearEmail,
} = authSlice.actions;
export default authSlice.reducer;

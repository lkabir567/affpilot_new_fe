// features/auth/redux/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/auth.api";

interface User {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  is_verified: boolean;
}

interface AuthState {
  user: null | User;
  isVerified: boolean;
  recaptchaVerified: boolean;
  error: string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  isVerified: false,
  recaptchaVerified: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRecaptcha: (state, action) => {
      state.recaptchaVerified = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user_info;
          state.isVerified = payload.user_info.is_verified;
          state.token = payload.token;
        }
      )
      .addMatcher(
        authApi.endpoints.googleLogin.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user_info;
          state.isVerified = payload.user_info.is_verified;
        }
      )
      .addMatcher(authApi.endpoints.login.matchRejected, (state, { error }) => {
        state.error = error.message || "Login failed";
      });
  },
});

export const { setRecaptcha, clearError, logout } = authSlice.actions;
export default authSlice.reducer;

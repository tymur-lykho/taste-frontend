import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  refreshUser,
  register,
  fetchCurrentUser,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const slice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: null,
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, handleRejected)

      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoggedIn = true;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = {
          id: null,
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.isRefreshing = true;
      })

      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.isRefreshing = false;
      })

      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isRefreshing = false;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })

      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })

      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export default slice.reducer;

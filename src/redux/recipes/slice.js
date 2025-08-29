import { createSlice } from "@reduxjs/toolkit";
import { fetchOwnRecipes, fetchRecipes } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.data;
      })
      .addCase(fetchRecipes.rejected, handleRejected)
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // state.items = state.items.filter((item) => item.owner === action.payload.owner);
        state.items = action.payload;
        console.log("OwnRecipes:", action.payload)
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected);
  },
});

export default slice.reducer;

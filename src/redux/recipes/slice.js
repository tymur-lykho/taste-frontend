import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";

const handlePending = (state, action) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const RecipeSlice = createSlice({
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
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, handleRejected);
  },
});

export default RecipeSlice.reducer;

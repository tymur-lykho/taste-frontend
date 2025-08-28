// src/redux/recipes/slice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";

const initialState = {
  items: [],
  page: 1,
  isLoading: false,
  error: null,
  hasNext: true,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        const { list, page, hasNext } = action.payload;

        if (page === 1) {
          state.items = list; 
        } else {
          state.items.push(...list); 
        }

        state.page = page;
        state.hasNext = hasNext; 
        state.isLoading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to load recipes";
      });
  },
});

export default recipesSlice.reducer;
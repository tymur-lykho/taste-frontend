// src/redux/recipes/slice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  page: 0,       
  hasNext: true, 
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error?.message || "Request failed";
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        const { list, page, hasNext } = action.payload;

        if (page === 1) state.items = list;
        else state.items.push(...list);

        state.page = page;
        state.hasNext = !!hasNext;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchRecipes.rejected, handleRejected);
  },
});

export default recipesSlice.reducer;
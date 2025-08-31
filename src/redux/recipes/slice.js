import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchOwnRecipes,
  fetchFavoritesRecipes,
  addFavoritesRecipe,
  removeFromFavorites,
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
  name: "recipes",
  initialState: {
    items: [],
    myRecipes: [],
    favoriteRecipes: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearRecipes: (state) => {
      state.items = [];
      state.myRecipes = [];
      state.favoriteRecipes = [];
    },
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
        state.myRecipes = action.payload.data.data;
        console.log("OwnRecipes:", action.payload.data.data);
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected)
      .addCase(fetchFavoritesRecipes.pending, handlePending)
      .addCase(fetchFavoritesRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.favoriteRecipes = action.payload.data.data;
        console.log("FavoritesRecipes:", action.payload);
      })
      .addCase(fetchFavoritesRecipes.rejected, handleRejected)
      .addCase(addFavoritesRecipe.fulfilled, (state, action) => {
        state.favoriteRecipes.push(action.payload.data.data);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favoriteRecipes = state.favoriteRecipes.filter(
          (recipe) => recipe._id !== action.payload.data.data
        );
      });
  },
});

export const { clearError, clearRecipes } = slice.actions;
export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchOwnRecipes,
  fetchFavoritesRecipes,
  addFavoritesRecipe,
  removeFromFavorites,
  fetchFavoritesId,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const handleRecipesFulfild = (state, action) => {
  state.isLoading = false;
  state.error = null;
  console.log("HHS", action.payload.data.data);

  if (action.payload.data.page === 1) {
    state.items = action.payload.data.data;
  } else {
    state.items.push(...action.payload.data.data);
  }
  state.totalItems = action.payload.data.totalItems;
  state.hasNextPage = action.payload.data.hasNextPage;
};

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    favoritesId: [],
    isLoading: false,
    error: null,
    hasNextPage: false,
    totalItems: null,
  },
  reducers: {
    clearRecipesState: (state) => {
      state.items = [];
      state.page = 1;
      state.hasNextPage = false;
      state.totalItems = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, handleRecipesFulfild)
      .addCase(fetchRecipes.rejected, handleRejected)

      // .addCase(fetchFilteredRecipes.pending, handlePending)
      // .addCase(fetchFilteredRecipes.fulfilled, handleFulfilled)
      // .addCase(fetchFilteredRecipes.rejected, handleRejected)

      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, handleRecipesFulfild)
      .addCase(fetchOwnRecipes.rejected, handleRejected)

      .addCase(fetchFavoritesRecipes.pending, handlePending)
      .addCase(fetchFavoritesRecipes.fulfilled, handleRecipesFulfild)
      .addCase(fetchFavoritesRecipes.rejected, handleRejected)

      .addCase(fetchFavoritesId.pending, handlePending)
      .addCase(fetchFavoritesId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.favoriteRecipes = action.payload.favoriteRecipes;
      })
      .addCase(fetchFavoritesId.rejected, handleRejected)

      .addCase(addFavoritesRecipe.pending, handlePending)
      .addCase(addFavoritesRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const addRecipeToFavorites = action.payload;
        state.favoriteRecipes.push(addRecipeToFavorites);
      })
      .addCase(addFavoritesRecipe.rejected, handleRejected)

      .addCase(removeFromFavorites.pending, handlePending)
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const recipeId = action.payload;

        state.favoriteRecipes = state.favoriteRecipes.filter(
          (id) => id !== recipeId
        );
        if (window.location.pathname.includes("/profile/favorites")) {
          state.items = state.items.filter((recipe) => recipe._id !== recipeId);
          state.totalItems -= 1;
        }
      })
      .addCase(removeFromFavorites.rejected, handleRejected);
  },
});

export const { clearRecipesState } = slice.actions;
export default slice.reducer;

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

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    favoriteRecipes: [],
    isLoading: false,
    error: null,
    hasNextPage: false,
    page: 1,
    totalItems: null,
  },
  reducers: {
    clearRecipesState: (state) => {
      state.items = [];
      state.page = 1;
      state.hasNextPage = false;
      state.totalItems = null;
    },
    nextPage: (state) => {
      state.page += 1;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
      state.items = [];
      state.page = 1;
      state.totalItems = null;
      state.hasNextPage = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (action.payload.data.page === 1) {
          state.items = action.payload.data.data;
        } else {
          state.items.push(...action.payload.data.data);
        }
        state.totalItems = action.payload.data.totalItems;
        state.hasNextPage = action.payload.data.hasNextPage;
      })
      .addCase(fetchRecipes.rejected, handleRejected)
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (action.payload.data.page === 1) {
          state.items = action.payload.data.data;
        } else {
          state.items.push(...action.payload.data.data);
        }
        state.totalItems = action.payload.data.totalItems;
        state.hasNextPage = action.payload.data.hasNextPage;
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected)
      .addCase(fetchFavoritesRecipes.pending, handlePending)
      .addCase(fetchFavoritesRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (action.payload.data.page === 1) {
          state.items = action.payload.data.data;
        } else {
          state.items.push(...action.payload.data.data);
        }
        state.totalItems = action.payload.data.totalItems;
        state.hasNextPage = action.payload.data.hasNextPage;
      })
      .addCase(fetchFavoritesRecipes.rejected, handleRejected)
      .addCase(fetchFavoritesId.fulfilled, (state, action) => {
        state.favoriteRecipes = action.payload.favoriteRecipes;
      })
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
        }
      })
      .addCase(removeFromFavorites.rejected, handleRejected);
  },
});

export const { clearRecipesState, nextPage, setMode } = slice.actions;
export default slice.reducer;

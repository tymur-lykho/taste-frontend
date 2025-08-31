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
    isMyRecipesLoaded: false,
    isFavoritesLoaded: false,
    error: null,
  },
  reducers: {
    clearRecipesState: (state) => {
      state.myRecipes = [];
      state.favoriteRecipes = [];
      state.isMyRecipesLoaded = false;
      state.isFavoritesLoaded = false;
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
        state.myRecipes = action.payload.data;
        state.isMyRecipesLoaded = true;
      })
      .addCase(fetchOwnRecipes.rejected, handleRejected)
      .addCase(fetchFavoritesRecipes.pending, handlePending)
      .addCase(fetchFavoritesRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.favoriteRecipes = action.payload.data;
        state.isFavoritesLoaded = true;
        console.log("FavoritesRecipes:", action.payload.data); //
      })
      .addCase(fetchFavoritesRecipes.rejected, handleRejected)
      .addCase(addFavoritesRecipe.pending, handlePending)
      .addCase(addFavoritesRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const addRecipeToFavorites = action.payload.data;
        state.favoriteRecipes.push(addRecipeToFavorites);
        state.items = state.items.map(recipe =>
          recipe._id === addRecipeToFavorites._id
            ? { ...recipe, isFavorite: true }
            : recipe
        );
        console.log("ADD-Recipes:", addRecipeToFavorites); //
      })
      .addCase(addFavoritesRecipe.rejected, handleRejected)
      .addCase(removeFromFavorites.pending, handlePending)
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      
        const recipeId = action.payload;
        state.favoriteRecipes = state.favoriteRecipes.filter(
        (recipe) => recipe._id !== recipeId
        );
        state.items = state.items.map(recipe =>
        recipe._id === recipeId 
          ? { ...recipe, isFavorite: false } 
          : recipe
        );
        console.log("DELETE:", recipeId); //
      })
      .addCase(removeFromFavorites.rejected, handleRejected);
  },
});

export const { clearRecipesState } = slice.actions;
export default slice.reducer;

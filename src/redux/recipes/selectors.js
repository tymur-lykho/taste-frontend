import { createSelector } from "@reduxjs/toolkit";

export const selectRecipesState = (state) => state.recipes;

export const selectRecipes = createSelector(
  [selectRecipesState],
  (recipes) => recipes.items
);
export const selectMyRecipes = createSelector(
  [selectRecipesState],
  (recipes) => recipes.myRecipes
);
export const selectFavoriteRecipes = createSelector(
  [selectRecipesState],
  (recipes) => recipes.favoriteRecipes
);
export const selectPage = createSelector(
  [selectRecipesState],
  (recipes) => recipes.page
);
export const selectHasNextPage = createSelector(
  [selectRecipesState],
  (recipes) => recipes.hasNextPage
);
export const selectTotalItems = createSelector(
  [selectRecipesState],
  (recipes) => recipes.totalItems
);

export const selectIsLoading = createSelector(
  [selectRecipesState],
  (recipes) => recipes.isLoading
);

export const selectError = createSelector(
  [selectRecipesState],
  (recipes) => recipes.error
);

export const selectRecipesCount = createSelector(
  [selectRecipes],
  (items) => items.length
);
export const selectMyRecipesCount = createSelector(
  [selectMyRecipes],
  (myRecipes) => myRecipes.length
);
export const selectFavoriteRecipesCount = createSelector(
  [selectFavoriteRecipes],
  (favoriteRecipes) => favoriteRecipes.length
);

export const selectRecipesId = createSelector(
  [selectRecipesState],
  (recipes) => recipes.currentRecipe
);

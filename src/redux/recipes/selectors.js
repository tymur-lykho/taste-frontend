import { createSelector } from "@reduxjs/toolkit";

export const selectRecipesState = (state) => state.recipes;

//Переробив селектори на Мемоізовані:
export const selectRecipes = createSelector(
  [selectRecipesState],
  (recipes) => recipes.items
);

export const selectMyRecipes = createSelector(
  [selectRecipesState],
  (recipes) => recipes.own
);

export const selectFavoriteRecipes = createSelector(
  [selectRecipesState],
  (recipes) => recipes.favorites
);

export const selectFavoritesId = createSelector(
  [selectRecipesState],
  (recipes) => recipes.favoritesId
);

export const selectIsLoading = createSelector(
  [selectRecipesState],
  (recipes) => recipes.isLoading
);

export const selectError = createSelector(
  [selectRecipesState],
  (recipes) => recipes.error
);

export const selectPagination = createSelector(
  [selectRecipesState],
  (recipes) => recipes.pagination
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

// Перевірка чи рецепт в улюблених
export const selectIsRecipeFavorite = createSelector(
  [selectFavoritesId, (state, recipeId) => recipeId],
  (favoritesId, recipeId) => favoritesId.includes(recipeId)
);

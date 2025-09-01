import { createSelector } from "@reduxjs/toolkit";

export const selectRecipesState = (state) => state.recipes;

//Переробив селектори на Мемоізовані:
export const selectRecipes = createSelector([selectRecipesState], (recipes) => recipes.items); // (state) => state.recipes.items;
export const selectMyRecipes = createSelector([selectRecipesState], (recipes) => recipes.myRecipes); // (state) => state.recipes.myRecipes;
export const selectFavoriteRecipes = createSelector([selectRecipesState], (recipes) => recipes.favoriteRecipes); //(state) => state.recipes.favoriteRecipes;

export const selectPage = createSelector([selectRecipesState], (recipes) => recipes.page);
export const selectHasNextPage = createSelector([selectRecipesState], (recipes) => recipes.hasNextPage);
export const selectTotalItems = createSelector([selectRecipesState], (recipes) => recipes.totalItems);

export const selectIsLoading = createSelector([selectRecipesState], (recipes) => recipes.isLoading); // (state) => state.recipes.isLoading;

export const selectError = createSelector([selectRecipesState], (recipes) => recipes.error); // (state) => state.recipes.error;

export const selectRecipesCount = createSelector([selectRecipes], (items) => items.length);
export const selectMyRecipesCount = createSelector([selectMyRecipes], (myRecipes) => myRecipes.length); //(state) => state.recipes.myRecipes.length;
export const selectFavoriteRecipesCount = createSelector([selectFavoriteRecipes], (favoriteRecipes) => favoriteRecipes.length); // (state) => state.recipes.favoriteRecipes.length;

// Перевірка чи рецепт в улюблених
export const selectIsRecipeFavorite = createSelector(
  [selectFavoritesId, (state, recipeId) => recipeId],
  (favoritesId, recipeId) => favoritesId.includes(recipeId)
);

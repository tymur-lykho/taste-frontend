export const selectRecipes = (state) => state.recipes.items;

export const selectIsLoading = (state) => state.recipes.isLoading;

export const selectError = (state) => state.recipes.error;

export const selectPagination = (state) => state.recipes.pagination;

export const selectOwn = (state) => state.recipes.own;

export const selectFavorites = (state) => state.recipes.favorites;

export const selectFavoritesId = (state) => state.recipes.favoritesId;

export const selectRecipesId = (state) => state.recipes.current;

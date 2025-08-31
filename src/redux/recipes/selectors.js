export const selectRecipes = (state) => state.recipes.items;
export const selectPage = (state) => state.recipes.page;
export const selectHasNext = (state) => state.recipes.hasNext;

export const selectIsLoading = (state) => state.recipes.isLoading;
export const selectError = (state) => state.recipes.error;
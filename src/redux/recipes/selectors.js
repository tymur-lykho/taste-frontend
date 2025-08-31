export const selectRecipes = (state) => state.recipes.items;
export const selectMyRecipes = (state) => state.recipes.myRecipes;
export const selectFavoriteRecipes = (state) => state.recipes.favoriteRecipes;

export const selectIsLoading = (state) => state.recipes.isLoading;

export const selectError = (state) => state.recipes.error;

export const selectMyRecipesCount = (state) => state.recipes.myRecipes.length;
export const selectFavoriteRecipesCount = (state) => state.recipes.favoriteRecipes.length;

// Перевірка чи рецепт в улюблених
// export const selectIsRecipeFavorite = (state, recipeId) => 
//   state.recipes.favoriteRecipes.some(recipe => recipe.id === recipeId);

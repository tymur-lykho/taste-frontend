import { createSelector } from "@reduxjs/toolkit";
// Базові селектори
const selectData = (state) => state.filters.items;
const selectActiveFilters = (state) => state.searchFilters.activeFilters;
export const selectIsLoading = (state) => state.searchFilters.isLoading;
export const selectHasError = (state) => state.searchFilters.hasError;
// Селектори для списків
export const selectCategoriesList = createSelector(
  [selectData],
  (data) => data?.categoriesList || []
);
export const selectIngredientsList = createSelector(
  [selectData],
  (data) => data?.ingredientsList || []
);
// Селектори для активних фільтрів
export const selectActiveCategory = createSelector(
  [selectActiveFilters],
  (filters) => filters.categoryValue
);
export const selectActiveIngredients = createSelector(
  [selectActiveFilters],
  (filters) => filters.ingredientValue
);
export const selectActiveSearchValue = createSelector(
  [selectActiveFilters],
  (filters) => filters.searchValue
);

import { createSelector } from "@reduxjs/toolkit";

// Базові селектори з безпечною перевіркою
const selectData = (state) => state.filters?.items || {};
const selectActiveFilters = (state) => state.searchFilters?.activeFilters || {};

// Селектори для стану завантаження та помилок
export const selectIsLoading = (state) =>
  state.searchFilters?.isLoading || false;
export const selectHasError = (state) => state.searchFilters?.hasError || false;

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
  (filters) => filters.categoryValue || null
);

export const selectActiveIngredients = createSelector(
  [selectActiveFilters],
  (filters) => filters.ingredientValue || []
);

export const selectActiveSearchValue = createSelector(
  [selectActiveFilters],
  (filters) => filters.searchValue || ""
);

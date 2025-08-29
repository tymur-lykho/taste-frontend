import { createSelector } from "@reduxjs/toolkit";

export const selectSearch = (state) => state.filters.selectedFilters.search;

export const selectSelectedCategories = (state) =>
  state.filters.selectedFilters.categories;

export const selectSelectedIngredients = (state) =>
  state.filters.selectedFilters.ingredients;

export const selectSelectedArea = (state) => state.filters.selectedFilters.area;

export const selectFilterData = createSelector(
  [
    (state) => state.filters.categories,
    (state) => state.filters.ingredients,
    (state) => state.filters.areas,
  ],
  (categories, ingredients, areas) => ({
    categories,
    ingredients,
    areas,
  })
);

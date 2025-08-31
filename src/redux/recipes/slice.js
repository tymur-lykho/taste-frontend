import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchOwnRecipes,
  fetchFavoritesRecipes,
} from "./operations";

// ----------------- обробники -----------------
const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const handleFulfilled = (state, action) => {
  // payload.data — обʼєкт з пагінацією і масивом рецептів
  const payloadData = action.payload.data || {};
  const recipesArray = payloadData.data || [];

  const {
    page = 1,
    perPage = 12,
    totalPages = 0,
    totalItems = 0,
    hasNextPage = false,
    hasPreviousPage = false,
  } = payloadData;

  // Якщо перша сторінка, заміняємо items, інакше додаємо до існуючих
  if (page === 1) {
    state.items = recipesArray;
  } else {
    state.items = [...state.items, ...recipesArray];
  }

  state.pagination = {
    page,
    perPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
  };

  state.isLoading = false;
  state.error = null;
};

// ----------------- Slice -----------------
const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    pagination: {
      page: 1,
      perPage: 12,
      totalPages: 0,
      totalItems: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    // встановити номер сторінки
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    // скидання рецептів перед новим fetch
    resetRecipes(state) {
      state.items = [];
      state.pagination = {
        page: 1,
        perPage: 12,
        totalPages: 0,
        totalItems: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      };
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // всі рецепти
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, handleFulfilled)
      .addCase(fetchRecipes.rejected, handleRejected)

      // власні рецепти
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, handleFulfilled)
      .addCase(fetchOwnRecipes.rejected, handleRejected)

      // улюблені рецепти
      .addCase(fetchFavoritesRecipes.pending, handlePending)
      .addCase(fetchFavoritesRecipes.fulfilled, handleFulfilled)
      .addCase(fetchFavoritesRecipes.rejected, handleRejected);
  },
});

export const { setPage, resetRecipes } = slice.actions;
export default slice.reducer;

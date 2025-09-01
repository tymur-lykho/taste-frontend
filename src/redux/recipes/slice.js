import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFavoritesId,
  fetchFavoritesRecipes,
  fetchOwnRecipes,
  fetchRecipes,
  addToFavoritesRecipes,
} from "./operations";
import { fetchFilteredRecipes } from "../filters/operations";
import { logout } from "../auth/operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const handleFulfilled = (state, action) => {
  const payloadData = action.payload.data;
  const {
    data: recipesArray,
    page,
    perPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
  } = payloadData;

  if (state.pagination.page === 1) {
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

const handleFavoritesIdFulfilled = (state, action) => {
  state.favoritesId = action.payload;
  state.isLoading = false;
  state.error = null;
};
const handleFavoritesRecipesFulfilled = (state, action) => {
  const payloadData = action.payload.data;
  const {
    data: recipesArray,
    page,
    perPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
  } = payloadData;

  if (state.pagination.page === 1) {
    state.favorites = recipesArray;
  } else {
    state.favorites = [...state.favorites, ...recipesArray];
  }

  state.pagination = {
    page,
    perPage,
    totalPages,
    totalItems,
    hasPreviousPage,
    hasNextPage,
  };
  state.isLoading = false;
  state.error = null;
};
const resetRecipesState = (state) => {
  state.items = [];
  state.own = [];
  state.favorites = [];
  state.favoritesId = [];
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
};
const handleOwnRecipesFulfilled = (state, action) => {
  const payloadData = action.payload.data;
  const {
    data: recipesArray,
    page,
    perPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPreviousPage,
  } = payloadData;

  if (state.pagination.page === 1) {
    state.own = recipesArray;
  } else {
    state.own = [...state.own, ...recipesArray];
  }

  state.pagination = {
    page,
    perPage,
    totalPages,
    totalItems,
    hasPreviousPage,
    hasNextPage,
  };
  state.isLoading = false;
  state.error = null;
};

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    own: [],
    favorites: [],
    favoritesId: [],
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
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
    setPerPage(state, action) {
      state.pagination.perPage = action.payload;
    },
    nextPage(state) {
      state.pagination.page += 1;
    },
    prevPage(state) {
      if (state.pagination.page > 1) {
        state.pagination.page -= 1;
      }
    },
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, handlePending)
      .addCase(fetchRecipes.fulfilled, handleFulfilled)
      .addCase(fetchRecipes.rejected, handleRejected)
      .addCase(fetchFilteredRecipes.pending, handlePending)
      .addCase(fetchFilteredRecipes.fulfilled, handleFulfilled)
      .addCase(fetchFilteredRecipes.rejected, handleRejected)
      .addCase(fetchOwnRecipes.pending, handlePending)
      .addCase(fetchOwnRecipes.fulfilled, handleOwnRecipesFulfilled)
      .addCase(fetchOwnRecipes.rejected, handleRejected)
      .addCase(fetchFavoritesRecipes.pending, handlePending)
      .addCase(fetchFavoritesRecipes.fulfilled, handleFavoritesRecipesFulfilled)
      .addCase(fetchFavoritesRecipes.rejected, handleRejected)
      .addCase(fetchFavoritesId.pending, handlePending)
      .addCase(fetchFavoritesId.fulfilled, handleFavoritesIdFulfilled)
      .addCase(fetchFavoritesId.rejected, handleRejected)
      .addCase(logout.fulfilled, resetRecipesState)
      .addCase(addToFavoritesRecipes.rejected, handleRejected)
      .addCase(addToFavoritesRecipes.pending, handlePending)
      .addCase(addToFavoritesRecipes.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      });
  },
});

export const { setPage, setPerPage, nextPage, prevPage, resetRecipes } =
  slice.actions;

export default slice.reducer;

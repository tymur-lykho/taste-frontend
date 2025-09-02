import { createSlice } from "@reduxjs/toolkit";
import {
  deleteFavoritesId,
  fetchFavoritesId,
  fetchFavoritesRecipes,
  fetchOwnRecipes,
  fetchRecipes,
  postFavoritesId,
} from "./operations";
import { fetchFilteredRecipes } from "../filters/operations";

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

const slice = createSlice({
  name: "recipes",
  initialState: {
    items: [],
    own: [],
    favorites: [],
    ownId: [],
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
    addFavoriteLocally(state, action) {
      if (!state.favoritesId.includes(action.payload)) {
        state.favoritesId.push(action.payload);
      }
    },
    removeFavoriteLocally(state, action) {
      state.favoritesId = state.favoritesId.filter(
        (id) => id !== action.payload
      );
    },
    removeFavoriteRecipe(state, action) {
      state.favorites = state.favorites.filter(
        (recipe) => recipe._id !== action.payload
      );
    }    
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
      .addCase(fetchOwnRecipes.fulfilled, handleFulfilled)
      .addCase(fetchOwnRecipes.rejected, handleRejected)
      .addCase(fetchFavoritesRecipes.pending, handlePending)
      .addCase(fetchFavoritesRecipes.fulfilled, handleFulfilled)
      .addCase(fetchFavoritesRecipes.rejected, handleRejected)
      .addCase(fetchFavoritesId.pending, handlePending)
      .addCase(fetchFavoritesId.fulfilled, handleFavoritesIdFulfilled)
      .addCase(fetchFavoritesId.rejected, handleRejected)
      .addCase(postFavoritesId.pending, handlePending)
      .addCase(postFavoritesId.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(postFavoritesId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteFavoritesId.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteFavoritesId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  setPage,
  setPerPage,
  nextPage,
  prevPage,
  resetRecipes,
  addFavoriteLocally,
  removeFavoriteLocally,
  removeFavoriteRecipe
} = slice.actions;

export default slice.reducer;

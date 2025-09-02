import { createSlice } from "@reduxjs/toolkit";
import {
  fetchRecipes,
  fetchOwnRecipes,
  fetchFavoritesRecipes,
  addFavoritesRecipe,
  removeFromFavorites,
  fetchFavoritesId,
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
    hasNextPage,
    hasPreviousPage,
  };
  state.isLoading = false;
  state.error = null;
  state.isMyRecipesLoaded = true;
};

const handleFavoriteRecipesFulfilled = (state, action) => {
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
    hasNextPage,
    hasPreviousPage,
  };
  state.isLoading = false;
  state.error = null;
  state.isFavoritesLoaded = true;
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
    isMyRecipesLoaded: false,
    isFavoritesLoaded: false,
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
    clearRecipesState(state) {
      state.own = [];
      state.favorites = [];
      state.favoritesId = [];
      state.isMyRecipesLoaded = false;
      state.isFavoritesLoaded = false;
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
      .addCase(fetchFavoritesRecipes.fulfilled, handleFavoriteRecipesFulfilled)
      .addCase(fetchFavoritesRecipes.rejected, handleRejected)

      .addCase(fetchFavoritesId.pending, handlePending)
      .addCase(fetchFavoritesId.fulfilled, handleFavoritesIdFulfilled)
      .addCase(fetchFavoritesId.rejected, handleRejected)

      .addCase(addFavoritesRecipe.pending, handlePending)
      .addCase(addFavoritesRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const addedRecipe = action.payload.data;
        const recipeId = addedRecipe._id;

        // Додаємо ID до списку улюблених
        if (!state.favoritesId.includes(recipeId)) {
          state.favoritesId.push(recipeId);
        }

        // Оновлюємо стан рецепта в основному списку
        state.items = state.items.map((recipe) =>
          recipe._id === recipeId ? { ...recipe, isFavorite: true } : recipe
        );

        // Додаємо до списку улюблених рецептів, якщо він завантажений
        if (
          state.isFavoritesLoaded &&
          !state.favorites.some((recipe) => recipe._id === recipeId)
        ) {
          state.favorites.push(addedRecipe);
        }
      })
      .addCase(addFavoritesRecipe.rejected, handleRejected)

      .addCase(removeFromFavorites.pending, handlePending)
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const recipeId = action.payload;

        // Видаляємо ID зі списку улюблених
        state.favoritesId = state.favoritesId.filter((id) => id !== recipeId);

        // Оновлюємо стан рецепта в основному списку
        state.items = state.items.map((recipe) =>
          recipe._id === recipeId ? { ...recipe, isFavorite: false } : recipe
        );

        // Видаляємо зі списку улюблених рецептів
        state.favorites = state.favorites.filter(
          (recipe) => recipe._id !== recipeId
        );
      })
      .addCase(removeFromFavorites.rejected, handleRejected);
  },
});

export const {
  setPage,
  setPerPage,
  nextPage,
  prevPage,
  resetRecipes,
  clearRecipesState,
} = slice.actions;

export default slice.reducer;

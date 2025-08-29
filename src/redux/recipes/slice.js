import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes } from "./operations";
import { fetchFiltersRecipes } from "../filters/operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

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
      .addCase(fetchFiltersRecipes.pending, handlePending)
      .addCase(fetchFiltersRecipes.fulfilled, (state, action) => {
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
      })
      .addCase(fetchFiltersRecipes.rejected, handleRejected);
  },
});

export const { setPage, setPerPage, nextPage, prevPage, resetRecipes } =
  slice.actions;

export default slice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchIngredients } from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload || action.error.message;
};

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    categories: [],
    ingredients: [],
    selectedFilters: {
      categories: undefined,
      ingredients: [],
      search: "",
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setCategories(state, action) {
      state.selectedFilters.categories = action.payload;
    },
    setIngredients(state, action) {
      state.selectedFilters.ingredients = action.payload;
    },
    setSearch(state, actions) {
      state.selectedFilters.search = actions.payload;
    },
    resetFilter(state) {
      state.selectedFilters.categories = undefined;
      state.selectedFilters.ingredients = [];
      state.selectedFilters.area = undefined;
      state.selectedFilters.search = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, handleRejected)
      .addCase(fetchIngredients.pending, handlePending)
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.ingredients = payload.data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, handleRejected);
  },
});

export const {
  setCategories,
  setIngredients,
  setSearch,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { fetchArea, fetchCategories, fetchIngredients } from "./operations";

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
    areas: [],
    selectedFilters: {
      categories: undefined,
      ingredients: [],
      area: undefined,
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
    setArea(state, action) {
      state.selectedFilters.area = action.payload;
    },
    setSearch(state, actions) {
      state.selectedFilters.search = actions.payload;
    },
    resetFilter(state) {
      state.selectedFilters.categories = undefined;
      state.selectedFilters.ingredients = [];
      state.selectedFilters.area = undefined;
    },
    resetSearch(state) {
      state.selectedFilters.search = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, handleRejected)
      .addCase(fetchIngredients.pending, handlePending)
      .addCase(fetchIngredients.fulfilled, (state, { payload }) => {
        state.ingredients = payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, handleRejected);
    // .addCase(fetchArea.pending, handlePending)
    // .addCase(fetchArea.fulfilled , (state, { payload }) => {
    //   state.area = action.payload;
    //   state.isLoading = false;
    //   state.error = null;
    // })
    // .addCase(fetchArea.rejected, handleRejected);
  },
});

export const {
  setCategories,
  setIngredients,
  setArea,
  setSearch,
  resetFilter,
  resetSearch,
} = filterSlice.actions;

export default filterSlice.reducer;

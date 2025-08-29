import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    category: undefined,
    ingredients: [] ,
    area: undefined,
    search: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
    setIngredients(state, action) {
      state.ingredients = action.payload;
    },
    setArea(state, action) {
      state.area = action.payload;
    },
    setSearch(state, actions) {
      state.search = actions.payload;
    },
    resetFilter(state) {
      state.category = undefined;
      state.ingredients = [];
      state.area = undefined;
    },
    resetSearch(state) {
      state.search = "";
    },
  },
});

export const {
  setCategory,
  setIngredients,
  setArea,
  setSearch,
  resetFilter,
  resetSearch,
} = filterSlice.actions;

export default filterSlice.reducer;

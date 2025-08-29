import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {
    categories: [],
    ingredients: [],
    recipes: [], // залишаємо для результатів пошуку
  },
  selectedFilters: {
    category: "",
    ingredient: "",
    query: "",
  },
  loading: false,
  error: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      if (key in state.selectedFilters) {
        state.selectedFilters[key] = value;
      }
    },
    resetFilters(state) {
      Object.keys(state.selectedFilters).forEach((key) => {
        state.selectedFilters[key] = key === "ingredient" ? "" : "";
      });
    },
    setItem(state, action) {
      const { key, value } = action.payload;
      if (key in state.items) {
        state.items[key] = value;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setFilter, resetFilters, setItem, setLoading, setError } =
  filtersSlice.actions;
export default filtersSlice.reducer;

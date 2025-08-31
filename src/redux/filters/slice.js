import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
    category: "",
    ingredient: "",
  },
  reducers: {
    setFilter(state, action) {
      const { key, value } = action.payload;
      state[key] = value; // оновлює будь-який фільтр
    },
    resetFilters() {
      return { name: "", category: "", ingredient: "" };
    },
  },
});

export const { setFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;

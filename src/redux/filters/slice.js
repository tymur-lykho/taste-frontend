// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: {
//     categoriesList: [],
//     ingredientsList: [],
//   },
//   activeFilters: {
//     categoryValue: "",
//     ingredientValue: "",
//     searchValue: "",
//   },
//   loading: false,
//   error: null,
// };

// const filtersSlice = createSlice({
//   name: "filters",
//   initialState,
//   reducers: {
//     setSearchValue: (state, action) => {
//       state.activeFilters.searchValue = action.payload;
//     },
//     setCategoryValue: (state, action) => {
//       state.activeFilters.categoryValue = action.payload;
//     },
//     setIngredientValue: (state, action) => {
//       state.activeFilters.ingredientValue = action.payload;
//     },
//   },
// });

// export const { setSearchValue, setCategoryValue, setIngredientValue } =
//   filtersSlice.actions;

// export default filtersSlice.reducer;

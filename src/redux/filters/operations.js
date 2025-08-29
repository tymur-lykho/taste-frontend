import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://tasteorama-backend-dcjy.onrender.com/api";

export const fetchFiltersRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { pagination } = state.recipes;
      const { search = "", category, ingredients = [], area } = state.filters;

      const filterParams = Array.isArray(ingredients)
        ? ingredients.join(",")
        : undefined;

      const params = {
        page: pagination.page,
        perPage: pagination.perPage,
        search: search || undefined,
        category: category || undefined,
        ingredients: filterParams,
        area: area || undefined,
      };
      const response = await axios.get("/recipes", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://tasteorama-backend-dcjy.onrender.com/api";

export const fetchFilteredRecipes = createAsyncThunk(
  "recipes/fetchFiltered",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { pagination } = state.recipes;
      const { selectedFilters } = state.filters;
      const {
        search = "",
        categories,
        ingredients = [],
        area,
      } = selectedFilters;
        console.log("🚀 ~ categories:", categories)

      const filterParams = Array.isArray(ingredients)
        ? ingredients.join(",")
        : undefined;

      const params = {
        page: pagination.page,
        perPage: pagination.perPage,
        search: search || undefined,
        category: categories || undefined,
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

export const fetchCategories = createAsyncThunk(
  "filters/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/categories");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchIngredients = createAsyncThunk(
  "filters/fetchIngredients",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/ingredients");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchArea = createAsyncThunk(
  "filters/fetchArea",
  async (_, thunkAPI) => {
    try {
      const response = axios.get("/area");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async ({ page, filters }, thunkAPI) => {
    try {
      const { search = "", categories, ingredients = [] } = filters;

      const ingredientsParams = Array.isArray(ingredients)
        ? ingredients.join(",")
        : undefined;

      const params = {
        page: page,
        search: search || undefined,
        category: categories || undefined,
        ingredients: ingredientsParams,
      };

      const response = await axios.get("/recipes", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecipesId = createAsyncThunk(
  "recipes/fetchRecipesId",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axios.get(`/recipes/${recipeId}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwn",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get("/recipes/my", { params: { page } });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavoritesRecipes = createAsyncThunk(
  "recipes/fetchFavorites",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get("/recipes/favorites", {
        params: { page },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavoritesId = createAsyncThunk(
  "recipes/fetchFavoritesId",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/users/current");
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFavoritesRecipe = createAsyncThunk(
  "recipes/addFavoritesRecipe",
  async (recipeId, thunkAPI) => {
    try {
      await axios.post(`/recipes/favorites/${recipeId}`);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "recipes/removeFromFavorites",
  async (recipeId, thunkAPI) => {
    try {
      await axios.delete(`/recipes/favorites/${recipeId}`);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

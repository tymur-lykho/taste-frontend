import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://tasteorama-backend-dcjy.onrender.com/api";

// Всі рецепти
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/recipes");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Мої рецепти (з пагінацією + фільтрами)
export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwnRecipes",
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

      const ingredientsParams = Array.isArray(ingredients)
        ? ingredients.join(",")
        : undefined;

      const params = {
        page: pagination.page,
        perPage: pagination.perPage,
        search: search || undefined,
        category: categories || undefined,
        ingredients: ingredientsParams,
        area: area || undefined,
      };

      const response = await axios.get("recipes/my", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Улюблені рецепти (з пагінацією + фільтрами)
export const fetchFavoritesRecipes = createAsyncThunk(
  "recipes/fetchFavoritesRecipes",
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

      const ingredientsParams = Array.isArray(ingredients)
        ? ingredients.join(",")
        : undefined;

      const params = {
        page: pagination.page,
        perPage: pagination.perPage,
        search: search || undefined,
        category: categories || undefined,
        ingredients: ingredientsParams,
        area: area || undefined,
      };

      const response = await axios.get("recipes/favorites", { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Додати рецепт у вибране
export const addFavoritesRecipe = createAsyncThunk(
  "recipes/addFavoritesRecipe",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axios.post(`/recipes/favorites/${recipeId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Видалити рецепт з вибраного
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

// Отримати список ID вибраних рецептів користувача
export const fetchFavoritesId = createAsyncThunk(
  "recipes/fetchFavoritesId",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("users/current");
      return response.data.data.favoriteRecipes;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

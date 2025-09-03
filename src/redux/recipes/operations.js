import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://tasteorama-backend-dcjy.onrender.com/api";

// Всі рецепти
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchAll",
  async ({ page, filters }, thunkAPI) => {
    try {
      const { search = "", categories, ingredients = [] } = filters;

      const ingredientsParams = ingredients || undefined;

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

// Мої рецепти
export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwn",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get("/recipes/my", { params: { page } });
      console.log("OWN:", response.data);
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
      console.log("FAVOR:", response.data);
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

//Додавання рецепту
export const addFavoritesRecipe = createAsyncThunk(
  "recipes/addFavoritesRecipe",
  async (recipeId, thunkAPI) => {
    try {
      await axios.post(`/recipes/favorites/${recipeId}`);
      console.log("RES.ADD DATA:", recipeId);
      return recipeId;
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
      console.log("RES.DELETE DATA:", recipeId);
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

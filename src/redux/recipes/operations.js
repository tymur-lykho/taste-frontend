import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://tasteorama-backend-dcjy.onrender.com/api";

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

export const fetchOwnRecipes = createAsyncThunk(
  "recipes/fetchOwn",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/recipes/my");
      console.log("RES.DATA:", response.data)
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFavoritesRecipes = createAsyncThunk(
  "recipes/fetchFavorites",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/recipes/favorites");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFavoritesRecipe = createAsyncThunk(
  "recipes/addFavoritesRecipe",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axios.post(`/recipes/favorites/${recipeId}`);
      console.log("RES.ADD:", response.data)
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  "recipes/removeFromFavorites",
  async (recipeId, thunkAPI) => {
    try {
      const response = await axios.delete(`/recipes/favorites/${recipeId}`);
      console.log("RES.DELETE:", response.data)
      return recipeId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



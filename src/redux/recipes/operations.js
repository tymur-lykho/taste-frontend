// src/redux/recipes/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3000/api";
// axios.defaults.baseURL = "https://tasteorama-backend-dcjy.onrender.com/api";

const LIMIT = 12;

const normalize = (raw) => {
  if (raw?.data && Array.isArray(raw.data.data)) {
    const p = raw.data;
    return {
      list: p.data,
      page: p.page ?? 1,
      perPage: p.perPage ?? LIMIT,
      totalItems: p.totalItems ?? 0,
      totalPages: p.totalPages ?? 1,
      hasNext: Boolean(p.hasNextPage ?? (p.page < p.totalPages)),
    };
  }

  return {
    list: raw.items ?? [],
    page: raw.page ?? 1,
    perPage: raw.perPage ?? LIMIT,
    totalItems: raw.totalItems ?? 0,
    totalPages: raw.totalPages ?? 1,
    hasNext: Boolean(raw.hasNextPage ?? ((raw.page ?? 1) < (raw.totalPages ?? 1))),
  };
};

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchPage",
  async ({ page = 1 } = {}, thunkAPI) => {
    try {
      const { data } = await axios.get("/recipes", {
        params: { page, limit: LIMIT },
      });
      return normalize(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
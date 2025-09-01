import { Toaster } from "react-hot-toast";
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import SvgSprite from "../../SvgSprite/SvgSprite.jsx";

import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectUser,
} from "../../redux/auth/selectors.js";

import {
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations.js";
import { refreshUser } from "../../redux/auth/operations.js";
import { clearRecipesState } from "../../redux/recipes/slice.js";
import { fetchFavoritesId } from "../../redux/recipes/operations.js";

import Layout from "../Layout/Layout.jsx";

import HomePage from "../../pages/HomePage.jsx";
import UserPage from "../../pages/UserPage.jsx";
import MyRecipes from "../MyRecipes/MyRecipes.jsx";
import FavoriteRecipes from "../FavoriteRecipes/FavoriteRecipes.jsx";
import AddRecipePage from "../../pages/AddRecipePage.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import RegistrationPage from "../../pages/RegistrationPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage.jsx";
import RecipePage from "../../pages/RecipePage.jsx";

import { PrivateRoute } from "../PrivateRoute.jsx";
import { RestrictedRoute } from "../RestrictedRoute.jsx";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
    //dispatch(fetchArea);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(clearRecipesState());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavoritesId());
    }
  }, [dispatch, isLoggedIn]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <>
      <SvgSprite />
      <Toaster />
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/" component={<LoginPage />} />
              }
            />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/"
                  component={<RegistrationPage />}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute redirectTo="/login" component={<UserPage />} />
              }
            >
              <Route index element={<Navigate to="own" replace />} />
              <Route path="own" element={<MyRecipes />} />
              <Route path="favorites" element={<FavoriteRecipes />} />
            </Route>
            <Route
              path="/add-recipe"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<AddRecipePage />}
                />
              }
            />
              <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;

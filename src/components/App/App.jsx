import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import SvgSprite from "../../SvgSprite/SvgSprite.jsx";

import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from "../../redux/auth/selectors.js";
// import { selectFilterData } from "../../redux/filters/selectors.js";

import {
  // fetchArea,
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations.js";
import { refreshUser } from "../../redux/auth/operations.js";
import { fetchFavoritesId } from "../../redux/recipes/operations.js";

import Layout from "../Layout/Layout.jsx";

import HomePage from "../../pages/HomePage.jsx";
import UserPage from "../../pages/UserPage.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import NotFoundPage from "../../pages/NotFoundPage.jsx";
import AddRecipePage from "../../pages/AddRecipePage.jsx";
import RegistrationPage from "../../pages/RegistrationPage.jsx";

import { PrivateRoute } from "../PrivateRoute.jsx";
import { RestrictedRoute } from "../RestrictedRoute.jsx";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  // const filterData = useSelector(selectFilterData);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
    //dispatch(fetchArea);
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavoritesId());
    }
  }, [dispatch, isLoggedIn]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <>
      <SvgSprite /> {/* 👈 важливо підключити тут */}
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
            />
            <Route
              path="/add-recipe"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<AddRecipePage />}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;

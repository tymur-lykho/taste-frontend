import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgSprite from "../../SvgSprite/SvgSprite.jsx"; // 👈 важливо підключити тут

import { refreshUser } from "../../redux/auth/operations.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";

import HomePage from "../../pages/HomePage.jsx";
import Layout from "../Layout/Layout.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import RegistrationPage from "../../pages/RegistrationPage.jsx";
import UserPage from "../../pages/UserPage.jsx";
import AddRecipePage from "../../pages/AddRecipePage.jsx";

import { RestrictedRoute } from "../RestrictedRoute.jsx";
import { PrivateRoute } from "../PrivateRoute.jsx";

import NotFoundPage from "../../pages/NotFoundPage.jsx";
import { selectFilterData } from "../../redux/filters/selectors.js";
import {
  fetchArea,
  fetchCategories,
  fetchIngredients,
} from "../../redux/filters/operations.js";

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const filterData = useSelector(selectFilterData);
  console.log("🚀 ~ App ~ filterData:", filterData);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchCategories());
    dispatch(fetchIngredients());
    //dispatch(fetchArea);
  }, [dispatch]);

  return isRefreshing ? (
    <strong>Refreshing user...</strong>
  ) : (
    <>
      {" "}
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
            {/* Other routes */}
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;

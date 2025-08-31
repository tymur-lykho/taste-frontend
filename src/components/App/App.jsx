import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import SvgSprite from "../../SvgSprite/SvgSprite.jsx"; // 👈 важливо підключити тут

import { refreshUser } from "../../redux/auth/operations.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";

import Layout from "../Layout/Layout.jsx";
import { RestrictedRoute } from "../RestrictedRoute.jsx";
import { PrivateRoute } from "../PrivateRoute.jsx";

// 👇 lazy-імпорти сторінок
const HomePage = lazy(() => import("../../pages/HomePage.jsx"));
const LoginPage = lazy(() => import("../../pages/LoginPage.jsx"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage.jsx"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage.jsx"));
const AddRecipePage = lazy(() => import("../../pages/AddRecipePage.jsx"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage.jsx"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

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
              path="/profile/:recipeType"
              element={
                <PrivateRoute redirectTo="/login" component={<ProfilePage />} />
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

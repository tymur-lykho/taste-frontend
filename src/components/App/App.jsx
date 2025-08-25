import "modern-normalize";

import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import { refreshUser } from "../../redux/auth/operations.js";
import { selectIsRefreshing } from "../../redux/auth/selectors.js";

import HomePage from "../../pages/HomePage.jsx";
import Layout from "../Layout/Layout.jsx";
import LoginPage from "../../pages/LoginPage.jsx";
import RegstrationPage from "../../pages/RegistrationPage.jsx";

import { RestrictedRoute } from "../RestrictedRoute.jsx";
import { PrivateRoute } from "../PrivateRoute.jsx";

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
                  component={<RegstrationPage />}
                />
              }
            />
            {/* Other routes */}
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;

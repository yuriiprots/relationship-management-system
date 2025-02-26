import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";
import { useAuth } from "../contexts/authContext";
import AppLayout from "./AppLayout";

export default function AppRouter() {
  const navigate = useNavigate();
  const { userLoggedIn, loading } = useAuth();

  useEffect(() => {
    console.log("AppRouter useEffect triggered!", { loading, userLoggedIn }); // 🔴 Перевірка виклику useEffect
    if (!loading && !userLoggedIn) {
      console.log("Redirecting to /login..."); // 🔴 Перевірка редиректу
      navigate("/login", { replace: true });
    }
  }, [loading, userLoggedIn]);

  if (loading) return null;

  return (
    <Routes>
      {userLoggedIn
        ? privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <AppLayout>
                  <route.element />
                </AppLayout>
              }
            />
          ))
        : publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
      <Route
        path="*"
        element={<Navigate to={userLoggedIn ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

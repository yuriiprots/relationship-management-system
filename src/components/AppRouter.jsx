import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";
import { useAuth } from "../contexts/authContext";
import AppLayout from "./AppLayout";

export default function AppRouter() {
  const {userLoggedIn} = useAuth();
  
  return (
    <Routes>
      {userLoggedIn
        ? privateRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={<AppLayout>{<Component />}</AppLayout>}
            />
          ))
        : publicRoutes.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
      <Route
        path="*"
        element={<Navigate to={userLoggedIn ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}

import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../router/routes";
import { useAuth } from "../contexts/authContext";
import AppLayout from "./AppLayout";
import { RouteType } from "../types/RouteType";

const AppRouter: FC = () => {
  const { userLoggedIn } = useAuth();

  const renderRoutes = () => {
    const routes = userLoggedIn ? privateRoutes : publicRoutes;
    return routes.map(({ path, component: Component }: RouteType) => (
      <Route
        key={path}
        path={path}
        element={
          userLoggedIn ? (
            <AppLayout>
              <Component />
            </AppLayout>
          ) : (
            <Component />
          )
        }
      />
    ));
  };

  return (
    <Routes>
      {renderRoutes()}
      <Route
        path="*"
        element={<Navigate to={userLoggedIn ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
};

export default AppRouter;

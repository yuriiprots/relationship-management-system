import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Interactions from "../pages/Interactions";
import People from "../pages/People";
import Settings from "../pages/Settings";
import SignUp from "../pages/SignUp";

export const privateRoutes = [
  { path: "/dashboard", element: Dashboard },
  { path: "/interactions", element: Interactions },
  { path: "/people", element: People },
  { path: "/settings", element: Settings },
];

export const publicRoutes = [
  { path: "/login", element: Login },
  { path: "/signup", element: SignUp },
];

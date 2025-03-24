import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Interactions from "../pages/Interactions";
import People from "../pages/People";
import Settings from "../pages/Settings";
import SignUp from "../pages/SignUp";

export const privateRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/interactions", component: Interactions },
  { path: "/people", component: People },
  { path: "/settings", component: Settings },
];

export const publicRoutes = [
  { path: "/login", component: Login },
  { path: "/signup", component: SignUp },
];

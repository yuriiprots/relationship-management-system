import { RouteType } from "../types/RouteType";
import * as Pages from "../pages";

export const privateRoutes: RouteType[] = [
  { path: "/dashboard", component: Pages.Dashboard },
  { path: "/interactions", component: Pages.Interactions },
  { path: "/people", component: Pages.People },
  { path: "/settings", component: Pages.Settings },
];

export const publicRoutes: RouteType[] = [
  { path: "/login", component: Pages.Login },
  { path: "/signup", component: Pages.SignUp },
];

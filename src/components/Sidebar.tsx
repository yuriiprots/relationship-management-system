import { FC, ReactNode } from "react";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";
import { FaHome, FaUserAlt, FaRegComments, FaCog } from "react-icons/fa";
import { privateRoutes } from "../router/routes";

type RouteConfig = {
  icon: ReactNode;
  label: string;
};

const Sidebar: FC = () => {
  const routeConfig: Record<string, RouteConfig> = {
    "/dashboard": { icon: <FaHome />, label: "Dashboard" },
    "/interactions": { icon: <FaRegComments />, label: "Interactions" },
    "/people": { icon: <FaUserAlt />, label: "People" },
    "/settings": { icon: <FaCog />, label: "Settings" },
  };

  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-4">
      <Logo />
      <nav className="flex flex-grow flex-col items-center justify-center space-y-4">
        {privateRoutes.map((route) => (
          <SidebarLink
            key={route.path}
            to={route.path}
            icon={routeConfig[route.path]?.icon}
          >
            {routeConfig[route.path]?.label}
          </SidebarLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

import { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  icon?: ReactNode;
  children: ReactNode;
}

const SidebarLink: FC<SidebarLinkProps> = ({ to, icon, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex w-40 items-center rounded px-3 py-2 text-center text-white ${isActive ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-600`}
    >
      {icon && <span className="mr-3 text-xl">{icon}</span>}
      {children}
    </Link>
  );
};
export default SidebarLink;

import React from "react";
import Logo from "./Logo";
import SidebarLink from "./SidebarLink";
import { FaHome, FaUserAlt, FaRegComments, FaCog } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-4">
      <Logo />
      <nav className="flex flex-grow flex-col items-center justify-center space-y-4">
        <SidebarLink to="/dashboard" icon={<FaHome />}>
          Dashboard
        </SidebarLink>
        <SidebarLink to="/interactions" icon={<FaRegComments />}>
          Interactions
        </SidebarLink>
        <SidebarLink to="/people" icon={<FaUserAlt />}>
          People
        </SidebarLink>
        <SidebarLink to="/settings" icon={<FaCog />}>
          Settings
        </SidebarLink>
      </nav>
    </div>
  );
}

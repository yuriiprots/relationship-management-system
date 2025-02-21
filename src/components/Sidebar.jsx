import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white p-4">
      <Logo />
      <nav className="flex flex-grow flex-col items-center justify-center space-y-4">
        <Link
          to="/"
          className="w-40 rounded bg-blue-500 px-3 py-2 text-center text-white hover:bg-blue-600"
        >
          Dashboard
        </Link>
        <Link
          to="/interactions"
          className="w-40 rounded bg-blue-500 px-3 py-2 text-center text-white hover:bg-blue-600"
        >
          Interactions
        </Link>
        <Link
          to="/people"
          className="w-40 rounded bg-blue-500 px-3 py-2 text-center text-white hover:bg-blue-600"
        >
          People
        </Link>
        <Link
          to="/settings"
          className="w-40 rounded bg-blue-500 px-3 py-2 text-center text-white hover:bg-blue-600"
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}

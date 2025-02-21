import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}

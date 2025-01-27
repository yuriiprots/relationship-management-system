import React from "react";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Main />
      </div>
    </div>
  );
}

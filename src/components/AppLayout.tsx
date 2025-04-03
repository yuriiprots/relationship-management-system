import { FC, ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;

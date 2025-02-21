import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import People from "./pages/People";
import Interactions from "./pages/Interactions";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/interactions" element={<Interactions />} />
            <Route path="/people" element={<People />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AppLayout>
      </Router>
    </>
  );
}

export default App;

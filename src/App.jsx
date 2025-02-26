import React from "react";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <Router>
          {/* <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/interactions" element={<Interactions />} />
            <Route path="/people" element={<People />} />
            <Route path="/settings" element={<Settings />} />
          </Routes> */}
          <AppRouter />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;

import { AuthProvider } from "./contexts/authContext";
import { HashRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./components/AppRouter";

export default function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer position="top-center" autoClose={3000} />
        <Router>
          <AppRouter />
        </Router>
      </AuthProvider>
    </>
  );
}

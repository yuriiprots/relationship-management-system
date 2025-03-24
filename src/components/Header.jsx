import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="h-12 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between p-4">
        <h1 className="text-lg font-bold">Header</h1>
        <button
          onClick={handleLogout}
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
          aria-label="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

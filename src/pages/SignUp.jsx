import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import FormInput from "../components/FormInput";

export default function SignUp() {
  const { userLoggedIn } = useAuth();

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setSignUpData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isSigningUp) return;
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    setIsSigningUp(true);
    setErrorMessage("");
    try {
      await doCreateUserWithEmailAndPassword(
        signUpData.email,
        signUpData.password,
      );
    } catch (error) {
      setErrorMessage(error.message || "Failed to sign in");
    } finally {
      setIsSigningUp(false);
    }
  };

  if (userLoggedIn) return <Navigate to={"/dashboard"} replace={true} />;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Create a new account
        </h2>
        <form onSubmit={handleSignUp}>
          <FormInput
            type="email"
            label="Email:"
            name="email"
            value={signUpData.email}
            onChange={handleChange}
            required
          />
          <FormInput
            type="password"
            label="Password:"
            name="password"
            value={signUpData.password}
            onChange={handleChange}
            required
          />

          <FormInput
            type="password"
            label="Confirm password:"
            name="confirmPassword"
            value={signUpData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errorMessage && (
            <span className="block text-center font-bold text-red-600">
              {errorMessage}
            </span>
          )}

          <button
            className="mt-2 mb-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm">
            Already have an account?
            <Link to={"/login"} className="font-bold hover:underline">
              Continue
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

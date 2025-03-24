import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useAuth } from "../contexts/authContext";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { Navigate, Link } from "react-router-dom";

export default function Login() {
  const { userLoggedIn } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   if (isSigningIn) return;
  //   setIsSigningIn(true);
  //   setErrorMessage("");

  //   try {
  //     await doSignInWithEmailAndPassword(loginData.email, loginData.password);
  //   } catch (error) {
  //     setErrorMessage(error.message || "Failed to sign in");
  //   } finally {
  //     setIsSigningIn(false);
  //   }
  // };

  // const handleGoogleSignIn = async (e) => {
  //   e.preventDefault();
  //   if (isSigningIn) return;
  //   setIsSigningIn(true);
  //   setErrorMessage("");

  //   try {
  //     await doSignInWithGoogle();
  //   } catch (error) {
  //     setErrorMessage(error.message || "Google Sign-In failed");
  //   } finally {
  //     setIsSigningIn(false);
  //   }
  // };

  const handleSignIn = async (e, signInMethod, ...args) => {
    e.preventDefault();
    if (isSigningIn) return;
    setIsSigningIn(true);
    setErrorMessage("");

    try {
      await signInMethod(...args);
    } catch (error) {
      setErrorMessage(error.message || "Failed to sign in");
    } finally {
      setIsSigningIn(false);
    }
  };

  if (userLoggedIn) return <Navigate to={"/dashboard"} replace={true} />;

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold">Login</h2>
        <form
          onSubmit={(e) =>
            handleSignIn(
              e,
              doSignInWithEmailAndPassword,
              loginData.email,
              loginData.password,
            )
          }
        >
          <FormInput
            type="email"
            label="Email:"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <FormInput
            type="password"
            label="Password:"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          {errorMessage && (
            <span className="font-bold text-red-600">{errorMessage}</span>
          )}

          <button
            className="mt-2 mb-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="submit"
            disabled={isSigningIn}
          >
            {isSigningIn ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="mb-3 text-center text-sm">
          Don't have an account?{" "}
          <Link to={"/signup"} className="font-bold hover:underline">
            Sign up
          </Link>
        </p>
        <div className="mb-3 flex w-full flex-row text-center">
          <div className="mr-2 mb-3 w-full border-b-2"></div>
          <div className="w-fit text-sm font-bold">OR</div>
          <div className="mb-3 ml-2 w-full border-b-2"></div>
        </div>
        <button
          disabled={isSigningIn}
          onClick={(e) => {
            handleSignIn(e, doSignInWithGoogle);
          }}
          className={`flex w-full items-center justify-center gap-x-3 rounded-lg border py-2.5 text-sm font-medium ${isSigningIn ? "cursor-not-allowed" : "transition duration-300 hover:bg-gray-100 active:bg-gray-100"}`}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_17_40)">
              <path
                d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                fill="#4285F4"
              />
              <path
                d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                fill="#34A853"
              />
              <path
                d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                fill="#FBBC04"
              />
              <path
                d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {isSigningIn ? "Signing In..." : "Continue with Google"}
        </button>
      </div>
    </div>
  );
}

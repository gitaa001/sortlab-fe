"use client";

import Navbar from "@/component/navbar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/authContext"; 

export default function Register() {
  const { register, loading, error, clearError } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    clearError();
    setLocalError(null);

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long!");
      return;
    }

    await register(username, email, password);
  };

  const displayError = localError || error;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/quiz7.jpg")' }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-40">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
          {/* Left Illustration */}
          <div className="hidden md:flex items-center justify-center bg-gray-100">
            <img
              src="/elmt.png"
              alt="Register Illustration"
              className="w-3/4 h-auto"
            />
          </div>

          {/* Right Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create an account
            </h2>
            <p className="text-gray-500 mb-6">
              Join us and start your journey today!
            </p>

            {/* Social buttons */}
            <button className="flex items-center justify-center gap-2 w-full border px-4 py-2 mb-10 rounded-lg hover:bg-gray-50">
              <img src="/google2.png" alt="Google" className="w-5 h-5" />
              <span className="text-sm">Google</span>
            </button>

            <div className="flex items-center mb-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-2 text-sm text-gray-400">
                or sign up with email
              </span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {displayError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium flex-1">{displayError}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={() => {
                      clearError();
                      setLocalError(null);
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (displayError) {
                    clearError();
                    setLocalError(null);
                  }
                }}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#471BCC] focus:border-[#471BCC]"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (displayError) {
                    clearError();
                    setLocalError(null);
                  }
                }}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#471BCC] focus:border-[#471BCC]"
                required
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (displayError) {
                    clearError();
                    setLocalError(null);
                  }
                }}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#471BCC] focus:border-[#471BCC]"
                required
                minLength={6}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (displayError) {
                    clearError();
                    setLocalError(null);
                  }
                }}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#471BCC] focus:border-[#471BCC]"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-semibold py-2 rounded-lg transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#471BCC] hover:bg-[#6F4CD8]"
                }`}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-[#471BCC] hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
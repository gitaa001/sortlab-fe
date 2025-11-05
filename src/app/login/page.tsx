"use client";

import Navbar from "@/component/navbar";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import Image from "next/image"; 

export default function SignInPage() {
  const { login, loading, error, clearError } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError(); 
    await login(email, password); 
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/quiz7.jpg")' }}
    >
      <Navbar /> 

      {/* Main Section */}
      <div className="flex items-center justify-center px-4 py-60">
        <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
          {/* Left Illustration */}
          <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-8">
            <Image
              src="/elmt.png"
              alt="Illustration"
              width={384}
              height={384}
              className="max-h-96 object-contain"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in</h2>
            <p className="text-sm text-gray-500 mb-6">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-[#471BCC] hover:underline">
                Sign up
              </a>
            </p>

            <button className="flex items-center justify-center gap-2 w-full border px-4 py-2 mb-10 rounded-lg hover:bg-gray-50">
              <Image 
                src="/google2.png" 
                alt="Google" 
                width={20} 
                height={20} 
              />
              <span className="text-sm">Google</span>
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Error Alert Component */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenOdd" />
                  </svg>
                  <span className="text-sm font-medium flex-1">{error}</span>
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                    onClick={clearError}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenOdd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) clearError(); 
                }}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#471BCC]"
                required
              />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                }}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#471BCC]"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-2 rounded-lg font-medium transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#471BCC] hover:bg-[#6F4CD8]"
                }`}
              >
                {loading ? "Signing in..." : "Start training"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
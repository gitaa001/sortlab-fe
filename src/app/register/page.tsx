'use client'

import Navbar from "@/component/navbar";
import Link from "next/link";

export default function Register() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("/quiz7.jpg")'}}>
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
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Create an account</h2>
            <p className="text-gray-500 mb-6">Join us and start your journey today!</p>

            {/* Social buttons */}
            <button className="flex items-center justify-center gap-2 w-full border px-4 py-2 mb-10 rounded-lg hover:bg-gray-50">
              <img src="/google2.png" alt="Google" className="w-5 h-5" />
              <span className="text-sm">Google</span>
            </button>

            <div className="flex items-center mb-6">
              <hr className="flex-1 border-gray-300" />
              <span className="px-2 text-sm text-gray-400">or sign up with email</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Sign Up
              </button>
            </form>

            <p className="text-sm text-gray-500 text-center mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

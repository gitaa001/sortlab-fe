"use client";

import Navbar from "@/component/navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext"; // ⬅️ Tambahkan ini!

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth(); // ⬅️ Ambil fungsi login dari context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Gunakan fungsi login dari context (bukan fetch manual)
      await login(email, password);
      router.push("/profile"); // arahkan ke halaman profile
    } catch (err: any) {
      alert(err.message || "Login gagal. Coba lagi ya!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/quiz7.jpg")' }}
    >
      <Navbar /> {/* ⬅️ Navbar tetap di sini */}

      {/* Main Section */}
      <div className="flex items-center justify-center px-4 py-60">
        <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full">
          {/* Left Illustration */}
          <div className="hidden md:flex w-1/2 bg-gray-100 items-center justify-center p-8">
            <img
              src="/elmt.png"
              alt="Illustration"
              className="max-h-96 object-contain"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign in</h2>
            <p className="text-sm text-gray-500 mb-6">
              Don’t have an account?{" "}
              <a href="/register" className="text-[#471BCC] hover:underline">
                Sign up
              </a>
            </p>

            <button className="flex items-center justify-center gap-2 w-full border px-4 py-2 mb-10 rounded-lg hover:bg-gray-50">
              <img src="/google2.png" alt="Google" className="w-5 h-5" />
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#471BCC]"
                required
              />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

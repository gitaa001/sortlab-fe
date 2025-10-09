"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-600">You need to login first.</p>
        <button
          onClick={() => router.push("/login")}
          className="text-indigo-600 underline"
        >
          Go to login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="max-w-md mx-auto pt-12 pb-8">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            👤 User Profile
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Username</p>
              <p className="text-gray-800 font-medium">{user.username}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-gray-800 font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Quiz Score</p>
              <p className="text-gray-800 font-medium">
                {user.quizScore ?? "No quiz taken yet"}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="mt-8 w-full bg-[#471BCC] text-white py-2 rounded-lg hover:bg-[#6F4CD8] transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

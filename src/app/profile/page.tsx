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

  // --- Define progress type ---
  type ProgressKey = "bubbleSort" | "selectionSort" | "insertionSort" | "mergeSort";

  const progressLabels: Record<ProgressKey, string> = {
    bubbleSort: "Bubble Sort",
    selectionSort: "Selection Sort",
    insertionSort: "Insertion Sort",
    mergeSort: "Merge Sort",
  };

  const practiceProgress = user.progressPractice || {};
  const competeProgress = user.progressCompete || {};

  // --- Helper for quiz status ---
  const getQuizStatus = (quiz: { score?: number }): string => {
    if (quiz?.score === undefined) return "Not Yet Taken";
    if (quiz.score >= 70) return `Completed (${quiz.score}%)`;
    return `Failed (${quiz.score}%)`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24">
      <div className="max-w-md mx-auto pt-12 pb-8">
        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            👤 User Profile
          </h2>

          {/* User Info */}
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
              <p className="text-gray-500 text-sm">Total Points</p>
              <p className="text-gray-800 font-medium">
                {user.totalPoints ?? 0}
              </p>
            </div>
          </div>

          {/* Practice Progress */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              📘 Learning Progress
            </h3>
            <ul className="space-y-2">
              {(Object.keys(progressLabels) as ProgressKey[]).map((key) => (
                <li key={key} className="flex justify-between">
                  <span className="text-gray-600">{progressLabels[key]}</span>
                  <span
                    className={`font-medium ${
                      practiceProgress[key]
                        ? "text-green-600"
                        : "text-red-500 italic"
                    }`}
                  >
                    {practiceProgress[key] ? "Done ✅" : "Not Yet Studied"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quiz Progress */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              🏆 Quiz Progress
            </h3>
            <ul className="space-y-2">
              {(Object.keys(progressLabels) as ProgressKey[]).map((key) => {
                const quiz = competeProgress[key] || {};
                const status = getQuizStatus(quiz);

                return (
                  <li key={key} className="flex justify-between">
                    <span className="text-gray-600">{progressLabels[key]}</span>
                    <span
                      className={`font-medium ${
                        status.startsWith("Completed")
                          ? "text-green-600"
                          : status.startsWith("Failed")
                          ? "text-red-500"
                          : "text-gray-400 italic"
                      }`}
                    >
                      {status}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Logout */}
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

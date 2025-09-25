'use client'

import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import { Trophy, Medal } from "lucide-react";
import RemainingTime from '@/component/time-dummy';

// Dummy data placeholder (bisa diganti dari DB nanti)
const leaderboardData = [
  { rank: 1, name: "Blademir Malina Tori", username: "@popy_bob", wins: 443, quizzes: 20, points: 44872 },
  { rank: 2, name: "Robert Fox", username: "@robert_fox", wins: 440, quizzes: 19, points: 42515 },
  { rank: 3, name: "Molida Glinda", username: "@molida_glinda", wins: 436, quizzes: 18, points: 40550 },
  { rank: 4, name: "Darlene Robertson", username: "@darlene_robertson", wins: 430, quizzes: 17, points: 39800 },
  { rank: 5, name: "Jerome Bell", username: "@jerome_bell", wins: 425, quizzes: 16, points: 38500 },
  { rank: 6, name: "Cameron Williamson", username: "@cameron_williamson", wins: 420, quizzes: 15, points: 37250 },
  { rank: 7, name: "Courtney Henry", username: "@courtney_henry", wins: 415, quizzes: 14, points: 36000 },
];

const Page = () => {
  // ambil 3 besar untuk kotak medali
  const top3 = leaderboardData.slice(0, 3);
  // ambil semua untuk global ranking
  const globalRanking = leaderboardData;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mt-30 px-20">
        <div className="flex items-center justify-center gap-3 mb-20">
          <Trophy className="text-black w-10 h-10" />
          <h1 className="text-4xl font-semibold text-black">Leaderboard</h1>
        </div>

        {/* Header Info */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-[#471BCC] text-white flex flex-col items-center justify-center rounded-xl p-4 shadow">
            <h2 className="text-sm opacity-80">Total Registered</h2>
            <p className="text-2xl font-bold">1277</p>
          </div>
          <div className="bg-[#471BCC] text-white flex flex-col items-center justify-center rounded-xl p-4 shadow">
            <h2 className="text-sm opacity-80">Total Participant</h2>
            <p className="text-2xl font-bold">255</p>
          </div>
          <RemainingTime />
        </div>

        {/* Top 3 */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {top3.map((user, idx) => {
            const medalColors = ["text-yellow-400", "text-gray-300", "text-orange-400"];
            return (
              <div
                key={user.rank}
                className="bg-[#471BCC] text-white rounded-xl p-6 flex flex-col items-center shadow-lg"
              >
                <Medal className={`${medalColors[idx]} w-10 h-10 mb-2`} />
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-sm opacity-80">{user.username}</p>
                <p className="text-2xl font-bold mt-3">{user.points.toLocaleString()} pts</p>
                <p className="text-sm">{user.wins} Wins · {user.quizzes} Quizzes</p>
              </div>
            );
          })}
        </div>

        {/* Global Ranking */}
        <div className="bg-gray-50 border rounded-2xl shadow p-6 mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#471BCC]">Global Ranking</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-2">Rank</th>
                <th className="p-2">User</th>
                <th className="p-2">Wins</th>
                <th className="p-2">Quizzes</th>
                <th className="p-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {globalRanking.map((user) => (
                <tr key={user.rank} className="border-b hover:bg-gray-100">
                  <td className="p-2 font-bold text-[#471BCC]">{user.rank}</td>
                  <td className="p-2">{user.name}</td>
                  <td className="p-2">{user.wins}</td>
                  <td className="p-2">{user.quizzes}</td>
                  <td className="p-2 font-semibold">{user.points.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;

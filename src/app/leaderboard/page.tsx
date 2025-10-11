'use client'

import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import { Trophy, Medal } from "lucide-react";
import RemainingTime from '@/component/time-dummy';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';

interface ApiLeaderboardUser {
  _id: string;
  username: string;
  email: string;
  totalPoints: number;
  completedQuizzes: number;
}

interface LeaderboardUser extends ApiLeaderboardUser {
  rank: number;
}

const Page = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data: ApiLeaderboardUser[] = await api.getLeaderboard(); 
      
      // Add ranking to data
      const rankedData: LeaderboardUser[] = data.map((user: ApiLeaderboardUser, index: number) => ({
        ...user,
        rank: index + 1
      }));
      
      setLeaderboardData(rankedData);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      setError('Failed to load leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  // ambil 3 besar untuk kotak medali
  const top3 = leaderboardData.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="mt-30 px-20 flex justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#471BCC] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading leaderboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="mt-30 px-20 flex justify-center">
          <div className="text-center text-red-600">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="mt-30 px-20">
        <div className="flex items-center justify-center gap-3 mb-20">
          <Trophy className="text-black w-10 h-10" />
          <h1 className="text-4xl font-semibold text-black">Leaderboard</h1>
        </div>

        {/* Header Info */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-[#471BCC] text-white flex flex-col items-center justify-center rounded-[15px] p-5 shadow">
            <h2 className="text-sm opacity-80">Total Participants</h2>
            <p className="text-3xl font-bold">{leaderboardData.length}</p>
          </div>
          <RemainingTime />
        </div>

        {/* Top 3 */}
        {top3.length > 0 && (
          <div className="grid grid-cols-3 gap-6 mb-10">
            {top3.map((user, idx) => {
              const medalColors = ["text-yellow-400", "text-gray-300", "text-orange-400"];
              return (
                <div
                  key={user._id}
                  className="bg-[#471BCC] text-white rounded-xl p-6 flex flex-col items-center shadow-lg"
                >
                  <Medal className={`${medalColors[idx]} w-10 h-10 mb-2`} />
                  <h3 className="text-lg font-bold">{user.username}</h3>
                  <p className="text-sm opacity-80">{user.email}</p>
                  <p className="text-2xl font-bold mt-3">{user.totalPoints.toLocaleString()} pts</p>
                  <p className="text-sm">{user.completedQuizzes} Quizzes Completed</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Global Ranking */}
        <div className="bg-gray-50 border rounded-2xl shadow p-6 mb-10">
          <h2 className="text-xl font-bold mb-4 text-[#471BCC]">Global Ranking</h2>
          
          {leaderboardData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No data available yet.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-3">Rank</th>
                  <th className="p-3">Username</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Total Points</th>
                  <th className="p-3">Quizzes Completed</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100 transition-colors">
                    <td className="p-3">
                      <span className={`font-bold ${user.rank <= 3 ? 'text-[#471BCC]' : 'text-gray-700'}`}>
                        #{user.rank}
                      </span>
                    </td>
                    <td className="p-3 font-medium">{user.username}</td>
                    <td className="p-3 text-gray-600">{user.email}</td>
                    <td className="p-3 font-semibold text-[#471BCC]">
                      {user.totalPoints.toLocaleString()} pts
                    </td>
                    <td className="p-3">{user.completedQuizzes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
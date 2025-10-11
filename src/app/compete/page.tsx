'use client';

import Card from '@/component/card';
import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';

interface QuizProgress {
  score: number | null;
  done: boolean;
}

interface UserProgress {
  bubbleSort: QuizProgress;
  selectionSort: QuizProgress;
  insertionSort: QuizProgress;
  mergeSort: QuizProgress;
}

const Page = () => {
  const [progress, setProgress] = useState<UserProgress>({
    bubbleSort: { score: null, done: false },
    selectionSort: { score: null, done: false },
    insertionSort: { score: null, done: false },
    mergeSort: { score: null, done: false },
  });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userData = await api.getMe();
        if (userData?.progressCompete) {
          setProgress(userData.progressCompete);
        }
      } catch (error) {
        console.error('Failed to fetch user progress:', error);
      }
    };
    fetchProgress();
  }, []);

  const quizzes = [
    { image: '/quiz4.jpg', title: 'Bubble Sort', key: 'bubbleSort', link: '/quiz/bubble' },
    { image: '/quiz6.jpg', title: 'Selection Sort', key: 'selectionSort', link: '/quiz/selection' },
    { image: '/quiz7.jpg', title: 'Insertion Sort', key: 'insertionSort', link: '/quiz/insertion' },
    { image: '/quiz8.jpg', title: 'Merge Sort', key: 'mergeSort', link: '/quiz/merge' },
  ];

  // 🔹 Tentukan status berdasarkan nilai kuis
  const getStatus = (quiz: QuizProgress): string => {
    if (!quiz || quiz.score === null) return 'Not Yet Taken';
    if (quiz.score >= 70) return 'Completed';
    return 'Failed';
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="mt-16 px-20">
        {/* Hero Section */}
        <div className="py-20 bg-[#471BCC] text-center rounded-xl shadow mb-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <Trophy className="w-14 h-14 text-yellow-300 mb-4 animate-bounce" />
            <h1 className="text-4xl font-semibold text-white px-10">
              Challenge Yourself and Compete with the Best
            </h1>
            <h3 className="text-sm text-white mt-2">
              Test your knowledge with interactive quizzes on algorithms and data structures.
              <br />
              Climb the leaderboard and prove your skills!
            </h3>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-6xl mx-auto mb-10">
          {quizzes.map((quiz, idx) => {
            const quizData = progress[quiz.key as keyof UserProgress];
            const status = getStatus(quizData);

            return (
              <motion.div
                key={quiz.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: idx * 0.2,
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              >
                <Card
                  image={quiz.image}
                  title={quiz.title}
                  progress={status}
                  link={quiz.link}
                  hoverText="Start Quiz"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;

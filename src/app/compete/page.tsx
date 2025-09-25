'use client'

import Card from '@/component/card';
import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Wrapper */}
      <div className="mt-16 px-20">
        {/* Hero Section */}
        <div className="py-20 bg-[#471BCC] text-center rounded-xl shadow mb-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <Trophy className="w-14 h-14 text-yellow-300 mb-4 animate-bounce" />
            <h1 className="text-4xl font-semibold text-white px-10">
              Challenge Yourself and Compete with the Best
            </h1>
            <h3 className="text-sm text-white mt-2">
              Test your knowledge with interactive quizzes on algorithms and
              data structures.
              <br />
              Climb the leaderboard and prove your skills!
            </h3>
          </div>
        </div>
    

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 max-w-6xl mx-auto mb-10">
          {[
            { image: "/quiz4.jpg", title: "Bubble Sort", progress: 80, link: "/quiz/bubble" },
            { image: "/quiz6.jpg", title: "Selection Sort", progress: 60, link: "/quiz/selection" },
            { image: "/quiz7.jpg", title: "Insertion Sort", progress: 70, link: "/quiz/insertion" },
            { image: "/quiz8.jpg", title: "Merge Sort", progress: 0, link: "/quiz/merge" },
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.2,
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <Card
                image={card.image}
                title={card.title}
                progress={card.progress}
                link={card.link}
                hoverText="Start Quiz"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Page;

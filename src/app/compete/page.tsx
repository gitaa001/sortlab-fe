'use client'

import Card from '@/component/card';
import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import { Award } from "lucide-react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar /> 

        <div className="mt-15 py-20 bg-[#471BCC] text-center top-0 z-40">
            <h1 className="text-2xl font-semibold text-white">Challenge Yourself and Compete with the Best</h1>
            <h3 className="text-sm text-white mt-2">Test your knowledge with interactive quizzes on algorithms and data structures.<br/>
            Climb the leaderboard and prove your skills!</h3>
        </div>
      
      <div className="mt-20 px-20">
        

        {/* Cards Section */}
        <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 max-w-5xl mx-auto">
            <Card
                image="/bubble.png"
                title="Bubble Sort"
                progress={80}
                link='quiz/bubble'
                hoverText='Start Quiz'
            />
            <Card
                image="/selection.png"
                title="Selection Sort"
                progress={60}
                link='/selection-sort'
                hoverText='Start Quiz'
            />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Page;
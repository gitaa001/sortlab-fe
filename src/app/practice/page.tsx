"use client";

import Footer from "@/component/footer";
import Navbar from "@/component/navbar";
import Card from "@/component/card";
import { Book } from "lucide-react";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="mt-16 px-20">
        {/* Hero Section */}
        <div className="py-20 bg-[#471BCC] text-center rounded-xl shadow mb-10 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center">
            <Book className="w-14 h-14 text-yellow-300 mb-4 animate-bounce" />
            <h1 className="text-4xl font-semibold text-white px-10">
              Practice Makes Perfect
            </h1>
            <h3 className="text-sm text-white mt-2">
              Study theory in the Library and experiment with step-by-step Visualizers. <br />
              Build confidence by seeing algorithms in action
            </h3>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 max-w-5xl mx-auto mb-10">
          {[
            {
              image: "/bubble.png",
              title: "Bubble Sort",
              progress: 80,
              link: "/bubble-sort",
            },
            {
              image: "/selection.png",
              title: "Selection Sort",
              progress: 60,
              link: "/selection-sort",
            },
            {
              image: "/insertion.png",
              title: "Insertion Sort",
              progress: 70,
              link: "/insertion-sort",
            },
            {
              image: "/merge.png",
              title: "Merge Sort",
              progress: 0,
              link: "/merge-sort",
            },
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
                hoverText="Learn"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;

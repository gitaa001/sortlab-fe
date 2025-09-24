'use client'

import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import Card from "@/component/card";

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 justify-center">
            <Navbar />
        </div>

        <div className="mt-30 mb-10 text-center">
            <h1 className="text-2xl font-semibold">Programming Tutorials and Practice Problems</h1>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 max-w-5xl mx-auto">
            <Card
            image="/sorting.png"
            title="Bubble Sort"
            progress={80}
            link='/bubble-sort'
            />
            <Card
            image="/searching.png"
            title="Selection Sort"
            progress={60}
            link='/searching'
            />
            <Card
            image="/graph.png"
            title="Insertion Sort"
            progress={70}
            link='/graph'
            />
            <Card
            image="/data-structure.png"
            title="Merge Sort"
            progress={0}
            link='/data-structure'
            />
        </div>

        <Footer />


    </div>
  );
}

export default Page;
'use client'

import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import Card from "@/component/card";

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
        <Navbar />

        <div className="mt-30 mb-10 text-center">
            <h1 className="text-2xl font-semibold">Sorting Algorithms Tutorials and Practice Problems</h1>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 max-w-5xl mx-auto mb-20">
            <Card
            image="/bubble.png"
            title="Bubble Sort"
            progress={80}
            link='/bubble-sort'
            hoverText="Learn"
            />
            <Card
            image="/selection.png"
            title="Selection Sort"
            progress={60}
            link='/selection-sort'
            hoverText="Learn"
            />
            <Card
            image="/insertion.png"
            title="Insertion Sort"
            progress={70}
            link='/insertion-sort'
            hoverText="Learn"
            />
            <Card
            image="/merge.png"
            title="Merge Sort"
            progress={0}
            link='/merge-sort'
            hoverText="Learn"
            />
        </div>

        <Footer />


    </div>
  );
}

export default Page;
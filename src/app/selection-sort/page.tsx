'use client'

import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import Breadcrumb from '@/component/breadcrumb';
import LibraryLayout from '@/component/layout-template/library';
import { useState } from 'react';
import Visualizer from '@/component/layout-template/visualizer';
import Slide from '@/component/slide';

const Page = () => {
    const breadcrumbItems = [
        { label: "All Tracks", href: "/practice" },
        { label: "Selection Sort" }
    ];     

    const [activeTab, setActiveTab] = useState<'library' | 'visualizer'>('library');

    const slides = [
        "/selection/1.png",  // Hapus "sortlab-fe/public"
        "/selection/2.png", 
        "/selection/3.png",
        "/selection/4.png",
        "/selection/5.png",
        "/selection/6.png",
    ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Breadcrumb */}
      <div className="px-20 mt-20">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 px-20 mt-6 gap-8">
        {/* Sidebar */}
        <aside className="w-48">
          <h2 className="font-bold mb-5 text-xl">Selection Sort</h2>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab('library')}
                className={`block w-full text-left p-2 rounded ${
                  activeTab === 'library' 
                    ? 'bg-[#6F4CD8] text-white font-semibold' 
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                Library
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('visualizer')}
                className={`block w-full text-left p-2 rounded ${
                  activeTab === 'visualizer'
                    ? 'bg-[#6F4CD8] text-white font-semibold' 
                    : 'text-black hover:bg-gray-100'
                }`}
              >
                Visualizer
              </button>
            </li>
          </ul>
        </aside>

        {/* Right Content */}

        {/* LIBRARY */}
        <main className="flex-1 mb-10">
          {activeTab === 'library' && (
            <section>
              <LibraryLayout
                title="Selection Sort"
                videoUrl="https://www.youtube.com/embed/g-PGLbMth_g"
                content={
                  <div>
                    <p>
                      Selection Sort is a simple sorting algorithm that works by repeatedly
                      selecting the smallest (or largest, depending on the order) element from
                      the unsorted portion and moving it to the sorted portion.
                    </p>

                    <h4 className="font-semibold mt-4 mb-2">How Selection Sort Works:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Start from the first index and find the minimum element in the unsorted part.</li>
                      <li>Swap the found minimum element with the first element.</li>
                      <li>Move the boundary of the sorted and unsorted part one step forward.</li>
                      <li>Repeat the process for the remaining unsorted elements.</li>
                    </ol>

                    <div className="my-6">
                        <Slide autoSlide={true} autoSlideInterval={4000}>
                            {slides.map((src, index) => (
                                <div key={index} className="flex justify-center items-center h-96 bg-gray-50 rounded-lg">
                                    <img 
                                        src={src} 
                                        alt={`Selection Sort Step ${index + 1}`}
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                            ))}
                        </Slide>
                    </div>

                    <h4 className="font-semibold mt-4 mb-2">Complexity Analysis:</h4>
                    <ul className="list-disc list-inside">
                      <li>
                        <strong>Time Complexity:</strong> O(n²) in all cases (best, average, and worst).
                      </li>
                      <li>
                        <strong>Space Complexity:</strong> O(1) (in-place sorting).
                      </li>
                    </ul>

                    <h4 className="font-semibold mt-4 mb-2">Characteristics:</h4>
                    <ul className="list-disc list-inside">
                      <li>Selection Sort is not stable by default.</li>
                      <li>It is an in-place sorting algorithm.</li>
                      <li>Not suitable for large datasets due to its O(n²) time complexity.</li>
                      <li>The graph describing the Selection Sort time complexity looks like this:</li>
                      <img src="/s-sort.png" alt="Selection Sort Complexity Graph" className="mt-2" />
                    </ul>
                  </div>
                }
              />
            </section>
          )}

          {/** VISUALIZER **/}
          {activeTab === 'visualizer' && (
            <section>
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Selection Sort Visualizer</h2>
                <Visualizer algorithm="selection" initialSize={8} />
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
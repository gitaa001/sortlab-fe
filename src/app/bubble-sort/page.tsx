'use client'

import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import Breadcrumb from '@/component/breadcrumb';
import LibraryLayout from '@/component/layout-template/library';
import { useState } from 'react';
import Visualizer from '@/component/layout-template/visualizer';

const Page = () => {
  const breadcrumbItems = [
    { label: "All Tracks", href: "/practice" },
    { label: "Bubble Sort" }
  ];

  const [activeTab, setActiveTab] = useState<'library' | 'visualizer'>('library');

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
          <h2 className="font-bold mb-5 text-xl">Bubble Sort</h2>
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
        <main className="flex-1 mb-10">
          {activeTab === 'library' && (
            <section>
              <LibraryLayout
                title="Bubble Sort"
                videoUrl="https://www.youtube.com/embed/xli_FI7CuzA"
                content={
                  <div>
                    <p>
                      Bubble Sort is the simplest sorting algorithm that works by 
                      repeatedly swapping the adjacent elements if they are in the wrong order. 
                      The pass through the list is repeated until the list is sorted.
                    </p>
                    
                    <h4 className="font-semibold mt-4 mb-2">How Bubble Sort Works:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Starting from the first index, compare the first and the second elements.</li>
                      <li>If the first element is greater than the second element, they are swapped.</li>
                      <li>Now, compare the second and the third element. Swap them if they are not in order.</li>
                      <li>The above process goes on until the last element.</li>
                      <li>The same process goes on for the remaining iterations.</li>
                    </ol>

                    <h4 className="font-semibold mt-4 mb-2">Complexity Analysis:</h4>
                      <ul className="list-disc list-inside">
                        <li>
                          <strong>Time Complexity:</strong> O(n²) in the worst and average case,  
                          O(n) in the best case (when the array is already sorted).
                        </li>
                        <li>
                          <strong>Space Complexity:</strong> O(1) (in-place sorting).
                        </li>
                      </ul>

                      <h4 className="font-semibold mt-4 mb-2">Characteristics:</h4>
                      <ul className="list-disc list-inside">
                        <li>Bubble Sort is stable.</li>
                        <li>It is an in-place sorting algorithm.</li>
                        <li>Not suitable for large datasets due to its O(n²) time complexity.</li>
                        <li>The graph describing the Bubble Sort time complexity looks like this:</li>
                        <img src="/b-sort.png" alt="Bubble Sort Complexity Graph" className="mt-2" />
                      </ul>
                  </div>
                }
              />
            </section>
          )}

          {activeTab === 'visualizer' && (
            <section>
              <div className="bg-white border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Bubble Sort Visualizer</h2>
                <Visualizer algorithm="bubble" initialSize={8} />
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
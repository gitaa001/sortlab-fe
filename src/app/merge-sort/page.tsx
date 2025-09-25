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
        { label: "Merge Sort" }
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
          <h2 className="font-bold mb-5 text-xl">Merge Sort</h2>
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
        <main className="flex-1 mb-10 min-h-[600px]">
          {activeTab === 'library' && (
            <section>
              <LibraryLayout
                title="Merge Sort"
                videoUrl="https://youtube.com/embed/4VqmGXwpLqc?si=HjJAZIXXxVs9KCvp"
                content={
                  <div>
                    <p>
                      Merge Sort is a divide-and-conquer algorithm that was invented by John von Neumann in 1945. 
                      It is an efficient, stable sorting algorithm that works by recursively dividing the array into halves, 
                      sorting each half, and then merging the sorted halves back together.
                      It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. 
                      However, it has several advantages, including simplicity, efficiency for small datasets, and stability.
                    </p>

                    <h4 className="font-semibold mt-4 mb-2">How Merge Sort Works:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Divide the unsorted list into n sublists, each containing one element.</li>
                      <li>Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining.</li>
                      <li>This final sublist is the sorted list.</li>
                      <li>Repeat this process for all elements in the array until the entire array is sorted.</li>
                    </ol>

                    <h4 className="font-semibold mt-4 mb-2">Complexity Analysis:</h4>
                    <ul className="list-disc list-inside">
                      <li>
                        <strong>Time Complexity:</strong> O(n log n) in the worst and average cases, O(n) in the best case (when the array is already sorted).
                      </li>
                      <li>
                        <strong>Space Complexity:</strong> O(n) (not in-place sorting).
                      </li>
                    </ul>

                    <h4 className="font-semibold mt-4 mb-2">Characteristics:</h4>
                    <ul className="list-disc list-inside">
                      <li>Merge Sort is stable.</li>
                      <li>It is not an in-place sorting algorithm.</li>
                      <li>Efficient for large datasets.</li>
                      <li>The graph describing the Merge Sort time complexity looks like this:</li>
                      <img src="/merge/m-sort.png" alt="Merge Sort Complexity Graph" className="mt-2" />
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
                <h2 className="text-xl font-bold mb-4">Merge Sort Visualizer</h2>
                <Visualizer algorithm="merge" initialSize={8} />
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
'use client'

import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import Breadcrumb from '@/component/breadcrumb';
import LibraryLayout from '@/component/layout-template/library';
import { useState, useEffect } from 'react';
import Visualizer from '@/component/layout-template/visualizer';
import { useAuth } from '@/contexts/authContext';
import { api } from '@/services/api';

const Page = () => {
    const breadcrumbItems = [
        { label: "All Tracks", href: "/practice" },
        { label: "Merge Sort" }
    ];     

    const [activeTab, setActiveTab] = useState<'library' | 'visualizer'>('library');
    const { user } = useAuth();

    // Update progress when user visits the page
    useEffect(() => {
        if (user?._id) {
            api.updateProgress(user._id, "mergeSort")
                .catch((err) => console.error("Failed to update progress:", err));
        }
    }, [user]);

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

        {/* LIBRARY */}
        <main className="flex-1 mb-10">
          {activeTab === 'library' && (
            <LibraryLayout
              title="Merge Sort"
              videoUrl="https://youtube.com/embed/4VqmGXwpLqc?si=HjJAZIXXxVs9KCvp"
              content={
                <div>
                  <p>
                    Merge Sort is a divide-and-conquer algorithm that was invented by John von Neumann in 1945. 
                    It is an efficient, stable sorting algorithm that works by recursively dividing the array into halves, 
                    sorting each half, and then merging the sorted halves back together.
                    Unlike simple sorting algorithms, Merge Sort maintains O(n log n) time complexity in all cases.
                  </p>

                  <h4 className="font-semibold mt-4 mb-2">How Merge Sort Works:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Divide the unsorted list into n sublists, each containing one element.</li>
                    <li>Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining.</li>
                    <li>This final sublist is the sorted list.</li>
                    <li>The merge operation compares elements from two sorted arrays and combines them into one sorted array.</li>
                  </ol>

                  <h4 className="font-semibold mt-4 mb-2">Complexity Analysis:</h4>
                  <ul className="list-disc list-inside">
                    <li>
                      <strong>Time Complexity:</strong> O(n log n) in all cases (best, average, and worst).
                    </li>
                    <li>
                      <strong>Space Complexity:</strong> O(n) (not in-place sorting).
                    </li>
                  </ul>

                  <h4 className="font-semibold mt-4 mb-2">Characteristics:</h4>
                  <ul className="list-disc list-inside">
                    <li>Merge Sort is stable.</li>
                    <li>It is not an in-place sorting algorithm.</li>
                    <li>Efficient for large datasets due to consistent O(n log n) performance.</li>
                    <li>The graph describing the Merge Sort time complexity looks like this:</li>
                    <img src="/merge/m-sort.png" alt="Merge Sort Complexity Graph" className="mt-2" />
                  </ul>
                </div>
              }
            />
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
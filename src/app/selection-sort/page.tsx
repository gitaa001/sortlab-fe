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
    { label: "Selection Sort" }
  ];     

  const [activeTab, setActiveTab] = useState<'library' | 'visualizer'>('library');
  const { user } = useAuth();

  // Update progress when user visits the page
  useEffect(() => {
    if (user?._id) {
      api.updateProgress(user._id, "selectionSort")
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

        {/* LIBRARY */}
        <main className="flex-1 mb-10">
          {activeTab === 'library' && (
            <LibraryLayout
              title="Selection Sort"
              videoUrl="https://youtube.com/embed/g-PGLbMth_g?si=vCK0Taw5olrpUmR1"
              content={
                <div>
                  <p>
                    Selection Sort is a simple comparison-based sorting algorithm.
                    It divides the array into two parts: a sorted part and an unsorted part.
                    In each iteration, the smallest (or largest) element from the unsorted part
                    is selected and swapped with the first element of the unsorted part.
                  </p>

                  <h4 className="font-semibold mt-4 mb-2">How Selection Sort Works:</h4>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Start from the first element of the array.</li>
                    <li>Find the minimum element in the unsorted part of the array.</li>
                    <li>Swap the minimum element with the first element of the unsorted part.</li>
                    <li>Move the boundary of the sorted and unsorted parts by one, and repeat until sorted.</li>
                  </ol>

                  <h4 className="font-semibold mt-4 mb-2">Complexity Analysis:</h4>
                  <ul className="list-disc list-inside">
                    <li>
                      <strong>Time Complexity:</strong> O(n²) for best, average, and worst cases.
                    </li>
                    <li>
                      <strong>Space Complexity:</strong> O(1) (in-place sorting).
                    </li>
                  </ul>

                  <h4 className="font-semibold mt-4 mb-2">Characteristics:</h4>
                  <ul className="list-disc list-inside">
                    <li>Selection Sort is <strong>not stable</strong> (relative order of equal elements may change).</li>
                    <li>It is an in-place sorting algorithm.</li>
                    <li>Simple to implement but inefficient for large datasets.</li>
                    <li>The graph describing the Selection Sort time complexity looks like this:</li>
                    <img src="/selection/s-sort.png" alt="Selection Sort Complexity Graph" className="mt-2" />
                  </ul>
                </div>
              }
            />
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
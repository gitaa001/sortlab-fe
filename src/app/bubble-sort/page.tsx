'use client'

import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import Breadcrumb from '@/component/breadcrumb';
import LibraryLayout from '@/component/library';
import { useState } from 'react';
import Visualizer from '@/component/visualizer';

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
        <main className="flex-1">
          {/* Library Section - Tampil hanya jika tab library aktif */}
          {activeTab === 'library' && (
            <section>
              <LibraryLayout
                title="Bubble Sort"
                content={
                  <div>
                    <h3 className="font-semibold mb-2">Materi</h3>
                    <p>
                      Bubble Sort adalah algoritma pengurutan sederhana yang 
                      bekerja dengan cara membandingkan elemen bersebelahan 
                      dan menukarnya jika dalam urutan yang salah.
                    </p>
                    
                    <h4 className="font-semibold mt-4 mb-2">Cara Kerja:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Bandingkan dua elemen bersebelahan</li>
                      <li>Tukar jika elemen pertama lebih besar dari elemen kedua</li>
                      <li>Lanjutkan hingga akhir array</li>
                      <li>Ulangi proses untuk seluruh array</li>
                    </ol>

                    <h4 className="font-semibold mt-4 mb-2">Kompleksitas:</h4>
                    <ul className="list-disc list-inside">
                      <li>Time Complexity: O(n²)</li>
                      <li>Space Complexity: O(1)</li>
                    </ul>
                  </div>
                }
              />
            </section>
          )}

          {/* Visualizer Section - Tampil hanya jika tab visualizer aktif */}
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
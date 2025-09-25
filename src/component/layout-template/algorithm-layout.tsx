'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  algorithmName: string;
  children: React.ReactNode;
}

export default function AlgorithmLayout({ algorithmName, children }: Props) {
  const pathname = usePathname() || '';
  const base = `/algorithms/${algorithmName.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex min-h-[70vh] bg-white">
      <aside className="w-56 border-r bg-gray-50 p-4">
        <h3 className="font-bold text-2xl mb-6">{algorithmName}</h3>
        <nav className="flex flex-col gap-2 text-sm">
          <Link
            href={`${base}/library`}
            className={`px-1 ${pathname.includes('library') ? 'font-semibold text-[#471BCC]' : 'text-gray-700'}`}
          >
            Library
          </Link>
          <Link
            href={`${base}/visualizer`}
            className={`px-1 ${pathname.includes('visualizer') ? 'font-semibold text-[#471BCC]' : 'text-gray-700'}`}
          >
            Visualizer
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <div className="border rounded-md p-6 min-h-[480px]">
          {children}
        </div>
      </main>
    </div>
  );
}

// components/Card.tsx
import Image from "next/image";
import Link from "next/link"; 

interface CardProps {
  image: string;
  title: string;
  progress?: number;
  link: string;
  hoverText?: string;
}

export default function Card({ image, title, progress, link, hoverText }: CardProps) {
  return (
    <Link href={link} className="block">
      <div className="relative rounded-lg overflow-hidden shadow-md group cursor-pointer hover:shadow-lg transition-shadow duration-300">
        {/* Gambar */}
        <div className="relative overflow-hidden">
        <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="object-cover w-full h-80 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:blur-sm"
        />
        
        {/* Hover Overlay dengan Circle */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-[#471BCC] font-semibold text-sm">{hoverText}</span>
            </div>
        </div>
        </div>

        {/* Footer Card */}
        <div className="absolute bottom-3 left-3 right-3 bg-white rounded-md flex justify-between items-center px-3 py-2">
          <h3 className="font-semibold text-sm hover:underline">
            {title}
          </h3>
          <span className="text-gray-500 text-xs">{progress}%</span>
        </div>
      </div>
    </Link>
  );
}

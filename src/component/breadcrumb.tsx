import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string; // Optional karena item terakhir biasanya tidak clickable
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-[#471BCC] transition-colors duration-200"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
          
          {index < items.length - 1 && (
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
}
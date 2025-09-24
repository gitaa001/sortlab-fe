"use client"

import Link from 'next/link';
import { ChevronDown, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/authContext';
import { Button } from '@/ui/button';

export default function Navbar() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleUserMenuClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsServicesOpen(false);
    setIsAboutOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#471BCC]">
              SortLab
            </Link>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <Link href="/practice" className='text-m text-black hover:text-gray-700'>
                  Practice
                </Link>
              </div>
              <div className="relative">
                <Link href="/compete" className='text-m text-black hover:text-gray-700'>
                  Compete
                </Link>
              </div>
              <div className="relative">
                <Link href="/leaderboard" className='text-m text-black hover:text-gray-700'>
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={handleUserMenuClick}
                  className="inline-flex items-center text-m font-medium text-black hover:text-gray-700"
                >
                  <User className="mr-1 h-5 w-5" />
                  {user?.username}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.1)] bg-white">
                    <div className="py-1" role="menu">
                      <Link
                        href="/dashboard"
                        className="block px-6 py-2 text-sm font-medium text-black hover:text-gray-700"
                        role="menuitem"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        className="block w-full text-left px-6 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                        role="menuitem"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                      >
                        <span className="flex items-center">
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-black hover:text-gray-700">
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-[#471BCC] hover:bg-[#6F4CD8]">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/authContext";
import { Button } from "@/ui/button";

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleUserMenuClick = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = () => setIsUserMenuOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Jangan render navbar sebelum auth selesai dicek (biar gak flicker)
  if (loading) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 px-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-3 items-center h-16">
          {/* === LEFT === */}
          <div className="flex items-center justify-start">
            <Link href="/" className="text-2xl font-bold text-[#471BCC]">
              SortLab
            </Link>
          </div>

          {/* === CENTER MENU === */}
          <div className="flex justify-center">
            <div className="flex items-center space-x-8">
              {[
                { href: "/practice", label: "Practice" },
                { href: "/compete", label: "Compete" },
                { href: "/leaderboard", label: "Leaderboard" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-m hover:text-gray-700 ${
                    pathname === href
                      ? "text-[#471BCC] font-semibold"
                      : "text-black"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* === RIGHT SECTION === */}
          <div className="flex items-center justify-end space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleUserMenuClick();
                  }}
                  className="inline-flex items-center text-m font-medium text-black hover:text-gray-700"
                >
                  <User className="mr-1 h-5 w-5" />
                  {user?.username || "User"}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white border border-gray-100">
                    <div className="py-1" role="menu">
                      <Link
                        href="/profile"
                        className="block px-6 py-2 text-sm font-medium text-black hover:text-gray-700"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        className="block w-full text-left px-6 py-2 text-sm font-medium text-red-600 hover:text-red-800"
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                          router.push("/");
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

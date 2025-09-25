'use client'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import Navbar from '@/component/navbar' 
import { Button } from '@/ui/button';
import { Video, CheckSquare, Award } from "lucide-react";
import Footer from '@/component/footer';
import BlurText from '@/component/BlurText';
import { motion } from 'motion/react';


const inter = Inter({ subsets: ['latin'] })

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col pt-50 px-55 py-30">

      <motion.div
        className="absolute right-30 top-35 w-3/4 h-3/4"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 0.6, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.img
          src="/elmt.png"
          alt="Hero Image"
          className="w-full h-full object-contain object-right"
          animate={{
            y: [0, -10, 0], // naik turun pelan
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

        {/* Konten Hero */}
        <div className="relative z-10 max-w-3xl">
          {/* Badge */}
          <Link href="/leaderboard">
            <div className="flex items-center gap-2 bg-[#471BCC] text-white px-4 py-2 rounded-full w-fit shadow-md mb-6 hover:bg-[#6F4CD8] transition-colors cursor-pointer">
              <span className="bg-white text-gray-900 text-xs font-semibold px-2 py-0.5 rounded-full">
                New
              </span>
              <span className="text-sm font-medium">
                Leaderboard is now open!
              </span>
            </div>
          </Link>

          {/* Headline */}
          <div className="text-[50px] font-semibold text-black leading-tight">
            <BlurText 
              text="Learn Computational"
              className="block"
              delay={100}
              animateBy="words"
              direction="top"
            />
            <BlurText 
              text="Thinking from Scratch"
              className="block"
              delay={150}
              animateBy="words"
              direction="top"
            />
          </div>

          {/* Subheadline */}
          <h3 className="mt-4 text-[16px] text-gray-700 max-w-3xl">
            Join SortLab and embark on a journey to master algorithms and data structures <br/>
            through interactive practice and competitive coding challenges.
          </h3>

          {/* Features */}
          <div className="flex gap-6 text-sm text-black/80 mt-10">
            <span className="flex items-center gap-2">
              <Video className="h-5 w-5" /> ONLINE
            </span>
            <span className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" /> HANDS-ON
            </span>
            <span className="flex items-center gap-2">
              <Award className="h-5 w-5" /> CERTIFICATE
            </span>
          </div>

          {/* Button */}
          <div>
            <Link href="/login">
              <Button className="mt-10 bg-[#471BCC] hover:bg-[#6F4CD8] text-[14px] px-6 py-3 rounded-md shadow-md">
                Join Now
              </Button>
            </Link>
          </div>

          {/* Media partners */}
          <div className="flex flex-col pt-30">
            <h3 className="text-sm text-gray-700 mb-4">Featured On</h3>
            <div className="flex items-center gap-8">
              <img src="/google.png" alt="Google" className="h-6 w-auto" />
              <img src="/amazon.png" alt="Amazon" className="h-6 w-auto" />
              <img src="/microsoft.png" alt="Microsoft" className="h-6 w-auto" />
              <img src="/paypal.png" alt="PayPal" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>
      {/* End Hero Section */}

      {/* Stats Section */}
      <div className="relative flex flex-col items-center py-20 bg-[#471BCC] px-6">
        <div className="text-center">
          <h2 className="text-md text-white mb-4 tracking-wide">
            SOLUTIONS FOR DEVELOPERS
          </h2>
          <h1 className="text-3xl font-semibold text-white mb-2">
            Single platform to learn, practice, and compete in coding
          </h1>
          <h4 className="text-sm text-white mb-10">
            Join SortLab and embark on a journey to master algorithms and data structures through interactive practice and competitive coding challenges.
          </h4>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {/* Card 1 */}
          <div className="flex items-center p-6 bg-white/10 rounded-lg shadow-md">
            <img src="/community.png" className="h-16 w-auto" />
            <div className="flex flex-col items-start ml-6">
              <h1 className="text-4xl font-semibold text-white mb-1">100K+</h1>
              <h2 className="text-md text-white">Active Users</h2>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center p-6 bg-white/10 rounded-lg shadow-md">
            <img src="/library.png" className="h-16 w-auto" />
            <div className="flex flex-col items-start ml-6">
              <h1 className="text-4xl font-semibold text-white mb-1">1000+</h1>
              <h2 className="text-md text-white">Skills in Library</h2>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center p-6 bg-white/10 rounded-lg shadow-md">
            <img src="/school.png" className="h-16 w-auto" />
            <div className="flex flex-col items-start ml-6">
              <h1 className="text-4xl font-semibold text-white mb-1">100+</h1>
              <h2 className="text-md text-white">School Partners</h2>
            </div>
          </div>
        </div>
      </div>
      {/* End Stats Section */}

      <Footer />
    </div>
  )
}

export default Page

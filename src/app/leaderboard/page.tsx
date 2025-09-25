'use client'

import Card from '@/component/card';
import Footer from '@/component/footer';
import Navbar from '@/component/navbar';
import { Award } from "lucide-react";
import { div } from 'motion/react-m';

const Page = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar /> 
      
      <Footer />
    </div>
  );
}

export default Page;
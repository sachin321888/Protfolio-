"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import ImageCluster from "./ImageCluster";

const XIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col pt-32 pb-12 overflow-hidden w-full bg-teal">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 w-full flex-1 flex flex-col xl:flex-row relative z-10">

        {/* Left Image Grid (Cluster) */}
        <div className="xl:w-1/2 relative min-h-[500px] flex items-center justify-center xl:pr-12">
          <ImageCluster 
            centerImageSrc="/hero.jpg"
            surroundingImages={Array.from({ length: 30 }).map((_, i) => `/collage/1 (${i + 1}).jpg`)}
          />
        </div>

        {/* Right Content Area */}
        <div className="xl:w-1/2 flex flex-col justify-center xl:pl-16 relative mt-12 xl:mt-0 pb-24">

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-orange text-sm font-semibold tracking-widest uppercase mb-6"
          >
            Photographer from keralam
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-6xl md:text-8xl font-display leading-[1.1] text-white"
          >
            Visual story teller
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-white/60 mt-8 max-w-sm text-sm leading-relaxed"
          >
            From inspiring people's stories to impactful messages, I create head-turning photography that does the right thing, in the right place, at the right time.
          </motion.p>

        </div>

        {/* Vertical Follow Me Sidebar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="hidden xl:flex absolute right-0 top-0 h-[700px] w-24 flex-col items-center justify-center border-l border-white/5"
        >
          <div className="flex flex-col gap-6 text-white/50">
            <a href="https://www.instagram.com/sa__ch___in__/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram"><InstagramIcon size={18} /></a>
            <a href="https://x.com/sachinsachu100" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Twitter"><XIcon size={18} /></a>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

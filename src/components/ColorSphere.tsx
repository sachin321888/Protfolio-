"use client";

import { motion } from "framer-motion";

export default function ColorSphere() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
      {/* Outer Glow / Blur */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-gradient-to-tr from-sunshine via-terracotta to-sapphire rounded-full blur-3xl opacity-60 mix-blend-multiply"
      />

      {/* Main Sphere Body */}
      <motion.div
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.02, 0.98, 1.02, 1],
          borderRadius: [
            "50% 50% 50% 50%",
            "40% 60% 50% 40%",
            "50% 60% 40% 50%",
            "60% 40% 60% 40%",
            "50% 50% 50% 50%",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          scale: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          borderRadius: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative w-full h-full bg-gradient-to-br from-forest via-sapphire to-sunshine shadow-2xl overflow-hidden backdrop-blur-md border border-stone/20 z-10"
        style={{
          boxShadow: `
            inset -20px -20px 40px rgba(0,0,0,0.3),
            inset 20px 20px 40px rgba(255,255,255,0.4),
            0 10px 40px rgba(15, 46, 83, 0.5)
          `,
        }}
      >
        {/* Internal swirling elements simulating a complex sphere */}
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/4 -right-1/4 w-full h-full bg-gradient-to-l from-terracotta/50 to-transparent rounded-full mix-blend-overlay blur-xl"
        />
        
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-full h-full bg-gradient-to-t from-sunshine/40 to-transparent rounded-full mix-blend-color-dodge blur-xl"
        />

        {/* SR Monogram in the center of the sphere */}
        <div className="absolute inset-0 flex items-center justify-center z-20 mix-blend-overlay">
          <span className="text-white/80 font-display italic text-5xl md:text-6xl drop-shadow-lg">SR</span>
        </div>
      </motion.div>
    </div>
  );
}

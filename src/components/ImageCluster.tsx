"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Generate a natural, organic cluster distribution (Phyllotaxis / Fibonacci spiral)
const generateClusterLayout = (totalImages: number) => {
  const layout = [];
  const startIdx = 1; // 0 is reserved for the center image

  for (let i = startIdx; i <= totalImages; i++) {
    // 137.5 degrees is the golden angle
    const angle = i * 137.5 * (Math.PI / 180);

    // Spread coefficient (adjust to make the cluster tighter or looser)
    const radius = 22 * Math.sqrt(i);

    // Stretch the X axis to create a horizontal, rectangular ellipse shape
    const stretchX = 1.6;

    const x = (radius * Math.cos(angle)) * stretchX;
    const y = radius * Math.sin(angle);

    // Randomize dimensions slightly for each block
    const isPortrait = i % 3 === 0;
    const width = isPortrait ? 100 + (i % 40) : 140 + (i % 40);
    const height = isPortrait ? 150 + (i % 30) : 100 + (i % 30);

    layout.push({
      x,
      y,
      width,
      height,
      zIndex: totalImages - i, // Outer images have lower z-index generally
      delay: i * 0.05,
    });
  }
  return layout;
};

type ImageClusterProps = {
  centerImageSrc: string;
  surroundingImages: string[];
};

export default function ImageCluster({ centerImageSrc, surroundingImages }: ImageClusterProps) {
  // Layout math is completely deterministic, no need for hydration delay!
  const layout = generateClusterLayout(surroundingImages.length);

  return (
    <div className="relative w-full h-full min-h-[550px] flex items-center justify-center">
      {/* Surrounding Cluster Images */}
      {surroundingImages.map((src, idx) => {
        const item = layout[idx];
        if (!item) return null;

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: item.x,
              y: item.y
            }}
            transition={{
              duration: 0.8,
              delay: item.delay,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.08, 
              zIndex: 50, // Bring to front on hover
              transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] } 
            }}
            className="absolute shadow-xl rounded-sm overflow-hidden"
            style={{
              width: item.width,
              height: item.height,
              zIndex: item.zIndex,
              transformOrigin: "center center",
              willChange: "transform, opacity"
            }}
          >
            <Image 
              src={src} 
              alt={`cluster-image-${idx}`} 
              fill
              sizes="200px"
              quality={65}
              className="object-cover"
            />
          </motion.div>
        );
      })}

      {/* Center Image (Your Picture) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        whileHover={{ 
          scale: 1.05,
          zIndex: 60,
          transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] }
        }}
        className="absolute z-40 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md overflow-hidden border-[6px] border-white/10"
        style={{
          width: 220,
          height: 145,
          x: 0,
          y: 0,
          willChange: "transform, opacity"
        }}
      >
        <Image 
          src={centerImageSrc} 
          alt="Center Portrait" 
          fill
          priority
          sizes="400px"
          quality={85}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}

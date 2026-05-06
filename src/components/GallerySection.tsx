"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Loader2 } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<"photography" | "videography">("photography");
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveGallery = async () => {
      try {
        const { data, error } = await supabase
          .from("media")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMediaItems(data || []);
      } catch (err: any) {
        console.error("Live Gallery Fetch Error:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveGallery();
  }, []);

  const displayData = mediaItems.filter((item) => item.type === activeTab);

  return (
    <section id="portfolio" className="py-24 px-8 md:px-12 max-w-[1400px] mx-auto w-full bg-teal">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
        <div>
          <h2 className="text-4xl md:text-5xl font-display text-white mb-2">
            Selected Works
          </h2>
          <p className="text-white/50 text-sm tracking-wide">
            EXPLORE THE LATEST CAPTURES
          </p>
        </div>
        
        {/* Editorial Gallery Tabs */}
        <div className="flex items-center gap-6 mt-8 md:mt-0">
          <button
            onClick={() => setActiveTab("photography")}
            className={`pb-2 text-sm font-semibold tracking-widest uppercase transition-all ${
              activeTab === "photography" 
                ? "text-orange border-b-2 border-orange" 
                : "text-white/50 hover:text-white border-b-2 border-transparent"
            }`}
          >
            Photography
          </button>
          <button
            onClick={() => setActiveTab("videography")}
            className={`pb-2 text-sm font-semibold tracking-widest uppercase transition-all ${
              activeTab === "videography" 
                ? "text-orange border-b-2 border-orange" 
                : "text-white/50 hover:text-white border-b-2 border-transparent"
            }`}
          >
            Videography
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center py-20 opacity-50">
          <Loader2 className="animate-spin text-orange" size={40} />
        </div>
      ) : displayData.length === 0 ? (
        <div className="w-full text-center py-20 text-white/30 border border-dashed border-white/10">
          <p className="text-lg">No {activeTab} available yet.</p>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {displayData.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="group relative cursor-pointer overflow-hidden break-inside-avoid bg-charcoal"
                onClick={() => setSelectedMedia(item)}
              >
                {activeTab === "photography" ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={item.url} 
                    alt={item.title}
                    className="w-full h-auto block grayscale opacity-80 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <video 
                    src={item.url} 
                    className="w-full h-auto block grayscale opacity-80 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    muted
                    autoPlay
                    playsInline
                    loop
                  />
                )}
                
                {/* Play symbol for videos */}
                {activeTab === "videography" && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-16 h-16 border border-orange text-orange flex items-center justify-center group-hover:bg-orange group-hover:text-charcoal transition-all duration-500">
                      <Play size={24} className="translate-x-0.5" />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-charcoal to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 z-20 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-white text-lg font-sans tracking-wide">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Extreme Minimal Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-teal/95"
            onClick={() => setSelectedMedia(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 text-white/50 hover:text-orange transition-colors z-50 flex items-center gap-2 text-sm tracking-widest uppercase"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedMedia(null)}
            >
              Close <X size={20} />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === "videography" ? (
                 <div className="relative w-full aspect-video bg-charcoal flex items-center justify-center overflow-hidden border border-white/5">
                    <video src={selectedMedia.url} className="w-full h-full object-cover" controls autoPlay />
                 </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={selectedMedia.url} 
                  alt={selectedMedia.title}
                  className="w-full h-auto max-h-[85vh] object-contain shadow-2xl border border-white/5"
                />
              )}
              
              <div className="mt-6 text-center">
                <h4 className="text-white font-sans text-xl tracking-wider">{selectedMedia.title}</h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

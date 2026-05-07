"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function AboutSection() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="about" className="relative py-24 w-full bg-teal border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* About Details */}
        <div className="max-w-xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display text-white mb-8 leading-tight"
          >
            Let's create something <br />
            <span className="text-orange italic font-serif">extraordinary.</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 text-white/70"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-orange font-semibold mb-2">Current Work</p>
              <p className="text-base leading-relaxed">Currently working in Mercedez benz as an automation engineer. Freelance Photographer & Visual Storyteller based in Kerala. Passionate about capturing authentic moments and crafting compelling visual narratives. Currently available for collaborations and exciting projects globally.</p>
            </div>
            
            <div className="mt-2">
              <p className="text-xs uppercase tracking-widest text-orange font-semibold mb-2">Get in Touch</p>
              <a href="tel:+918075965788" className="text-3xl font-display text-white hover:text-orange transition-colors inline-block">
                +91 8075965788
              </a>
              <p className="text-sm mt-2 opacity-60">Feel free to reach out via phone or text.</p>
            </div>
          </motion.div>
        </div>

        {/* Jump to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-3"
          aria-label="Scroll to top"
        >
          <span className="text-xs uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Back to Top</span>
          <div className="flex items-center justify-center w-16 h-16 rounded-full border border-white/10 group-hover:border-orange bg-white/5 group-hover:bg-orange/10 transition-all duration-300">
            <ArrowUp className="text-white/70 group-hover:text-orange transition-colors" size={24} />
          </div>
        </motion.button>

      </div>
    </section>
  );
}

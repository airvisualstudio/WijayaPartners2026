import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import gdMerdeka from "@/assets/gdmerdeka.jpg";

const backgrounds = [
  gdMerdeka.src,
];

interface HeroProps {
  heading?: string;
  headingHighlight?: string;
  subheading?: string;
}

export function Hero({ heading, headingHighlight, subheading }: HeroProps) {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden h-full flex items-center justify-center">
      {/* Background Slider */}
      <div className="absolute inset-0 -z-20">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={backgrounds[currentBg]}
              alt="Background"
              className="w-full h-full object-cover grayscale opacity-70"
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px] bg-gradient-to-b from-background/60 via-background/20 to-background/90" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background gradients (kept but subtly adjusted) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl drop-shadow-sm"
          >
            {heading || "Absolute Loyalty."}{" "}
            <span className="bg-gradient-to-r from-zinc-900 via-red-600 to-zinc-900 dark:from-black-400 dark:via-red-400 dark:to-zinc-400 bg-clip-text text-transparent animate-gradient">
              {headingHighlight || "Strategic Action"}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-black dark:text-white max-w-2xl"
          >
            {subheading || "Since 1988, Wijaya & Partners has served as a dedicated legal guardian from our base in Bandung, providing sophisticated commercial litigation and advisory for local enterprises and global partners alike."}
          </motion.p>
        </div>
      </div>
    </section>
  );
}

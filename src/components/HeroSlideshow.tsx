import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    name: "Amethyst Lavender",
    title: <>Lavender<br/><span className="text-purple-300 font-extrabold">Glacier</span></>,
    tagline: "Amethyst Lavender Glacier Soap",
    subtitle: "Experience soothing aromatherapy and serene hydration infused with the high-vibration energy of crystalline Amethyst.",
    image: "/assets/hero-amethyst.jpg",
    link: "/products/lavender-glacier-gemstone-soap"
  },
  {
    id: 2,
    name: "Peridot Frost",
    title: <>Peridot<br/><span className="text-lime-300 font-extrabold">Frost</span></>,
    tagline: "Peridot Frost Refresh Soap",
    subtitle: "Awaken your skin cells with cooling neem and peppermint oils, infused with Peridot crystals for absolute restoration.",
    image: "/assets/hero-mint.jpg",
    link: "/products/peridot-frost-gemstone-soap"
  },
  {
    id: 3,
    name: "Black Diamond",
    title: <>Black<br/><span className="text-amber-400 font-extrabold">Diamond</span></>,
    tagline: "Black Diamond Detox Soap",
    subtitle: "Draw out deep dermal impurities with activated charcoal and mineral salts, energized by raw Black Diamond minerals.",
    image: "/assets/hero-charcoal-cropped.jpg",
    link: "/products/black-diamond-gemstone-soap"
  }
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000); // 7 seconds per slide for a cinematic feel
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[60vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh] min-h-[400px] sm:min-h-[550px] md:min-h-[650px] lg:min-h-[750px] w-full overflow-hidden bg-emerald-950">
      {/* Subtle top overlay to ensure header readability */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-emerald-950/50 to-transparent pointer-events-none z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Link
            to={slides[currentSlide].link}
            className="absolute inset-0 w-full h-full block cursor-pointer"
            aria-label={`View ${slides[currentSlide].name}`}
          >
            {/* Background Image with Ken Burns Effect */}
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </Link>

          {/* Dark Overlay Gradient for Editorial Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-950/45 to-transparent z-10" />

          {/* Editorial Content Overlay */}
          <div className="absolute left-4 right-4 sm:left-10 md:left-24 lg:left-32 top-1/2 -translate-y-1/2 max-w-xl text-center sm:text-left z-20 pointer-events-none">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="inline-block px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/95 text-[9px] sm:text-[10px] font-headline font-black uppercase tracking-[0.25em] mb-4 sm:mb-6"
            >
              {slides[currentSlide].tagline}
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-7xl font-headline font-black text-white uppercase tracking-tight leading-[0.95] mb-4 sm:mb-6"
            >
              {slides[currentSlide].title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
              className="text-white/80 font-body text-xs sm:text-sm md:text-base lg:text-lg mb-6 sm:mb-8 md:mb-10 max-w-md leading-relaxed mx-auto sm:mx-0"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
              className="pointer-events-auto"
            >
              <Link 
                to={slides[currentSlide].link}
                className="inline-flex items-center gap-3 bg-white text-emerald-950 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-headline font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-lime-400 hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                Experience Soap <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators (Vertical Pills) */}
      <div className="absolute right-3 sm:right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-3 md:gap-5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentSlide(index);
            }}
            className={`w-1 md:w-1.5 h-6 sm:h-8 md:h-14 rounded-full transition-all duration-500 ${
              currentSlide === index 
                ? 'bg-lime-400 h-8 sm:h-12 md:h-24 shadow-lg scale-110' 
                : 'bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;

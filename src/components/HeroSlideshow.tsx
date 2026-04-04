import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Crystalline",
    highlight: "Black Diamond",
    description: "Experience the ultimate detox. Handcrafted with activated bamboo charcoal and gemstone vibrations for a deep, purifying cellular ritual.",
    image: "/assets/Slide1.png",
    accent: "text-amber-400",
    link: "/products/the-black-diamond-soap"
  },
  {
    id: 2,
    title: "Botanical",
    highlight: "Peridot Frost",
    description: "A breath of glacial air for your skin. Infused with neem and peppermint extracts to refresh, cool, and rejuvenate your spirit.",
    image: "/assets/Slide2.png",
    accent: "text-lime-400",
    link: "/products/the-peridot-frost-soap"
  },
  {
    id: 3,
    title: "Atmospheric",
    highlight: "Lavender Glacier",
    description: "Surrender to serene hydration. A calming blend of French lavender and essential minerals that transforms every wash into a moment of mountain peace.",
    image: "/assets/Slide3.png",
    accent: "text-purple-400",
    link: "/products/the-lavender-glacier-soap"
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
    <section className="relative h-[70vh] md:h-screen min-h-[500px] sm:min-h-[600px] md:min-h-[750px] w-full overflow-hidden bg-[#022c22]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Ken Burns Effect */}
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7, ease: "linear" }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].highlight}
              className="w-full h-full object-cover opacity-70"
            />
            {/* Multi-layered Gradients for Premium Depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-transparent to-emerald-950/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/70 via-transparent to-transparent" />
          </motion.div>

          {/* Content Area */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col justify-center items-start pt-16 sm:pt-20 md:pt-0">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 md:px-5 md:py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white w-fit mb-4 sm:mb-6 md:mb-10 shadow-2xl">
                <span className="material-symbols-outlined text-amber-500 text-xs md:text-sm animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>sparkles</span>
                <span className="text-[8px] sm:text-[9px] md:text-[10px] font-headline font-extrabold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/90">HerbsEra Luxury</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-7xl lg:text-8xl font-headline font-black text-white leading-[0.95] mb-4 sm:mb-6 md:mb-8 tracking-tighter">
                {slides[currentSlide].title} <br />
                <span className={`${slides[currentSlide].accent} block mt-2 drop-shadow-[0_10px_30px_rgba(255,191,0,0.3)]`}>
                  {slides[currentSlide].highlight}
                </span>
              </h1>

              <p className="text-xs sm:text-sm md:text-xl text-stone-200 font-body max-w-xl mb-6 sm:mb-10 md:mb-12 leading-relaxed opacity-90 font-medium line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                <Link to={slides[currentSlide].link} className="group relative bg-white text-emerald-950 px-6 sm:px-8 py-3 sm:py-4 md:px-10 md:py-5 rounded-full font-headline font-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center gap-2 sm:gap-3">
                  <span className="relative z-10">Shop Collection</span>
                  <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                  <div className="absolute inset-0 bg-lime-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
                
                <Link to="/about" className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 md:px-10 md:py-5 rounded-full border border-white/30 text-white font-headline font-bold text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest backdrop-blur-md hover:bg-white/10 hover:border-white transition-all">
                  <span className="material-symbols-outlined text-sm">play_circle</span>
                  Our Story
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Persistent Brand Tagline Overlay at Bottom */}
      <div className="absolute bottom-4 sm:bottom-8 md:bottom-16 left-0 w-full flex justify-center pointer-events-none px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex items-center gap-3 sm:gap-4 md:gap-6 bg-emerald-950/40 backdrop-blur-2xl px-6 sm:px-8 py-2 sm:py-3 md:px-12 md:py-5 rounded-full border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] scale-75 sm:scale-90 md:scale-100"
        >
          <span className="text-amber-400 font-headline font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase text-[8px] sm:text-[9px] md:text-sm">Purely Herbs</span>
          <span className="text-amber-500 text-lg sm:text-xl md:text-3xl drop-shadow-2xl">🍁</span>
          <span className="text-amber-400 font-headline font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase text-[8px] sm:text-[9px] md:text-sm">Truly Yours</span>
        </motion.div>
      </div>

      {/* Slide Indicators (Vertical Pills) */}
      <div className="absolute right-3 sm:right-4 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-3 md:gap-5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-0.5 md:w-1 h-6 sm:h-8 md:h-14 rounded-full transition-all duration-700 ${
              currentSlide === index ? 'bg-amber-400 h-8 sm:h-12 md:h-24' : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator with animation */}
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 sm:bottom-12 left-6 sm:left-10 hidden lg:flex flex-col items-center gap-4 sm:gap-6"
      >
        <div className="w-[1px] h-16 sm:h-24 bg-gradient-to-b from-white to-transparent opacity-40 shadow-2xl" />
        <span className="text-[9px] text-white/40 font-headline font-bold uppercase tracking-[0.4em] [writing-mode:vertical-lr]">Scroll</span>
      </motion.div>
    </section>
  );
};

export default HeroSlideshow;

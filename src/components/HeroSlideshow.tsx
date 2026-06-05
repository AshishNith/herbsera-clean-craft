import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    name: "Amethyst Lavender",
    image: "/assets/hero-amethyst.jpg",
    link: "/products/lavender-glacier-gemstone-soap"
  },
  {
    id: 2,
    name: "Peridot Frost",
    image: "/assets/hero-mint.jpg",
    link: "/products/peridot-frost-gemstone-soap"
  },
  {
    id: 3,
    name: "Black Diamond",
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

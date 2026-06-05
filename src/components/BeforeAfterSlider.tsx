import React, { useState, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full aspect-square overflow-hidden rounded-[2rem] sm:rounded-[3rem] border border-white/20 select-none cursor-ew-resize group shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
    >
      {/* Before Image - Left Half (Mirrored Full) */}
      <img 
        src="/assets/before-full.jpg" 
        alt="Skin complexion before HerbsEra gemstone soap" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* After Image - Right Half (Mirrored Full) with Clip Path */}
      <img 
        src="/assets/after-full.jpg" 
        alt="Skin complexion after HerbsEra gemstone soap" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      />

      {/* Glassmorphic Divider Line */}
      <div 
        className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-amber-400 via-lime-400 to-amber-400 pointer-events-none z-10 shadow-[0_0_15px_rgba(163,230,53,0.6)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Floating Controller Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-950/80 border-2 border-lime-400 backdrop-blur-md shadow-[0_0_30px_rgba(163,230,53,0.3)] flex items-center justify-center transition-transform group-hover:scale-115">
          <Sparkles size={16} className="text-lime-400 animate-pulse" />
        </div>
      </div>

      {/* Labels */}
      <div 
        className="absolute bottom-6 left-6 px-3 py-1.5 rounded-full bg-emerald-950/60 backdrop-blur-md border border-white/10 text-white font-headline font-black text-[9px] uppercase tracking-widest pointer-events-none transition-opacity duration-300"
        style={{ opacity: sliderPosition < 15 ? 0.1 : 1 }}
      >
        Before
      </div>
      <div 
        className="absolute bottom-6 right-6 px-3 py-1.5 rounded-full bg-lime-400 text-emerald-950 font-headline font-black text-[9px] uppercase tracking-widest pointer-events-none shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-opacity duration-300"
        style={{ opacity: sliderPosition > 85 ? 0.1 : 1 }}
      >
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;

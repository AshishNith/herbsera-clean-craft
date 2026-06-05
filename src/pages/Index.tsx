import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, ShieldCheck, Leaf, Heart, Recycle, ShoppingBag, Instagram, X, Play } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import TrustBadge from "@/components/TrustBadge";
import HeroSlideshow from "@/components/HeroSlideshow";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HoleBackground } from "@/components/ui/hole-background";
import { getFeaturedProducts } from "@/services/productService";
import SEO from "@/components/SEO";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// Fallback high-end products if the backend is empty
const sampleProducts = [
  { _id: '1', slug: 'black-diamond-gemstone-soap', name: 'Black Diamond Gemstone Soap', benefit: 'Deep detoxification & pore refinement', price: 299, images: [{ url: '/assets/hero-charcoal.jpg' }], stock: 50 },
  { _id: '2', slug: 'peridot-frost-gemstone-soap', name: 'Peridot Frost Gemstone Soap', benefit: 'Cooling neem & peppermint cellular refresh', price: 299, images: [{ url: '/assets/hero-mint.jpg' }], stock: 45 },
  { _id: '3', slug: 'lavender-glacier-gemstone-soap', name: 'Lavender Glacier Gemstone Soap', benefit: 'Calming aromatherapy & serene hydration', price: 299, images: [{ url: '/assets/hero-amethyst.jpg' }], stock: 40 },
  { _id: '4', slug: 'rose-milk-moisturizing-soap', name: 'Rose Milk Moisturizing Soap', benefit: 'Deep moisturization & skin softening', price: 159, images: [{ url: 'https://res.cloudinary.com/dvwpxb2oa/image/upload/v1771272979/8ff40e88-cd14-458b-a362-5ab15883dc47.png' }], stock: 110 },
];

const instagramReels = [
  {
    shortcode: "DXhNkbTCcXn",
    title: "Lavender Aromatherapy",
    views: "12.4K",
    productSlug: "lavender-glacier-gemstone-soap",
    defaultProduct: sampleProducts[2], // Lavender
    coverImage: "https://wsrv.nl/?url=https://www.instagram.com/p/DXhNkbTCcXn/media/?size=l"
  },
  {
    shortcode: "DXZk0tJjMri",
    title: "Peridot Cellular Refresh",
    views: "9.8K",
    productSlug: "peridot-frost-gemstone-soap",
    defaultProduct: sampleProducts[1], // Peridot
    coverImage: "https://wsrv.nl/?url=https://www.instagram.com/p/DXZk0tJjMri/media/?size=l"
  },
  {
    shortcode: "DXT_rd9E1t4",
    title: "Black Diamond Detox",
    views: "15.1K",
    productSlug: "black-diamond-gemstone-soap",
    defaultProduct: sampleProducts[0], // Black Diamond
    coverImage: "https://wsrv.nl/?url=https://www.instagram.com/p/DXT_rd9E1t4/media/?size=l"
  },
  {
    shortcode: "DXMs7sviXAk",
    title: "Rose Milk Softening",
    views: "8.2K",
    productSlug: "rose-milk-moisturizing-soap",
    defaultProduct: sampleProducts[3], // Rose Milk
    coverImage: "https://wsrv.nl/?url=https://www.instagram.com/p/DXMs7sviXAk/media/?size=l"
  }
];

const Index = () => {
  const { addToCart } = useCart();
  const [activeReel, setActiveReel] = useState<any>(null);

  const { data: featuredData, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: getFeaturedProducts,
  });

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const featuredProducts = featuredData?.data && featuredData.data.length > 0 ? featuredData.data : sampleProducts;

  const trustSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: trustScrollY } = useScroll({
    target: trustSectionRef,
    offset: ["start start", "end end"]
  });

  const [activeTrustIndex, setActiveTrustIndex] = useState(0);

  useMotionValueEvent(trustScrollY, "change", (latest) => {
    if (latest < 0.25) {
      setActiveTrustIndex(0);
    } else if (latest < 0.58) {
      setActiveTrustIndex(1);
    } else if (latest < 0.91) {
      setActiveTrustIndex(2);
    } else {
      setActiveTrustIndex(3);
    }
  });

  // Snap curves for vertical scrolling image stack with active centering offset (120px)
  const rawTrustY = useTransform(
    trustScrollY, 
    [0, 0.22, 0.28, 0.55, 0.61, 0.88, 0.94, 1], 
    [120, 120, -272, -272, -664, -664, -1056, -1056]
  );

  // Smooth the scroll value using a spring physics simulation
  const trustY = useSpring(rawTrustY, {
    stiffness: 90,
    damping: 22,
    mass: 0.8
  });

  const scrollToStep = (index: number) => {
    if (!trustSectionRef.current) return;
    const sectionTop = trustSectionRef.current.offsetTop;
    const sectionHeight = trustSectionRef.current.offsetHeight;
    const targetScroll = sectionTop + (index * (sectionHeight - window.innerHeight) / 3);
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth"
    });
  };

  const trustBadges = [
    { 
      number: "01", 
      image: "/assets/trust-herbal.jpg", 
      icon: "eco", 
      title: "100% Herbal", 
      imageLabel: "SOURCED NATURE",
      description: "Made with pure plant-based ingredients sourced ethically from local Indian farms.", 
      glowColor: "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.25)] group-hover:border-emerald-400/30" 
    },
    { 
      number: "02", 
      image: "/assets/trust-clean.jpg", 
      icon: "potted_plant", 
      title: "No Chemicals", 
      imageLabel: "CHEMICAL FREE",
      description: "Free from parabens, sulfates, and artificial additives to preserve cellular health.", 
      glowColor: "group-hover:shadow-[0_0_50px_rgba(132,204,22,0.25)] group-hover:border-lime-400/30" 
    },
    { 
      number: "03", 
      image: "/assets/trust-derma.jpg", 
      icon: "verified", 
      title: "Dermatological", 
      imageLabel: "DERMA TESTED",
      description: "Hypoallergenic formulas tested extensively by specialists for all skin types.", 
      glowColor: "group-hover:shadow-[0_0_50px_rgba(251,191,36,0.2)] group-hover:border-amber-400/30" 
    },
    { 
      number: "04", 
      image: "/assets/trust-eco.jpg", 
      icon: "nature", 
      title: "Eco-Friendly", 
      imageLabel: "ECO CONSCIOUS",
      description: "Sustainable bamboo wood packaging, cruelty-free processes, and zero waste.", 
      glowColor: "group-hover:shadow-[0_0_50px_rgba(20,184,166,0.25)] group-hover:border-teal-400/30" 
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] selection:bg-lime-400 selection:text-emerald-950">
      <SEO 
        title="HerbsEra | Luxury Gemstone Soaps & Ayurvedic Skincare India"
        description="Experience India's first gemstone soaps by HerbsEra. Our Ayurvedic bars blend crystalline energy with botanical purity for deep detoxification and glowing skin."
        keywords="gemstone soap, luxury ayurvedic soap, natural gemstone soap india, herbsera gemstone collection, crystal infused soap"
      />
      <Header />

      <HeroSlideshow />

      <h1 className="sr-only">HerbsEra - Premium Gemstone Soaps and Natural Ayurvedic Skincare</h1>

      {/* Featured Collection - Crystalline Collection */}
      <section className="py-16 sm:py-20 md:py-40 bg-emerald-950 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-lime-400 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[180px] mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px]" />
        </div>

        {/* Giant Editorial Outline Typography in Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
          <span className="text-[14vw] font-headline font-black text-white/[0.015] uppercase tracking-[0.25em] leading-none select-none">
            Crystalline
          </span>
        </div>

        <div className="container-content relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 sm:mb-16 md:mb-24 gap-6 sm:gap-8">
            <div className="text-center md:text-left w-full md:w-auto">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/70 mb-3 sm:mb-4 block"
              >
                Crystalline Collection
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-6xl font-headline font-black text-white uppercase tracking-tighter leading-none"
              >
                Gems For <br/><span className="text-lime-400">Your Skin</span>
              </motion.h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link to="/products" className="group flex items-center gap-3 sm:gap-4 bg-white/5 border border-white/20 px-6 sm:px-8 py-3 sm:py-4 md:px-10 md:py-5 rounded-full text-white font-headline font-black text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-lime-400 hover:text-emerald-950 transition-all shadow-2xl">
                Explore Full Universe <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
            {isLoading ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse flex flex-col gap-4 sm:gap-6">
                  <div className="aspect-[4/5] bg-white/5 rounded-[2rem] sm:rounded-[3rem]"></div>
                  <div className="h-3 sm:h-4 bg-white/5 rounded full w-3/4 mx-auto"></div>
                  <div className="h-3 sm:h-4 bg-white/5 rounded full w-1/2 mx-auto"></div>
                </div>
              ))
            ) : (
              featuredProducts.slice(0, 4).map((product, index) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  slug={product.slug}
                  name={product.name}
                  benefit={product.benefit}
                  price={product.price}
                  image={product.images[0]?.url}
                  stock={product.stock}
                  delay={index * 0.1}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trust Badges - The Botanical Promise */}
      <section 
        ref={trustSectionRef} 
        className="relative h-auto md:h-[300vh] bg-stone-50 w-full overflow-hidden md:overflow-visible py-12 md:py-0"
      >
        {/* Sticky viewport container */}
        <div className="relative md:sticky md:top-0 h-auto md:h-screen w-full flex items-center overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] pointer-events-none" />
          
          <div className="container-content relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            
            {/* Left Column: Fixed Title Section & Step Indicators */}
            <div className="w-full md:w-[45%] text-center md:text-left flex-shrink-0 flex flex-col justify-between h-auto md:h-[80vh] py-4">
              
              {/* Title Header */}
              <div className="space-y-3 md:space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/70 block"
                >
                  Why Choose HerbsEra
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-black text-emerald-950 uppercase tracking-tight leading-[1.05]"
                >
                  The Botanical <br/><span className="text-emerald-900/50">Promise</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xs sm:text-sm text-stone-500 font-body leading-relaxed max-w-[340px] mx-auto md:mx-0"
                >
                  We believe in transparency, purity, and sustainable luxury. Every formulation is created with intention to honor your skin and nature.
                </motion.p>
              </div>

              {/* Vertical Step list (Desktop Only) */}
              <div className="hidden md:flex flex-col gap-6 relative pl-6 mt-8 md:mt-12 w-full max-w-[400px]">
                
                {/* Vertical background line */}
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-emerald-950/10 rounded-full" />
                
                {/* Active step moving indicator */}
                <motion.div 
                  className="absolute left-0 w-[2px] bg-emerald-800 rounded-full"
                  initial={false}
                  animate={{
                    top: `${activeTrustIndex * 25}%`,
                    height: "25%"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {trustBadges.map((badge, index) => {
                  const isActive = activeTrustIndex === index;
                  return (
                    <button
                      key={badge.title}
                      onClick={() => scrollToStep(index)}
                      className="group flex flex-col text-left focus:outline-none transition-all duration-300 w-full"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-headline font-black px-2 py-1 rounded-md border transition-all duration-300 ${
                          isActive 
                            ? "bg-emerald-950 text-white border-emerald-950 shadow-md" 
                            : "text-emerald-900/40 border-emerald-900/10 group-hover:border-emerald-900/30 group-hover:text-emerald-950"
                        }`}>
                          {badge.number}
                        </span>
                        <h4 className={`font-headline font-black text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 ${
                          isActive 
                            ? "text-emerald-950" 
                            : "text-emerald-900/40 group-hover:text-emerald-900/70"
                        }`}>
                          {badge.title}
                        </h4>
                      </div>
                      
                      {/* Smooth expanding description */}
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isActive ? "max-h-24 opacity-100 mt-2 pl-12" : "max-h-0 opacity-0 pl-12"
                      }`}>
                        <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed font-body">
                          {badge.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Scroll Indicator helper for desktop */}
              <div className="hidden md:flex items-center gap-3 text-[9px] font-headline font-bold uppercase tracking-widest text-emerald-900/40 mt-8">
                <span className="material-symbols-outlined text-xs animate-bounce">arrow_downward</span>
                Scroll to Reveal
              </div>
            </div>

            {/* Right Column: Sliding Frame on Desktop, Scroll list on Mobile */}
            <div className="w-full md:w-[50%] flex-grow flex justify-center items-center overflow-visible">
              
              {/* Mobile View: Vertical list */}
              <div className="flex flex-col gap-6 md:hidden w-full px-2 mt-6">
                {trustBadges.map((badge, index) => (
                  <div key={badge.title} className="w-full h-auto min-h-[380px]">
                    <TrustBadge
                      number={badge.number}
                      image={badge.image}
                      icon={badge.icon}
                      title={badge.title}
                      description={badge.description}
                      glowColor={badge.glowColor}
                      delay={index * 0.1}
                    />
                  </div>
                ))}
              </div>

              {/* Desktop View: Pinned Window with Vertical Scrolling Images */}
              <div className="hidden md:block w-full max-w-[420px]">
                {/* Transparent container with fade edge masking */}
                <div className="w-full h-[600px] overflow-hidden relative flex items-center justify-center">
                  
                  {/* Premium top & bottom fade overlays */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-stone-50 to-transparent pointer-events-none z-10" />
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-50 to-transparent pointer-events-none z-10" />
                  
                  {/* Sliding image track */}
                  <motion.div 
                    style={{ y: trustY }}
                    className="absolute top-0 left-0 right-0 flex flex-col gap-8 w-full"
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    {trustBadges.map((badge, index) => {
                      const isActive = activeTrustIndex === index;
                      return (
                        <motion.div 
                          key={badge.title} 
                          className="w-full h-[360px] flex-shrink-0 relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(2,44,34,0.12)] bg-stone-100"
                          animate={{
                            scale: isActive ? 1 : 0.92,
                            opacity: isActive ? 1 : 0.4
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          
                          {/* Background Image */}
                          <img 
                            src={badge.image} 
                            alt={badge.title} 
                            className="w-full h-full object-cover transition-transform duration-[4s] hover:scale-105"
                          />
                          
                          {/* Dark Gradient bottom-overlay for text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-emerald-950/20 to-transparent pointer-events-none" />
                          
                          {/* Sourced Nature style text overlay */}
                          <div className="absolute bottom-8 left-8 text-white text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] opacity-90 drop-shadow-md pointer-events-none">
                            {badge.imageLabel}
                          </div>
                          
                          {/* Floating glassmorphic badge with Material Icon */}
                          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-lg text-white font-bold drop-shadow-md">
                              {badge.icon}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>



      {/* Interactive Before & After Transformation Section */}
      <section className="py-20 sm:py-24 md:py-40 bg-emerald-950/20 relative overflow-hidden border-y border-emerald-900/10">
        {/* Subtle background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-400/5 rounded-full blur-[180px] pointer-events-none" />
        
        <div className="container-content relative z-10">
          <div className="grid md:grid-cols-12 gap-10 sm:gap-12 md:gap-20 items-center">
            
            {/* Left Column: Interactive Slider */}
            <div className="md:col-span-6 lg:col-span-6 w-full max-w-lg mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <BeforeAfterSlider />
              </motion.div>
            </div>

            {/* Right Column: Editorial storytelling */}
            <div className="md:col-span-6 lg:col-span-6 text-center md:text-left space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/70 mb-3 sm:mb-4 block"
                >
                  Visible Results
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-headline font-black text-emerald-950 uppercase tracking-tight leading-[1.05]"
                >
                  The Radiant <br/><span className="text-emerald-900/50">Transformation</span>
                </motion.h2>
              </div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base text-charcoal-light font-body leading-relaxed max-w-xl mx-auto md:mx-0"
              >
                Experience skin that doesn't just look healthy—it feels revitalized from a cellular level. HerbsEra gemstone soaps combine high-vibration minerals with Ayurvedic botanicals to deliver visible, structural improvements in skin tone, texture, and radiance within weeks.
              </motion.p>

              {/* Day Timeline details */}
              <div className="space-y-4 sm:space-y-6">
                {[
                  { day: "Day 1", title: "Cellular Detoxification", desc: "Activated charcoal and peppermint pull out toxins, reducing swelling and calming surface irritation." },
                  { day: "Day 7", title: "Pore Refinement & Calming", desc: "Neem extracts and mineral salts tighten pores, clarify blemishes, and restore moisture balance." },
                  { day: "Day 14", title: "Crystalline Glow", desc: "The micro-vibrations and rich oils leave skin deeply hydrated, perfectly symmetrical, and naturally luminous." }
                ].map((item, index) => (
                  <motion.div 
                    key={item.day}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex text-left gap-4 sm:gap-6 border-l-2 border-emerald-900/20 pl-4 sm:pl-6 focus-within:border-lime-400 group/item transition-colors"
                  >
                    <div className="text-sm font-headline font-black text-lime-600 uppercase tracking-widest min-w-[60px]">
                      {item.day}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-headline font-black text-xs sm:text-sm uppercase tracking-wider text-emerald-950 group-hover/item:text-lime-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed font-body">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story - Ancient Wisdom with Scroll Animation */}
      <section className="bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-40 left-10 w-96 h-96 bg-emerald-200 rounded-full blur-[120px]" />
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-lime-100 rounded-full blur-[120px]" />
        </div>
        
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[10px] sm:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/70 mb-4 sm:mb-6 block"
              >
                Our Sacred Origin
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-7xl font-headline font-black text-emerald-950 uppercase tracking-tighter leading-none mb-6 sm:mb-8"
              >
                Ancient <br/><span className="text-emerald-900/50">Wisdom</span>
              </motion.h2>
              <div className="max-w-2xl mx-auto px-4">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl font-body text-emerald-950/90 mb-8 leading-relaxed font-medium"
                >
                  In a world drowning in synthetic noise, HerbsEra is a sanctuary of silence and purity. We don't just make soap; we crystallize nature's healing essence.
                </motion.p>
              </div>
            </div>
          }
        >
          <div className="relative h-full w-full group">
            <img
              src="/assets/natural-ingredients.png"
              alt="HerbsEra craftsmanship"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-emerald-950/10 group-hover:bg-transparent transition-colors duration-700" />
            
            {/* Overlay content inside the animated card */}
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 bg-white/90 backdrop-blur-2xl p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/50 shadow-2xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="flex-1">
                  <p className="text-emerald-950 font-body italic text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                    "Every bar is a manifestation of crystalline purity and botanical soul."
                  </p>
                  <p className="text-sm text-emerald-900/60 font-body leading-relaxed hidden sm:block">
                    By blending gemstone vibrations with rare botanical extracts, we've created India's first gemstone soaps that detoxify both your body and spirit.
                  </p>
                </div>
                <Link to="/about" className="whitespace-nowrap group/btn flex items-center gap-3 bg-emerald-950 text-white px-8 py-4 rounded-full font-headline font-black text-[10px] uppercase tracking-widest hover:bg-lime-400 hover:text-emerald-950 transition-all">
                  Our Story <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* Instagram Reels Showcase - Follow The Ritual */}
      <section className="py-20 sm:py-24 md:py-36 bg-stone-50 overflow-hidden relative border-t border-stone-200">
        <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
          <div className="absolute top-1/2 left-[10%] w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-[15%] w-[400px] h-[400px] bg-lime-400/10 rounded-full blur-[120px]" />
        </div>

        <div className="container-content relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 sm:mb-16 gap-6">
            <div className="text-center md:text-left w-full md:w-auto">
              <span className="text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/70 mb-3 block">
                Social Ritual
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-headline font-black text-emerald-950 uppercase tracking-tight leading-[1.05]">
                Follow The <br/><span className="text-emerald-900/50">Ritual</span>
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 font-body mt-4 max-w-md mx-auto md:mx-0">
                See our crystal-infused formulations in action. Tap to watch the ritual and shop the featured products.
              </p>
            </div>

            <a
              href="https://www.instagram.com/herbseraindia/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-emerald-950 text-white px-6 py-3.5 rounded-full font-headline font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-lime-400 hover:text-emerald-950 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              <Instagram size={14} className="group-hover:rotate-12 transition-transform" />
              @herbseraindia
            </a>
          </div>

          {/* Horizontal scroll container with custom styling */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-8 pt-4 scrollbar-thin scrollbar-thumb-emerald-900/20 scrollbar-track-transparent snap-x snap-mandatory">
              {instagramReels.map((reel, index) => {
                // Find dynamic featured product or fallback to default Product mapping
                const product = featuredProducts.find((p: any) => p.slug === reel.productSlug) || reel.defaultProduct;
                return (
                  <motion.div
                    key={reel.shortcode}
                    whileHover={{ y: -6 }}
                    onClick={() => setActiveReel(reel)}
                    className="flex-shrink-0 w-[280px] sm:w-[320px] aspect-[9/16] rounded-[2rem] overflow-hidden relative cursor-pointer group shadow-[0_15px_35px_rgba(2,44,34,0.08)] border border-stone-200/50 bg-stone-100 snap-start"
                  >
                    {/* Reel Cover Image */}
                    <img 
                      src={reel.coverImage} 
                      alt={reel.title} 
                      className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

                    {/* Play Button Overlay (Centered) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                        <Play size={20} className="text-white fill-white translate-x-[2px]" />
                      </div>
                    </div>

                    {/* Content container */}
                    <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-white/15 backdrop-blur-md border border-white/10 text-white/90 text-[8px] font-headline font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Reel
                        </span>
                        <span className="text-white/60 text-[9px] font-body">
                          {reel.views} views
                        </span>
                      </div>

                      <h3 className="text-white font-headline font-black text-lg sm:text-xl uppercase tracking-tight leading-tight mb-3">
                        {reel.title}
                      </h3>

                      {/* Paired Product Info */}
                      <div className="mt-2 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <p className="text-white/50 text-[9px] font-body uppercase tracking-wider">Featured product</p>
                          <p className="text-white font-headline font-black text-[10px] sm:text-xs uppercase tracking-wide truncate max-w-[160px]">
                            {product.name}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-lime-400 flex items-center justify-center text-emerald-950 hover:bg-white transition-colors">
                          <ShoppingBag size={12} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Reel Modal Overlay */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-emerald-950/60 backdrop-blur-xl"
            onClick={() => setActiveReel(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="bg-white rounded-[2.5rem] overflow-hidden max-w-4xl w-full max-h-[90vh] md:h-[650px] shadow-[0_30px_100px_rgba(2,44,34,0.4)] border border-emerald-900/10 flex flex-col md:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveReel(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-emerald-950/80 border border-white/20 text-white flex items-center justify-center hover:bg-lime-400 hover:text-emerald-950 hover:rotate-90 transition-all shadow-lg"
              >
                <X size={16} />
              </button>

              {/* Left Side: Instagram Reel Embed Iframe */}
              <div className="w-full md:w-1/2 bg-stone-950 flex items-center justify-center relative aspect-[9/16] md:aspect-auto md:h-full overflow-hidden">
                <iframe
                  src={`https://www.instagram.com/p/${activeReel.shortcode}/embed/`}
                  className="w-full h-full border-none pointer-events-auto scale-100"
                  allowFullScreen
                  scrolling="no"
                  frameBorder="0"
                  title="Instagram Reel"
                />
              </div>

              {/* Right Side: Product Checkout & Styling */}
              <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-between h-[380px] md:h-full bg-white relative">
                {/* Background design elements */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-headline font-black uppercase tracking-[0.2em] text-emerald-900/60 block mb-2">
                      Shop The Ritual
                    </span>
                    <h3 className="text-xl sm:text-2xl font-headline font-black text-emerald-950 uppercase tracking-tight leading-tight">
                      {activeReel.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-body mt-2 leading-relaxed">
                      Transform your skin wellness with the exact crystalline formulations seen in this ritual. Handcrafted, ethically sourced, and pure.
                    </p>
                  </div>

                  {/* Product card block */}
                  {(() => {
                    const product = featuredProducts.find((p: any) => p.slug === activeReel.productSlug) || activeReel.defaultProduct;
                    const isOutOfStock = product.stock <= 0;

                    return (
                      <div className="border border-emerald-900/10 bg-emerald-50/20 rounded-2xl p-5 flex items-center gap-4 relative overflow-hidden group">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 relative">
                          <img 
                            src={product.images[0]?.url} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>
                        <div className="flex-grow min-w-0 text-left">
                          <h4 className="font-headline font-black text-xs sm:text-sm uppercase tracking-wide text-emerald-950 truncate">
                            {product.name}
                          </h4>
                          <p className="text-[10px] text-stone-500 font-body truncate mt-0.5">
                            {product.benefit}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="font-headline font-black text-xs text-emerald-900">
                              ₹{product.price}
                            </span>
                            <span className="text-[9px] font-headline uppercase tracking-wider text-emerald-900/40">
                              Free Shipping
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="space-y-3 pt-6 border-t border-stone-100">
                  {(() => {
                    const product = featuredProducts.find((p: any) => p.slug === activeReel.productSlug) || activeReel.defaultProduct;
                    const isOutOfStock = product.stock <= 0;

                    return (
                      <>
                        <button
                          onClick={() => {
                            if (!isOutOfStock) {
                              addToCart(product._id, 1, {
                                _id: product._id,
                                name: product.name,
                                price: product.price,
                                benefit: product.benefit,
                                images: product.images,
                                slug: product.slug
                              });
                              toast.success(`${product.name} added to cart!`, {
                                icon: <ShoppingBag className="h-4 w-4 text-emerald-600" />,
                                className: "bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl shadow-2xl",
                              });
                            }
                          }}
                          disabled={isOutOfStock}
                          className={`w-full py-4 rounded-full font-headline font-black text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                            isOutOfStock 
                              ? "bg-stone-200 text-stone-400 cursor-not-allowed" 
                              : "bg-emerald-950 text-white hover:bg-lime-400 hover:text-emerald-950 hover:shadow-lg hover:scale-[1.02] active:scale-95"
                          }`}
                        >
                          <ShoppingBag size={14} />
                          {isOutOfStock ? "Sold Out" : "Add Soap to Cart"}
                        </button>

                        <Link
                          to={`/product/${product.slug}`}
                          onClick={() => setActiveReel(null)}
                          className="w-full py-3.5 rounded-full font-headline font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-emerald-950 border border-emerald-950/20 flex items-center justify-center gap-2 hover:bg-stone-50 hover:border-emerald-950/60 transition-colors"
                        >
                          View Full Details
                        </Link>
                      </>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA - The Final Transformation */}
      <section className="py-16 sm:py-24 md:py-48 bg-emerald-950 relative overflow-hidden">
        {/* Cinematic background */}
        <div className="absolute inset-0">
          <img src="/assets/soap-hero.png" className="w-full h-full object-cover opacity-20 scale-110 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-emerald-950" />
        </div>
        
        <div className="container-content relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto border border-white/10 bg-white/5 backdrop-blur-[100px] px-6 sm:px-8 py-12 sm:py-16 md:p-20 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden"
          >
            <HoleBackground 
              strokeColor="rgba(16, 185, 129, 0.15)" 
              particleRGBColor={[190, 242, 100]} 
              numberOfLines={60}
              numberOfDiscs={40}
              className="z-0"
            />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-headline font-black text-white uppercase tracking-tight leading-none mb-6 sm:mb-8 md:mb-10">
                Ready&nbsp;To <br/><span className="text-lime-400">Glow?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/70 font-body mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                Join the crystalline revolution. Experience skin that doesn't just look healthy—it feels alive.
              </p>
              <Link to="/products" className="inline-flex items-center gap-3 sm:gap-4 bg-white text-emerald-950 px-8 sm:px-12 py-4 sm:py-5 md:px-16 md:py-6 rounded-full font-headline font-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] hover:bg-lime-400 hover:scale-105 active:scale-95 transition-all shadow-2xl">
                Start The Ritual <ArrowRight size={16} className="text-emerald-900" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ArrowRight, ShieldCheck, Leaf, Heart, Recycle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import TrustBadge from "@/components/TrustBadge";
import HeroSlideshow from "@/components/HeroSlideshow";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { HoleBackground } from "@/components/ui/hole-background";
import { getFeaturedProducts } from "@/services/productService";
import SEO from "@/components/SEO";

// Fallback high-end products if the backend is empty
const sampleProducts = [
  { _id: '1', slug: 'emerald-neem', name: 'Emerald Neem Jewel', benefit: 'Deep detoxification & pore refinement', price: 999, images: [{ url: '/assets/soap-hero.png' }], stock: 10 },
  { _id: '2', slug: 'amethyst-lavender', name: 'Amethyst Lavender', benefit: 'Calming aromatherapy & skin soothing', price: 1299, images: [{ url: '/assets/natural-ingredients.png' }], stock: 5 },
  { _id: '3', slug: 'ruby-rose', name: 'Ruby Rose Quartz', benefit: 'Anti-aging glow & gentle hydration', price: 1499, images: [{ url: '/assets/soap-hero.png' }], stock: 8 },
  { _id: '4', slug: 'citrine-charcoal', name: 'Citrine Charcoal', benefit: 'Deep cleansing & energetic detox', price: 1199, images: [{ url: '/assets/natural-ingredients.png' }], stock: 12 },
];

const Index = () => {
  const { data: featuredData, isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: getFeaturedProducts,
  });

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const featuredProducts = featuredData?.data && featuredData.data.length > 0 ? featuredData.data : sampleProducts;

  const trustBadges = [
    { icon: "eco", title: "100% Herbal", description: "Made with pure plant-based ingredients sourced ethically" },
    { icon: "potted_plant", title: "No Chemicals", description: "Free from parabens, sulfates, and artificial additives" },
    { icon: "verified", title: "Dermatological", description: "Gentle formulas tested for all skin types" },
    { icon: "nature", title: "Eco-Friendly", description: "Sustainable packaging and cruelty-free practices" },
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

      {/* Trust Badges - The Botanical Promise */}
      <section className="py-12 sm:py-16 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-50 opacity-20 blur-[80px] sm:blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-content relative z-10">
          <div className="text-center mb-10 sm:mb-12 md:mb-20 max-w-2xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/40 mb-3 sm:mb-4 block"
            >
              Why Choose HerbsEra
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-5xl font-headline font-black text-emerald-950 uppercase tracking-tight leading-[1.1]"
            >
              The Botanical <br/><span className="text-emerald-900/50">Promise</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {trustBadges.map((badge, index) => (
              <TrustBadge
                key={badge.title}
                icon={badge.icon}
                title={badge.title}
                description={badge.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection - Crystalline Collection */}
      <section className="py-16 sm:py-20 md:py-40 bg-emerald-950 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 sm:top-20 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 bg-lime-400 rounded-full blur-[100px] sm:blur-[150px]" />
          <div className="absolute bottom-10 sm:bottom-20 left-4 sm:left-10 w-48 sm:w-96 h-48 sm:h-96 bg-emerald-700 rounded-full blur-[100px] sm:blur-[150px]" />
        </div>

        <div className="container-content relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 md:mb-24 gap-6 sm:gap-8">
            <div className="text-left">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 mb-3 sm:mb-4 block"
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
                className="text-[10px] sm:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/40 mb-4 sm:mb-6 block"
              >
                Our Sacred Origin
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-7xl font-headline font-black text-emerald-950 uppercase tracking-tighter leading-none mb-6 sm:mb-8"
              >
                Ancient <br/><span className="text-emerald-900/30">Wisdom</span>
              </motion.h2>
              <div className="max-w-2xl mx-auto px-4">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-base sm:text-lg md:text-xl font-body text-emerald-950/70 mb-8 leading-relaxed font-medium"
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
              <h2 className="text-3xl sm:text-4xl md:text-7xl font-headline font-black text-white uppercase tracking-tighter leading-none mb-6 sm:mb-8 md:mb-10">
                Ready To <br/><span className="text-lime-400">Glow?</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/50 font-body mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
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

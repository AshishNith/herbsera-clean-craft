import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, ArrowRight, Sparkles, Droplets, Gem, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const About = () => {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const sections = [
    {
      id: "genesis",
      tag: "Our Origin",
      title: "Crystallizing a Vision",
      content: "Herbsera didn't start in a boardroom; it began in the silence of a Himalayan morning. We discovered that the vibration of raw gemstones, when harmonized with rare botanical extracts, creates a transformative energy for the skin. Our journey was to capture this fleeting purity and hold it in a single, perfect bar.",
      image: "/assets/natural-ingredients.png"
    },
    {
      id: "ritual",
      tag: "The Craft",
      title: "The Ritual of Purity",
      content: "Every HerbsEra creation is a manifestation of patience. We handcraft in small batches, allowing the cold-process saponification to occur naturally over 6 weeks. This preserves the 'soul' of the botanical oils and the crystalline structure of the gemstone infusions.",
      image: "/assets/soap-hero.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] selection:bg-lime-400 selection:text-emerald-950">
      <SEO 
        title="Our Story | The Science of Gemstone Soaps – HerbsEra"
        description="Discover the sacred origin of HerbsEra. We crystallize nature's healing essence by blending gemstone vibrations with rare botanical extracts to create India's first gemstone soaps."
        keywords="about herbsera, gemstone soap story, botanical bars origin, natural skincare brand india, artisan soap makers"
      />
      <Header />

      {/* Cinematic Hero */}
      <section className="relative h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden bg-emerald-950">
        <motion.div style={{ opacity }} className="absolute inset-0 z-0">
          <img src="/assets/soap-hero.png" className="w-full h-full object-cover opacity-30 scale-110 blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-transparent to-emerald-950" />
        </motion.div>

        <div className="container-content relative z-10 text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] sm:text-[11px] font-headline font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-lime-400 mb-6 sm:mb-8 block"
          >
            Since 2024
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-8xl lg:text-[9rem] font-headline font-black text-white leading-none uppercase tracking-tighter"
          >
            Ancient <br/><span className="text-white/30 italic">Soul</span>
          </motion.h1>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4"
        >
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 font-bold">Scroll Down</span>
          <div className="w-px h-8 sm:h-12 bg-white/20" />
        </motion.div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-48 container-content">
        <div className="max-w-4xl mx-auto px-4">
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg sm:text-2xl md:text-5xl font-body text-emerald-950 leading-tight md:leading-tight mb-16 sm:mb-20 md:mb-24 font-light text-center"
          >
            "We believe that skincare is not just about the surface—it's a <span className="font-headline font-black uppercase text-[10px] sm:text-sm tracking-widest text-emerald-900/50 align-middle mx-2 sm:mx-4">sacred ritual</span> of returning to your purest element."
          </motion.p>

          <div className="grid gap-16 sm:gap-24 md:gap-40">
            {sections.map((section, index) => (
              <div key={section.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 sm:gap-12 md:gap-32 items-center`}>
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="w-full md:w-1/2 aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl border-4 sm:border-6 md:border-8 border-white relative group"
                >
                  <img src={section.image} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-emerald-950/10 group-hover:bg-transparent transition-colors" />
                </motion.div>

                <div className="w-full md:w-1/2">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-[10px] sm:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/40 mb-4 sm:mb-6 block"
                  >
                    {section.tag}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-3xl md:text-6xl font-headline font-black text-emerald-950 uppercase tracking-tighter leading-none mb-6 sm:mb-8 md:mb-10"
                  >
                    {section.title}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm sm:text-base md:text-lg font-body text-emerald-950/70 leading-relaxed mb-8 sm:mb-10 md:mb-12"
                  >
                    {section.content}
                  </motion.p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Pillars (Values) */}
      <section className="py-16 sm:py-24 md:py-32 bg-emerald-950 text-white overflow-hidden relative">
        <div className="container-content relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none mb-3 sm:mb-4">
              Our <span className="text-lime-400">Pillars</span>
            </h2>
            <p className="text-white/40 font-headline uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[10px]">What guides us</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {[
              { icon: <Droplets className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Absolute Purity", desc: "100% plant-derived essence." },
              { icon: <Gem className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Gemstone Spirit", desc: "Energetic skin synchronization." },
              { icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Small Batch", desc: "Artisanal quality control." },
              { icon: <Heart className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Heart Crafted", desc: "Soul in every crystalline bar." },
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-colors"
              >
                <div className="mb-4 sm:mb-6 md:mb-8">{pillar.icon}</div>
                <h3 className="text-sm sm:text-base md:text-xl font-headline font-black uppercase tracking-tight mb-2 sm:mb-4">{pillar.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-emerald-800/20 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 md:py-32 lg:py-48 bg-white text-center container-content">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-headline font-black text-emerald-950 uppercase tracking-tighter leading-none mb-6 sm:mb-8 md:mb-10">
            Be Part Of The <br/><span className="text-emerald-900/30 italic">Legacy</span>
          </h2>
          <p className="text-base sm:text-xl text-emerald-950/50 mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Every choice you make for your skin is a statement of self-honor. Step into the HerbsEra.
          </p>
          <Link to="/products" className="inline-flex items-center gap-3 sm:gap-4 bg-emerald-950 text-white px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-full font-headline font-black text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] hover:bg-lime-400 hover:text-emerald-950 hover:scale-105 active:scale-95 transition-all shadow-2xl">
            View The Boutique <ArrowRight size={16} className="sm:w-[18px]" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

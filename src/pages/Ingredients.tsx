import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

interface FlagshipCardProps {
  index: number;
  number: string;
  title: string;
  description: string;
  image: string;
  label: string;
  benefit: string;
  bullets: string[];
  link: string;
  colorClass: string;
  checkColor: string;
}

const FlagshipCard = ({
  index,
  number,
  title,
  description,
  image,
  label,
  benefit,
  bullets,
  link,
  colorClass,
  checkColor,
}: FlagshipCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll of this specific card element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scale down the card as the next card stacks over it
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <div
      ref={containerRef}
      className="sticky top-28 sm:top-36 w-full h-[580px] sm:h-[550px] md:h-[500px] flex items-center justify-center mb-12"
      style={{
        transform: `translateY(${index * 12}px)`,
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full h-full bg-white rounded-[3rem] sm:rounded-[3.5rem] border border-stone-200/80 shadow-[0_30px_70px_rgba(2,44,34,0.08)] overflow-hidden flex flex-col md:flex-row items-center p-6 md:p-8 gap-6 md:gap-16 relative"
      >
        {/* Left Column: Content Details */}
        <div className="w-full md:w-[50%] text-left space-y-4 md:space-y-6 flex flex-col justify-between h-full py-2">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-4xl font-headline font-black text-emerald-950/5 select-none tracking-tighter">
                {number}
              </span>
              <span
                className={`text-[9px] font-headline font-black uppercase tracking-widest ${colorClass}`}
              >
                {benefit}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-headline font-black text-emerald-950 uppercase tracking-wide">
              {title}
            </h3>

            <p className="text-stone-600 font-body text-xs sm:text-sm leading-relaxed">
              {description}
            </p>

            {/* Checklist */}
            <div className="space-y-2 pt-4 border-t border-stone-100">
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-sm ${checkColor} font-black`}
                  >
                    check
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-headline font-black uppercase tracking-wider text-emerald-950">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link
              to={link}
              className="inline-flex items-center gap-2 text-emerald-950 font-headline font-black text-[10px] uppercase tracking-widest hover:text-lime-600 transition-colors"
            >
              Shop Infused Collection{" "}
              <span className="material-symbols-outlined text-xs">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Card */}
        <div className="w-full md:w-[50%] h-2/5 md:h-full relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden group/img">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-[3s] group-hover/img:scale-105"
          />

          {/* Translucent glass card overlay */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-[1.8rem] text-white text-left">
            <span className="text-[9px] font-headline font-black uppercase tracking-[0.25em] text-lime-300 block mb-1">
              {label}
            </span>
            <h4 className="font-headline font-black text-base uppercase tracking-wide">
              {title}
            </h4>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Ingredients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Ingredients" },
    { id: "botanicals", label: "Botanical Herbs" },
    { id: "oils", label: "Essential Oils" },
    { id: "minerals", label: "Mineral Actives" },
    { id: "gemstones", label: "Gemstone Infusions" },
  ];

  const ingredients = [
    {
      name: "Neem",
      benefit: "Antibacterial & Purifying",
      category: "botanicals",
      link: "/products/peridot-frost-gemstone-soap",
      description:
        "Known as 'Nature's Pharmacy', neem helps clear acne, fight blemishes, and calm inflamed skin.",
      gradient: "from-emerald-500/10 to-teal-500/5",
      textColor: "text-emerald-700",
      icon: "eco",
      scientific: "Azadirachta Indica",
    },
    {
      name: "Tulsi",
      benefit: "Cellular Detox & Protection",
      category: "botanicals",
      link: "/products/peridot-frost-gemstone-soap",
      description:
        "Sacred basil deeply purifies skin cells, balances sebum, and protects against environmental pollution.",
      gradient: "from-teal-500/10 to-green-500/5",
      textColor: "text-teal-700",
      icon: "potted_plant",
      scientific: "Ocimum Tenuiflorum",
    },
    {
      name: "Turmeric",
      benefit: "Brightening & Radiance",
      category: "botanicals",
      link: "/products",
      description:
        "Rich in curcumin, this ancient golden spice evens skin tone, reduces hyperpigmentation, and adds a natural glow.",
      gradient: "from-amber-500/10 to-yellow-500/5",
      textColor: "text-amber-700",
      icon: "wb_sunny",
      scientific: "Curcuma Longa",
    },
    {
      name: "Aloe Vera",
      benefit: "Hydration & Skin Repair",
      category: "botanicals",
      link: "/products/peridot-frost-gemstone-soap",
      description:
        "Deeply hydrates the dermal layers, repairs sun damage, and creates a soothing moisture seal.",
      gradient: "from-green-500/10 to-emerald-500/5",
      textColor: "text-green-700",
      icon: "spa",
      scientific: "Aloe Barbadensis",
    },
    {
      name: "Lavender",
      benefit: "Calming Aromatherapy",
      category: "oils",
      link: "/products/lavender-glacier-gemstone-soap",
      description:
        "Calms dry and itchy skin, promotes tissue regeneration, and relaxes the mind with serene aromatherapy.",
      gradient: "from-violet-500/10 to-purple-500/5",
      textColor: "text-violet-700",
      icon: "opacity",
      scientific: "Lavandula Angustifolia",
    },
    {
      name: "Rose",
      benefit: "Deep Nourishment & Anti-aging",
      category: "oils",
      link: "/products/rose-milk-moisturizing-soap",
      description:
        "Tones mature skin, minimizes redness, improves cell elasticity, and infuses deep hydration.",
      gradient: "from-rose-500/10 to-pink-500/5",
      textColor: "text-rose-700",
      icon: "local_florist",
      scientific: "Rosa Damascena",
    },
    {
      name: "Peppermint",
      benefit: "Cooling & Cellular Refresh",
      category: "oils",
      link: "/products/peridot-frost-gemstone-soap",
      description:
        "Invigorates tired cells, boosts blood circulation, and imparts a refreshing, tingling cooling sensation.",
      gradient: "from-sky-500/10 to-cyan-500/5",
      textColor: "text-sky-700",
      icon: "ac_unit",
      scientific: "Mentha Piperita",
    },
    {
      name: "Activated Charcoal",
      benefit: "Magnetic Impurity Drawing",
      category: "minerals",
      link: "/products/black-diamond-gemstone-soap",
      description:
        "Acts like a micro-magnet, pulling toxins, heavy metals, and blackheads out of deep pores.",
      gradient: "from-stone-700/10 to-stone-900/5",
      textColor: "text-stone-700",
      icon: "filter_alt",
      scientific: "Carbo Activatus",
    },
    {
      name: "Honey",
      benefit: "Natural Humectant & Enzyme Shield",
      category: "minerals",
      link: "/products/rose-milk-moisturizing-soap",
      description:
        "Rich in enzymes, raw honey acts as a natural humectant to lock in moisture and protect skin with a natural shield.",
      gradient: "from-yellow-600/10 to-amber-500/5",
      textColor: "text-amber-850",
      icon: "hive",
      scientific: "Mel",
    },
    {
      name: "Amethyst",
      benefit: "High-Vibration Harmony",
      category: "gemstones",
      link: "/products/lavender-glacier-gemstone-soap",
      description:
        "Infused crystal water calms heat in the skin, harmonizes cell frequencies, and encourages spiritual peace.",
      gradient: "from-fuchsia-500/10 to-purple-500/5",
      textColor: "text-fuchsia-700",
      icon: "diamond",
      scientific: "Amethyst Crystalline",
    },
    {
      name: "Peridot",
      benefit: "Rejuvenating Cellular Energy",
      category: "gemstones",
      link: "/products/peridot-frost-gemstone-soap",
      description:
        "Provides high-frequency green mineral vibrations to trigger cell regeneration and skin repair.",
      gradient: "from-lime-500/10 to-emerald-500/5",
      textColor: "text-lime-700",
      icon: "diamond",
      scientific: "Olivine Silicate",
    },
    {
      name: "Black Diamond",
      benefit: "Carbon Shield Purification",
      category: "gemstones",
      link: "/products/black-diamond-gemstone-soap",
      description:
        "Infuses high carbon energy, shielding skin cells against environmental pollution and heavy metal stress.",
      gradient: "from-zinc-800/10 to-zinc-950/5",
      textColor: "text-zinc-800",
      icon: "diamond",
      scientific: "Carbonado Crystal",
    },
    {
      name: "Rose Quartz",
      benefit: "Soothing Self-Love Aura",
      category: "gemstones",
      link: "/products/rose-milk-moisturizing-soap",
      description:
        "Emits a high-frequency aura of self-love, smoothing out skin texture and soothing vascular irritation.",
      gradient: "from-pink-400/10 to-rose-400/5",
      textColor: "text-pink-600",
      icon: "diamond",
      scientific: "Silicon Dioxide",
    },
  ];

  const filteredIngredients = ingredients.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.benefit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] selection:bg-lime-400 selection:text-emerald-950">
      <SEO
        title="Pure Ingredients | Botanical & Gemstone Essence – HerbsEra"
        description="Explore the natural ingredients behind our gemstone soaps. From Neem and Tulsi to Activated Charcoal and Gemstone infusions, we use only the purest botanical extracts."
        keywords="soap ingredients, natural extracts, gemstone infusions, neem tulsi soap, charcoal detox ingredients, ayurvedic herbs"
      />
      <Header />

      {/* Editorial Hero Section with Floating Image Collage */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-32 bg-stone-100 relative overflow-hidden border-b border-stone-200/30">
        {/* Decorative background glows */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-950/[0.02] rounded-full blur-[200px] pointer-events-none" />

        <div className="container-content relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Title Typography */}
            <div className="lg:col-span-6 text-left space-y-6">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/70"
              >
                True Transparency
              </motion.span>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-black text-emerald-950 uppercase tracking-tighter leading-none">
                Pure Ingredients, <br />
                <span className="text-emerald-900/50">Honest Results</span>
              </h1>

              <p className="text-stone-600 font-body text-sm sm:text-base leading-relaxed max-w-xl">
                We believe that luxury lies in purity. Every botanical root, essential seed oil, and mineral compound in our gemstone formulations is selected for its cellular skin benefits, harvested responsibly, and tested thoroughly.
              </p>

              <div className="flex gap-4">
                <a
                  href="#flagship"
                  className="inline-flex items-center gap-2 bg-emerald-950 text-white font-headline font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-full hover:bg-lime-400 hover:text-emerald-950 transition-colors shadow-lg"
                >
                  Flagship Spotlight{" "}
                  <span className="material-symbols-outlined text-xs">
                    arrow_downward
                  </span>
                </a>
                <a
                  href="#glossary"
                  className="inline-flex items-center gap-2 bg-white border border-stone-300 text-emerald-950 font-headline font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-full hover:border-emerald-950 transition-colors"
                >
                  Glossary Index
                </a>
              </div>
            </div>

            {/* Right Column: Asymmetrical collage layout */}
            <div className="lg:col-span-6 relative h-[450px] sm:h-[500px] w-full flex items-center justify-center mt-12 lg:mt-0">
              {/* Main Backing Image Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-[280px] sm:w-[320px] aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0_30px_70px_rgba(2,44,34,0.12)] border border-white/40 bg-stone-200 relative z-20 group"
              >
                <img
                  src="/assets/ingredients-showcase.jpg"
                  alt="Natural ingredients flatlay"
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Offset Overlapping Secondary Image */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="w-[180px] sm:w-[220px] aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(2,44,34,0.18)] border-4 border-stone-50 bg-stone-250 absolute bottom-4 -left-4 sm:left-4 z-30 group"
              >
                <img
                  src="/assets/natural-ingredients.png"
                  alt="Ayurvedic crafting"
                  className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105"
                />
              </motion.div>

              {/* Third Slowly Rotating Circular Accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, delay: 0.4 }}
                className="w-32 h-32 rounded-full overflow-hidden shadow-2xl border-4 border-stone-50 bg-stone-300 absolute -top-4 -right-2 sm:right-6 z-30 hidden sm:block animate-[spin_80s_linear_infinite]"
              >
                <img
                  src="/assets/trust-herbal.jpg"
                  alt="Fresh herbs"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating translucent accent label */}
              <div className="absolute top-1/2 -right-4 bg-white/40 backdrop-blur-md border border-white/50 px-4 py-2 rounded-xl text-[9px] font-headline font-black uppercase tracking-widest text-emerald-950 shadow-sm z-30 rotate-90 hidden lg:block">
                Gemstone Infused
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Formulations Scroll Stack Showcase */}
      <section id="flagship" className="py-24 bg-stone-50 relative overflow-visible">
        <div className="container-content relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-20 md:mb-32">
            <span className="text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/70 mb-4 block">
              旗艦成分
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-emerald-950 uppercase tracking-tight leading-[1.1]">
              Flagship Formulations
            </h2>
            <p className="text-stone-500 font-body text-xs sm:text-sm mt-3">
              Deep dive into the core botanicals and high-vibration crystals that power HerbsEra's signature soaps, stacking as you scroll.
            </p>
          </div>

          {/* Scroll Stacking Track */}
          <div className="relative flex flex-col items-center max-w-5xl mx-auto pb-20">
            {[
              {
                number: "01",
                title: "Amethyst & Lavender",
                description: "By infusing pure Lavender essential oils and curing each bar with raw amethyst clusters, we align Ayurvedic nourishment with energetic vibration. Lavender calms dry, inflamed skin cells while the amethyst crystalline signature radiates heat-clearing energy.",
                image: "/assets/hero-amethyst.jpg",
                label: "Crystalline Calm",
                benefit: "Calming Glacier Soap Base",
                bullets: [
                  "Reduces Skin Heat & Vascular Flushing",
                  "Promotes Sleep & Nervous System Relaxation",
                  "Natural cellular regeneration & cell repair"
                ],
                link: "/products/lavender-glacier-gemstone-soap",
                colorClass: "text-fuchsia-700",
                checkColor: "text-fuchsia-600"
              },
              {
                number: "02",
                title: "Peridot & Neem",
                description: "Formulated for heavy cellular refresh. Freshly extracted organic neem and tulsi juices provide unmatched antibacterial power to target acne, while charged olivine silicates (Peridot gemstone) trigger skin cellular repair and tone balancing.",
                image: "/assets/hero-mint.jpg",
                label: "Purifying Glow",
                benefit: "Cellular Refresh Soap Base",
                bullets: [
                  "Clears Surface Breakouts & Blemishes",
                  "Regulates Sebum & Restores Oil Equilibrium",
                  "Deeply purifies pores with cooling peppermint"
                ],
                link: "/products/peridot-frost-gemstone-soap",
                colorClass: "text-emerald-700",
                checkColor: "text-emerald-600"
              },
              {
                number: "03",
                title: "Black Diamond & Charcoal",
                description: "The ultimate skin purifier. Medicinal activated charcoal behaves like a micro-sponge to extract environmental toxins and heavy metals from deep within pores, while carbonaceous diamond frequency shields cell membranes from daily toxic stress.",
                image: "/assets/hero-charcoal-cropped.jpg",
                label: "Carbon Detox",
                benefit: "Deep Detox Soap Base",
                bullets: [
                  "Magnetic Draw for Blackheads & Toxins",
                  "Deep pore refinement & texture tightening",
                  "Carbon barrier blocks pollution attachment"
                ],
                link: "/products/black-diamond-gemstone-soap",
                colorClass: "text-stone-700",
                checkColor: "text-stone-600"
              }
            ].map((card, index) => (
              <FlagshipCard 
                key={card.title}
                index={index}
                number={card.number}
                title={card.title}
                description={card.description}
                image={card.image}
                label={card.label}
                benefit={card.benefit}
                bullets={card.bullets}
                link={card.link}
                colorClass={card.colorClass}
                checkColor={card.checkColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Controls & Grid */}
      <section id="glossary" className="py-20 sm:py-32 bg-stone-100">
        <div className="container-content">
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div className="text-left space-y-3">
              <span className="text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/70 block">
                Glossary
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black text-emerald-950 uppercase tracking-tight">
                Our Key Ingredients
              </h2>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-auto relative">
              <input
                type="text"
                placeholder="Search ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-[320px] bg-white border border-stone-200/80 rounded-full px-6 py-4 shadow-sm focus:outline-none focus:border-emerald-950 transition-all font-body text-xs text-emerald-950 placeholder-stone-400"
              />
              <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none text-lg">
                search
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-12 border-b border-stone-200/50 pb-6 overflow-x-auto scrollbar-none">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-headline font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    isSelected
                      ? "bg-emerald-950 text-white shadow-md scale-105"
                      : "bg-white border border-stone-200 text-stone-500 hover:text-emerald-950 hover:border-emerald-950/30"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Grid with layout animations and custom hover slide reveals */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredIngredients.length > 0 ? (
                filteredIngredients.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={item.name}
                    className="p-8 rounded-[2.5rem] bg-[#f5f3ef]/80 hover:bg-white border border-transparent hover:border-emerald-900/10 hover:shadow-xl transition-all duration-500 flex flex-col justify-between group overflow-hidden min-h-[300px] text-left relative"
                  >
                    {/* HSL backdrop glow on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                    />

                    {/* Sliding Card Content Wrapper */}
                    <div className="relative z-10 w-full flex-grow flex flex-col justify-between transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="w-full">
                        <div className="flex justify-between items-start mb-6">
                          {/* Custom Glassmorphic Icon Badge */}
                          <div className="w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center relative shadow-sm group-hover:scale-110 group-hover:bg-white transition-all duration-500 border border-stone-200/40">
                            <span
                              className={`material-symbols-outlined text-xl ${item.textColor}`}
                            >
                              {item.icon}
                            </span>
                          </div>

                          {/* Scientific Name Tag */}
                          <span className="text-[9px] font-headline font-black uppercase tracking-widest text-stone-400 group-hover:text-emerald-950/50 transition-colors">
                            {item.scientific}
                          </span>
                        </div>

                        <h3 className="font-headline font-black text-lg sm:text-xl uppercase tracking-wider text-emerald-950 mb-1">
                          {item.name}
                        </h3>

                        <p
                          className={`text-[9px] font-headline font-black uppercase tracking-widest ${item.textColor} mb-4`}
                        >
                          {item.benefit}
                        </p>
                      </div>

                      <p className="text-stone-500 text-xs sm:text-[13px] leading-relaxed font-body pt-4 border-t border-stone-200/50">
                        {item.description}
                      </p>
                    </div>

                    {/* Shop Button Reveal on hover at bottom */}
                    <div className="absolute bottom-6 left-8 right-8 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 text-left pt-2 border-t border-emerald-900/10">
                      <Link
                        to={item.link}
                        className={`inline-flex items-center gap-1 text-[9px] font-headline font-black uppercase tracking-widest ${item.textColor} hover:opacity-85`}
                      >
                        Shop Infused Collection{" "}
                        <span className="material-symbols-outlined text-[10px]">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-stone-400 font-body text-sm">
                  No ingredients found matching your search.
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Promise Section: Minimalist Horizontal Dividers instead of grid boxes */}
      <section className="py-24 sm:py-32 bg-stone-50 border-t border-stone-200/30">
        <div className="container-content text-left max-w-5xl mx-auto">
          <div className="space-y-3 mb-16">
            <span className="text-[10px] md:text-[11px] font-headline font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-emerald-900/70 block">
              Quality Assurance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-black uppercase tracking-tight text-emerald-950">
              Our Ingredient Promise
            </h2>
          </div>

          {/* Alternating large divider list (extremely premium) */}
          <div className="flex flex-col w-full border-t border-stone-200">
            {[
              {
                number: "01",
                title: "Ethically Sourced",
                description:
                  "All botanical extracts and mineral clays are harvested from certified Indian organic farms using fair-trade agricultural methods.",
              },
              {
                number: "02",
                title: "No Hidden Nasties",
                description:
                  "We strictly formulation audit. You will never find parabens, phthalates, SLS/SLES sulfates, artificial colorants, or synthetic fragrances.",
              },
              {
                number: "03",
                title: "Science-Backed",
                description:
                  "Every bar undergoes rigorous microbiological and testing to ensure supreme hypoallergenic efficacy on sensitive skin.",
              },
            ].map((promise, index) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={promise.title}
                className="grid md:grid-cols-12 gap-6 py-10 border-b border-stone-200 items-start group hover:bg-stone-100/30 transition-all duration-300 px-4 -mx-4"
              >
                {/* Number column */}
                <div className="md:col-span-2 text-3xl font-headline font-black text-emerald-950/20 group-hover:text-emerald-950/60 transition-colors">
                  {promise.number}
                </div>

                {/* Title column */}
                <div className="md:col-span-4 font-headline font-black text-lg uppercase tracking-wider text-emerald-950 md:pt-1">
                  {promise.title}
                </div>

                {/* Description column */}
                <div className="md:col-span-6 text-stone-500 font-body text-xs sm:text-sm leading-relaxed md:pt-1">
                  {promise.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ingredients;

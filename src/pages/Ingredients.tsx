import Header from "@/components/Header";
import Footer from "@/components/Footer";

import ingredientsHero from "@/assets/ingredients-hero.jpg";

const Ingredients = () => {
  const ingredients = [
    {
      name: "Neem",
      benefit: "Antibacterial & Anti-inflammatory",
      description:
        "Known as 'Nature's Pharmacy', neem helps fight acne, soothe irritation, and promote clear skin.",
    },
    {
      name: "Tulsi",
      benefit: "Purifying & Antioxidant-rich",
      description:
        "Sacred basil deeply cleanses pores and protects skin from environmental stressors.",
    },
    {
      name: "Turmeric",
      benefit: "Brightening & Healing",
      description:
        "Ancient golden spice that evens skin tone, reduces dark spots, and adds natural radiance.",
    },
    {
      name: "Lavender",
      benefit: "Calming & Regenerating",
      description:
        "Soothes sensitive skin, reduces redness, and promotes restful relaxation.",
    },
    {
      name: "Activated Charcoal",
      benefit: "Deep Cleansing & Detoxifying",
      description:
        "Draws out impurities, unclogs pores, and leaves skin feeling fresh and renewed.",
    },
    {
      name: "Aloe Vera",
      benefit: "Hydrating & Soothing",
      description:
        "Nature's moisturizer that heals, hydrates, and calms irritated skin.",
    },
    {
      name: "Honey",
      benefit: "Nourishing & Antibacterial",
      description:
        "Natural humectant that locks in moisture while fighting bacteria gently.",
    },
    {
      name: "Rose",
      benefit: "Anti-aging & Moisturizing",
      description:
        "Timeless flower that hydrates, tones, and adds a beautiful natural glow.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream-dark relative overflow-hidden">
        <div className="container-content relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sage font-medium tracking-widest uppercase text-sm mb-4">
                Nature's Best
              </span>
              <h1 className="heading-display text-charcoal mb-6">
                Pure Ingredients,
                <br />
                <span className="text-forest">Honest Results</span>
              </h1>
              <p className="text-body max-w-lg">
                We believe in full transparency. Every ingredient in Herbsera
                products is carefully selected for its proven benefits and
                sourced responsibly from trusted organic farms.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={ingredientsHero}
                  alt="Natural ingredients"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="section-padding">
        <div className="container-content">
          <div className="text-center mb-16">
            <h2 className="heading-section text-charcoal mb-4">
              Our Key Ingredients
            </h2>
            <p className="text-charcoal-light max-w-2xl mx-auto">
              Each ingredient is chosen for its unique skin benefits and natural
              healing properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.name}
                className="p-8 rounded-2xl bg-cream-dark hover:bg-sage-light/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-sage-light flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="font-serif text-2xl text-forest">
                    {ingredient.name[0]}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-medium text-charcoal mb-2">
                  {ingredient.name}
                </h3>
                <p className="text-forest text-sm font-medium mb-3">
                  {ingredient.benefit}
                </p>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {ingredient.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-20 bg-forest text-cream">
        <div className="container-content text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-6">
            Our Ingredient Promise
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            <div>
              <h4 className="font-serif text-xl mb-3">Ethically Sourced</h4>
              <p className="text-cream/70">
                All ingredients are sourced from certified organic farms with
                fair trade practices.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-3">No Hidden Nasties</h4>
              <p className="text-cream/70">
                We never use parabens, sulfates, artificial colors, or synthetic
                fragrances.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-xl mb-3">Science-Backed</h4>
              <p className="text-cream/70">
                Every formula is developed with dermatologists to ensure safety
                and efficacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ingredients;

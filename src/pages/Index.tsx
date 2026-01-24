import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Droplets, Shield, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import TrustBadge from "@/components/TrustBadge";

import heroBg from "@/assets/hero-bg.jpg";
import soapNeem from "@/assets/soap-neem.jpg";
import soapLavender from "@/assets/soap-lavender.jpg";
import soapTurmeric from "@/assets/soap-turmeric.jpg";
import soapCharcoal from "@/assets/soap-charcoal.jpg";

const Index = () => {
  const featuredProducts = [
    {
      id: "neem-tulsi",
      name: "Neem & Tulsi",
      benefit: "Acne Care & Clarifying",
      price: 249,
      image: soapNeem,
    },
    {
      id: "lavender-calm",
      name: "Lavender Bliss",
      benefit: "Calming & Relaxing",
      price: 279,
      image: soapLavender,
    },
    {
      id: "turmeric-glow",
      name: "Turmeric Glow",
      benefit: "Brightening & Radiance",
      price: 269,
      image: soapTurmeric,
    },
    {
      id: "charcoal-detox",
      name: "Charcoal Detox",
      benefit: "Deep Cleansing & Purifying",
      price: 289,
      image: soapCharcoal,
    },
  ];

  const trustBadges = [
    {
      icon: Leaf,
      title: "100% Herbal",
      description: "Made with pure plant-based ingredients sourced ethically",
    },
    {
      icon: Droplets,
      title: "No Harsh Chemicals",
      description: "Free from parabens, sulfates, and artificial additives",
    },
    {
      icon: Shield,
      title: "Dermatologically Safe",
      description: "Gentle formulas tested for all skin types",
    },
    {
      icon: Heart,
      title: "Eco-Friendly",
      description: "Sustainable packaging and cruelty-free practices",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Herbsera natural soaps"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/80 to-transparent" />
        </div>

        <div className="container-content relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-sage font-medium tracking-widest uppercase text-sm mb-4 animate-fade-up">
              Natural Skincare
            </span>
            <h1 className="heading-display text-charcoal mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Pure by Nature.
              <br />
              <span className="text-forest">Crafted for Your Skin.</span>
            </h1>
            <p className="text-body max-w-lg mb-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Plant-based herbal soaps made with care, science, and
              sustainability. Experience the transformative power of nature in
              your daily ritual.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" asChild>
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button variant="heroOutline" asChild>
                <Link to="/ingredients">Explore Ingredients</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-content">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <TrustBadge
                key={badge.title}
                icon={badge.icon}
                title={badge.title}
                description={badge.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-padding">
        <div className="container-content">
          <div className="text-center mb-16">
            <span className="inline-block text-sage font-medium tracking-widest uppercase text-sm mb-4">
              Our Collection
            </span>
            <h2 className="heading-section text-charcoal">
              Handcrafted with Care
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                benefit={product.benefit}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Herbsera Section */}
      <section className="section-padding bg-forest text-cream">
        <div className="container-content">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-sage font-medium tracking-widest uppercase text-sm mb-4">
                Our Story
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-cream">
                Why Herbsera?
              </h2>
              <p className="text-cream/80 text-lg leading-relaxed mb-6">
                In a world of synthetic products, we chose a different path.
                Herbsera was born from a simple belief: your skin deserves the
                purest care nature can offer.
              </p>
              <p className="text-cream/80 leading-relaxed mb-8">
                Each bar is a blend of ancient herbal wisdom and modern
                skincare science. We source our ingredients from trusted organic
                farms, ensuring every product delivers the authentic goodness of
                nature without compromise.
              </p>
              <Button
                variant="heroOutline"
                className="border-cream text-cream hover:bg-cream hover:text-forest"
                asChild
              >
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={soapNeem}
                  alt="Herbsera craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sage/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-sage-light">
        <div className="container-content text-center">
          <h2 className="heading-section text-charcoal mb-4">
            Ready to Transform Your Skincare?
          </h2>
          <p className="text-charcoal-light text-lg max-w-2xl mx-auto mb-8">
            Join thousands of happy customers who have made the switch to pure,
            natural skincare. Your skin will thank you.
          </p>
          <Button variant="hero" asChild>
            <Link to="/products">Shop the Collection</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

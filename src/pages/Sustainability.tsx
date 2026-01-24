import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, Recycle, Heart, Droplets } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Sustainability = () => {
  const initiatives = [
    {
      icon: Recycle,
      title: "Plastic-Free Packaging",
      description:
        "All our packaging is made from recycled paper and cardboard. We've eliminated single-use plastics from our entire supply chain.",
    },
    {
      icon: Leaf,
      title: "Ethical Sourcing",
      description:
        "We partner with certified organic farms that practice sustainable agriculture and fair trade principles.",
    },
    {
      icon: Heart,
      title: "Cruelty-Free Always",
      description:
        "No animal testing, ever. We're certified cruelty-free and committed to compassionate beauty practices.",
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      description:
        "Our manufacturing process uses 60% less water than conventional soap production through innovative techniques.",
    },
  ];

  const stats = [
    { number: "100%", label: "Recyclable Packaging" },
    { number: "0", label: "Single-Use Plastics" },
    { number: "50+", label: "Trees Planted Monthly" },
    { number: "100%", label: "Carbon Neutral Shipping" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-forest text-cream">
        <div className="container-content text-center max-w-4xl mx-auto">
          <span className="inline-block text-sage font-medium tracking-widest uppercase text-sm mb-4">
            Our Commitment
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-medium mb-6">
            Beauty That Gives Back
          </h1>
          <p className="text-cream/80 text-lg md:text-xl max-w-2xl mx-auto">
            Sustainability isn't just a buzzword for us—it's woven into every
            decision we make, from sourcing to shipping.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-sage-light">
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl md:text-5xl font-medium text-forest mb-2">
                  {stat.number}
                </p>
                <p className="text-charcoal-light text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="section-padding">
        <div className="container-content">
          <div className="text-center mb-16">
            <h2 className="heading-section text-charcoal mb-4">
              Our Green Initiatives
            </h2>
            <p className="text-charcoal-light max-w-2xl mx-auto">
              Every choice we make considers its impact on the planet.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((initiative) => (
              <div
                key={initiative.title}
                className="p-8 rounded-2xl bg-cream-dark hover:bg-sage-light/50 transition-all duration-300 flex gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-sage-light flex-shrink-0 flex items-center justify-center">
                  <initiative.icon className="h-8 w-8 text-forest" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-charcoal mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-charcoal-light leading-relaxed">
                    {initiative.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pledge Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-content">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-section text-charcoal mb-8">
              Our Pledge to You
            </h2>
            <div className="space-y-6 text-charcoal-light leading-relaxed text-lg">
              <p>
                We pledge to continuously improve our environmental footprint,
                support sustainable farming communities, and lead by example in
                the beauty industry.
              </p>
              <p>
                By choosing Herbsera, you're not just caring for your skin—
                you're contributing to a cleaner, greener future.
              </p>
            </div>
            <div className="mt-12">
              <Button variant="hero" asChild>
                <Link to="/products">Shop Sustainably</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sustainability;

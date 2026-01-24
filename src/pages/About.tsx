import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import soapTurmeric from "@/assets/soap-turmeric.jpg";

const About = () => {
  const values = [
    {
      title: "Purity",
      description:
        "Every ingredient is chosen for its authentic, natural benefits. No shortcuts, no synthetics.",
    },
    {
      title: "Simplicity",
      description:
        "We believe skincare should be uncomplicated. Simple formulas that truly work.",
    },
    {
      title: "Sustainability",
      description:
        "From sourcing to packaging, we make choices that honor the planet.",
    },
    {
      title: "Transparency",
      description:
        "We share everything about our ingredients, processes, and practices openly.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-cream-dark">
        <div className="container-content">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-sage font-medium tracking-widest uppercase text-sm mb-4">
              Our Story
            </span>
            <h1 className="heading-display text-charcoal mb-6">
              A New Era of
              <br />
              <span className="text-forest">Herbal Skincare</span>
            </h1>
            <p className="text-body">
              Herbsera was born from a simple belief: your skin deserves the
              purest care that nature can offer, delivered with modern elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-content">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src={soapTurmeric}
                  alt="Herbsera craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-sage/20 rounded-full blur-3xl -z-10" />
            </div>

            <div>
              <h2 className="heading-section text-charcoal mb-6">
                From Passion to Purpose
              </h2>
              <div className="space-y-6 text-charcoal-light leading-relaxed">
                <p>
                  Herbsera began as a quest to rediscover the healing power of
                  herbs. In a market flooded with synthetic products making
                  empty promises, we wanted to create something different—
                  something real.
                </p>
                <p>
                  The name Herbsera combines "Herbal" with "Era"—signifying our
                  mission to usher in a new age of clean, plant-based personal
                  care. We're not about going backwards; we're about moving
                  forward with nature.
                </p>
                <p>
                  Every bar we craft is a testament to our belief that the best
                  skincare comes from the earth, enhanced by science, and made
                  with intention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-sage-light">
        <div className="container-content">
          <div className="text-center mb-16">
            <h2 className="heading-section text-charcoal mb-4">
              What We Stand For
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <h3 className="font-serif text-2xl font-medium text-forest mb-4">
                  {value.title}
                </h3>
                <p className="text-charcoal-light leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-forest text-cream">
        <div className="container-content text-center max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl font-medium mb-8">
            Our Mission
          </h2>
          <p className="text-cream/90 text-xl md:text-2xl leading-relaxed font-light">
            "To bring the purest gifts of nature to your daily ritual, crafted
            with intention, backed by science, and delivered with care—so every
            wash becomes a moment of wellness."
          </p>
          <div className="mt-12">
            <Button
              variant="heroOutline"
              className="border-cream text-cream hover:bg-cream hover:text-forest"
              asChild
            >
              <Link to="/products">Explore Our Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

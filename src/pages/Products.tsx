import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

import soapNeem from "@/assets/soap-neem.jpg";
import soapLavender from "@/assets/soap-lavender.jpg";
import soapTurmeric from "@/assets/soap-turmeric.jpg";
import soapCharcoal from "@/assets/soap-charcoal.jpg";

const Products = () => {
  const products = [
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
    {
      id: "aloe-vera",
      name: "Aloe Vera Fresh",
      benefit: "Hydrating & Soothing",
      price: 259,
      image: soapNeem,
    },
    {
      id: "rose-petal",
      name: "Rose Petal Glow",
      benefit: "Moisturizing & Anti-aging",
      price: 299,
      image: soapLavender,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-cream-dark">
        <div className="container-content text-center">
          <span className="inline-block text-sage font-medium tracking-widest uppercase text-sm mb-4">
            Our Collection
          </span>
          <h1 className="heading-display text-charcoal mb-6">
            Handcrafted Herbal Soaps
          </h1>
          <p className="text-body max-w-2xl mx-auto">
            Each bar is thoughtfully formulated with premium botanical
            ingredients to nourish, cleanse, and revitalize your skin naturally.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-content">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
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
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-16 bg-sage-light">
        <div className="container-content text-center">
          <h2 className="heading-section text-charcoal mb-8">
            Every Herbsera Product Promises
          </h2>
          <div className="flex flex-wrap justify-center gap-8 text-charcoal-light">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest" />
              100% Natural Ingredients
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest" />
              Cruelty-Free
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest" />
              Sustainable Packaging
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-forest" />
              Handmade with Love
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;

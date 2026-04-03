import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/productService";
import { motion } from "framer-motion";

import soapNeem from "@/assets/soap-neem.jpg";

const categories = [
  { id: "all", name: "All Products", search: "" },
  { id: "green", name: "Botanical Green", search: "neem" },
  { id: "black", name: "Midnight Black", search: "charcoal" },
  { id: "white", name: "Celestial White", search: "lavender" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    category: "",
    search: currentSearch,
    sort: "-createdAt",
  });

  // Sync state with URL search params
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: currentSearch
    }));
  }, [currentSearch]);

  // Fetch products from backend
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });

  const products = data?.data || [];

  const handleCategoryChange = (search: string) => {
    if (search === "") {
      searchParams.delete("search");
    } else {
      searchParams.set("search", search);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-cream-dark">
        <div className="container-content text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-sage font-medium tracking-widest uppercase text-sm mb-4"
          >
            Our Collection
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-display text-charcoal mb-6"
          >
            Handcrafted Herbal Soaps
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-body max-w-2xl mx-auto"
          >
            Each bar is thoughtfully formulated with premium botanical
            ingredients to nourish, cleanse, and revitalize your skin naturally.
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-md border-b border-border py-4">
        <div className="container-content overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-start md:justify-center gap-4 min-w-max px-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.search)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  currentSearch === cat.search
                    ? "bg-forest text-cream shadow-md"
                    : "bg-cream-dark text-charcoal hover:bg-sage/20"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding min-h-[400px]">
        <div className="container-content text-center px-4">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16"
              >
                <div className="animate-pulse inline-block p-4 border rounded-lg bg-cream/50">
                  <p className="text-charcoal-light">Loading products...</p>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16"
              >
                <p className="text-red-600">Failed to load products.</p>
                <p className="text-sm text-charcoal-light mt-2">
                  Check your connection or try again.
                </p>
              </motion.div>
            ) : products.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-24 text-center border-2 border-dashed border-border rounded-3xl bg-cream/20"
              >
                <p className="text-xl font-serif text-charcoal mb-2">No products found</p>
                <p className="text-charcoal-light">Try adjusting your filters or browsing our other collections.</p>
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={() => handleCategoryChange("")}
                >
                  View All Products
                </Button>
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard
                      id={product._id}
                      slug={product.slug}
                      name={product.name}
                      benefit={product.benefit || product.description?.substring(0, 100)}
                      price={product.price}
                      image={product.images?.[0]?.url || soapNeem}
                      stock={product.stock}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Benefits Banner */}
      <section className="py-20 bg-forest text-cream">
        <div className="container-content text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-12">
            Every Herbsera Product Promises
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-sage">
                <Leaf size={24} />
              </div>
              <span className="font-medium">100% Natural</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-sage">
                <Heart size={24} />
              </div>
              <span className="font-medium">Cruelty-Free</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-sage">
                <Shield size={24} />
              </div>
              <span className="font-medium">Sustainable</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center text-sage">
                <Droplets size={24} />
              </div>
              <span className="font-medium">Handmade</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Required for framer-motion AnimatePresence
import { AnimatePresence } from "framer-motion";
import { Leaf, Heart, Shield, Droplets } from "lucide-react";

export default Products;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/productService";

import soapNeem from "@/assets/soap-neem.jpg";

const Products = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    category: "",
    sort: "-createdAt",
  });

  // Fetch products from backend
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
  });

  const products = data?.data || [];

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
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-charcoal-light">Loading products...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-600">Failed to load products. Using backend API.</p>
              <p className="text-sm text-charcoal-light mt-2">
                Make sure the backend server is running on http://localhost:5000
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-charcoal-light">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  slug={product.slug}
                  name={product.name}
                  benefit={product.benefit || product.description?.substring(0, 100)}
                  price={product.price}
                  image={product.images?.[0]?.url || soapNeem}
                  stock={product.stock}
                />
              ))}
            </div>
          )}
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

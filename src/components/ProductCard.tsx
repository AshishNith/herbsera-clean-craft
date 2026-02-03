import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  benefit: string;
  price: number;
  image: string;
  stock: number;
}

const ProductCard = ({ id, slug, name, benefit, price, image, stock }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(id, 1);
  };

  return (
    <div className="group card-product">
      <Link to={`/products/${slug}`}>
        <div className="relative aspect-square overflow-hidden bg-cream-dark">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-300" />
          {stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        <Link to={`/products/${slug}`}>
          <h3 className="font-serif text-xl font-medium text-charcoal mb-1 hover:text-forest transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-charcoal-light text-sm mb-3">{benefit}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-forest text-lg">₹{price}</span>
          <div className="flex gap-2">
            <Button 
              variant="soft" 
              size="sm" 
              onClick={handleAddToCart}
              disabled={stock === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/products/${slug}`}>View</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

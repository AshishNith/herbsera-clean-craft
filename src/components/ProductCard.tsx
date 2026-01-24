import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  benefit: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, benefit, price, image }: ProductCardProps) => {
  return (
    <div className="group card-product">
      <div className="relative aspect-square overflow-hidden bg-cream-dark">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/10 transition-colors duration-300" />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl font-medium text-charcoal mb-1">
          {name}
        </h3>
        <p className="text-charcoal-light text-sm mb-3">{benefit}</p>
        <div className="flex items-center justify-between">
          <span className="font-medium text-forest text-lg">₹{price}</span>
          <Button variant="soft" size="sm" asChild>
            <Link to={`/products/${id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

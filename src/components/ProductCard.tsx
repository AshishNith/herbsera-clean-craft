import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  benefit: string;
  price: number;
  image: string;
  stock: number;
  delay?: number;
}

const ProductCard = ({ id, slug, name, benefit, price, image, stock, delay = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (stock > 0) {
      addToCart(id, 1, { 
        _id: id, 
        name, 
        price, 
        benefit, 
        images: [{ url: image }],
        slug 
      });
      toast.success(`${name} added to cart!`, {
        icon: <ShoppingBag className="h-4 w-4 text-emerald-600" />,
        className: "bg-white/80 backdrop-blur-xl border border-emerald-100 rounded-2xl shadow-2xl",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full flex flex-col"
    >
      <Link to={`/products/${slug}`} className="flex-1 flex flex-col">
        {/* Cinematic Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-emerald-950/5 mb-6 md:mb-8 shadow-2xl border border-white/40 ring-1 ring-emerald-950/5 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] transition-all duration-700">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
          />
          
          {/* Subtle botanical overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Luxury Price Badge */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-xl px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white shadow-2xl scale-90 group-hover:scale-105 transition-transform duration-500">
            <span className="font-headline font-black text-[10px] md:text-xs text-emerald-950 tracking-widest">₹{price}</span>
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex gap-2 md:gap-3 w-full px-4 md:px-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-headline font-black text-[10px] uppercase tracking-widest leading-none shadow-2xl
                ${stock > 0 
                  ? 'bg-lime-400 text-emerald-950 hover:bg-white' 
                  : 'bg-stone-800 text-stone-400 cursor-not-allowed'
                } transition-all`}
            >
              <ShoppingBag size={14} strokeWidth={2.5} />
              {stock > 0 ? 'Add to Cart' : 'Sold Out'}
            </motion.button>
          </div>
        </div>

        {/* Product Details */}
        <div className="px-4 text-center group-hover:translate-y-[-8px] transition-transform duration-500">
          <h3 className="font-headline font-black text-sm uppercase tracking-[0.25em] text-emerald-950 mb-3 line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {name}
          </h3>
          <p className="text-[11px] font-bold text-emerald-900/40 uppercase tracking-widest mb-6 px-4 leading-relaxed line-clamp-2 min-h-[3rem]">
            {benefit}
          </p>
          
          <div className="inline-flex items-center gap-2 text-emerald-900/60 font-headline font-black text-[9px] uppercase tracking-[0.15em] border-b border-transparent group-hover:border-lime-400 group-hover:text-emerald-950 transition-all duration-300">
            View Experience <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingBag, User, LogOut } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/ingredients", label: "Ingredients" },
    { path: "/contact", label: "Contact" },
  ];

  const cartItemsCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
  };

  const isDarkCanvas = location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed z-[100] transition-all duration-500 inset-x-0 mx-auto
        ${isScrolled 
          ? 'top-4 w-[calc(100%-2rem)] md:w-[95%] lg:w-[90%] max-w-7xl rounded-full bg-emerald-950/95 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-white/10 py-3' 
          : `top-0 w-full py-6 ${isDarkCanvas ? 'bg-transparent' : 'bg-emerald-900 border-b border-white/5'}`
        }
      `}
    >
      <div className="relative flex justify-between items-center w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Brand Identity */}
        <Link to="/" className="flex items-center gap-3 group shrink-0 z-10">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-all">
            <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
          </div>
          <div className="text-white text-xl md:text-2xl font-headline font-black tracking-tight uppercase">Herbs<span className="text-lime-400">Era</span></div>
        </Link>
        
        {/* Desktop Navigation - Perfectly Centered using Absolute Positioning */}
        <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 gap-8 items-center bg-white/5 px-8 py-2.5 rounded-full border border-white/10 backdrop-blur-md z-0">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`font-headline font-extrabold text-[10px] tracking-[0.2em] uppercase transition-all hover:scale-110 whitespace-nowrap ${isActive(link.path) ? 'text-lime-400' : 'text-stone-300 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Global Actions */}
        <div className="flex items-center gap-3 md:gap-5 shrink-0 z-10">
          {/* Cart Button */}
          <Link 
            to="/cart" 
            className="group relative p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-lime-400/50 transition-all flex items-center justify-center"
          >
            <ShoppingBag size={20} className="text-white group-hover:text-lime-400 transition-colors" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-lime-400 text-emerald-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-2xl border-2 border-emerald-950">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* User Profile / Login */}
          <div className="hidden xl:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 overflow-hidden hover:scale-110 transition-transform ring-2 ring-transparent hover:ring-lime-400/30">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-emerald-800 flex items-center justify-center">
                        <User size={18} className="text-white" />
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 mt-4 bg-emerald-950/98 border border-white/10 text-white backdrop-blur-2xl rounded-3xl p-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                  <div className="px-4 py-5 mb-2 border-b border-white/5">
                    <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold mb-1">Authenticated</p>
                    <p className="text-sm font-headline font-bold truncate">{user.email || "HerbsEra Member"}</p>
                  </div>
                  <DropdownMenuItem className="hover:bg-white/10 cursor-pointer py-4 rounded-2xl transition-colors font-headline font-bold text-[10px] uppercase tracking-widest" onClick={() => navigate('/profile')}>
                    Personal Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/10 cursor-pointer py-4 rounded-2xl transition-colors font-headline font-bold text-[10px] uppercase tracking-widest" onClick={() => navigate('/orders')}>
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10 mx-2 my-1" />
                  <DropdownMenuItem className="hover:bg-red-500/20 cursor-pointer py-4 rounded-2xl transition-colors text-red-400 font-headline font-bold text-[10px] uppercase tracking-widest" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Secure Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="bg-white text-emerald-950 px-8 py-3.5 rounded-full font-headline font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 hover:bg-lime-400 active:opacity-80 transition-all shadow-2xl">
                Login / Join
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu} 
            className="xl:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all active:scale-90"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Luxury Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden w-full overflow-hidden bg-emerald-950/98 backdrop-blur-3xl border-t border-white/5 shadow-2xl"
          >
            <div className="px-8 pb-12 pt-8 flex flex-col gap-8 text-left">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.path} 
                    onClick={toggleMenu}
                    className={`font-headline font-black text-3xl uppercase tracking-[0.2em] transition-all flex items-center gap-4 ${isActive(link.path) ? 'text-lime-400' : 'text-stone-300'}`}
                  >
                    <span className="text-[10px] text-white/20 font-black">0{i+1}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4 mt-8"
              >
                {!user ? (
                  <Link 
                    to="/login" 
                    onClick={toggleMenu} 
                    className="bg-lime-400 text-emerald-950 py-6 rounded-3xl font-headline font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-lime-400/20 text-center active:scale-95 transition-all"
                  >
                    Login / Join
                  </Link>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link to="/profile" onClick={toggleMenu} className="bg-white/10 py-5 rounded-2xl text-white font-headline font-bold text-xs uppercase tracking-[0.2em] border border-white/10 text-center">My Profile</Link>
                    <button onClick={handleLogout} className="bg-red-500/20 py-5 rounded-2xl text-red-100 font-headline font-bold text-xs uppercase tracking-[0.2em] border border-red-500/20 text-center">Logout</button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

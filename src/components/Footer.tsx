import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "Gemstone Collection", path: "/products" },
      { label: "Botanical Bars", path: "/products" },
      { label: "Gift Sets", path: "/products" },
      { label: "New Arrivals", path: "/products" },
    ],
    company: [
      { label: "Our Story", path: "/about" },
      { label: "Ingredients", path: "/ingredients" },
      { label: "Sustainability", path: "/sustainability" },
      { label: "Journal", path: "/" },
    ],
    support: [
      { label: "Contact", path: "/contact" },
      { label: "Shipping", path: "/contact" },
      { label: "Returns", path: "/contact" },
      { label: "FAQ", path: "/contact" },
    ],
  };

  return (
    <footer className="bg-emerald-950 text-white pt-16 sm:pt-24 pb-8 sm:pb-12 overflow-hidden relative">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-lime-400 opacity-5 blur-[100px] sm:blur-[150px] -translate-x-1/4 translate-y-1/4" />
      
      <div className="container-content relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 mb-12 sm:mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 group">
              <span className="material-symbols-outlined text-amber-500 text-2xl sm:text-3xl group-hover:rotate-12 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              <div className="text-xl sm:text-2xl font-headline font-black tracking-tight uppercase">Herbs<span className="text-lime-400">Era</span></div>
            </Link>
            <p className="text-white/50 font-body leading-relaxed mb-8 sm:mb-10 max-w-sm text-sm sm:text-base">
              Crystallizing nature's healing essence into luxurious rituals. India's first gemstone soaps, crafted for the conscious soul.
            </p>
            <div className="flex gap-4 sm:gap-5">
              {[Instagram, Facebook, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-lime-400 hover:text-emerald-950 hover:border-lime-400 transition-all duration-300"
                >
                  <Icon size={16} className="sm:w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="sm:col-span-1 lg:col-span-2">
            <h4 className="font-headline font-black text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/30 mb-6 sm:mb-8">Shop</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-lime-400 transition-all mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-1 lg:col-span-2">
            <h4 className="font-headline font-black text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/30 mb-6 sm:mb-8">Company</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-lime-400 transition-all mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="font-headline font-black text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/30 mb-6 sm:mb-8">Support</h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm font-medium text-white/60 hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-lime-400 transition-all mr-0 group-hover:mr-2" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="font-headline font-black text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em] text-white/30 mb-6 sm:mb-8">The Circle</h4>
            <p className="text-xs sm:text-sm text-white/40 leading-relaxed mb-4 sm:mb-6">Join our inner circle for exclusive rituals and arrivals.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 sm:py-4 px-4 sm:px-6 text-sm focus:outline-none focus:border-lime-400/50 transition-colors"
              />
              <button className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-full flex items-center justify-center text-emerald-950 hover:bg-lime-400 transition-colors">
                <ArrowRight size={14} className="sm:w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 sm:pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
          <p className="text-[10px] font-headline font-bold text-white/20 uppercase tracking-[0.25em] sm:tracking-[0.3em]">
            © {currentYear} Herbsera luxury. Crafted with soul.
          </p>
          <div className="flex gap-6 sm:gap-10">
            <Link to="/privacy" className="text-[10px] font-headline font-bold text-white/20 uppercase tracking-[0.25em] sm:tracking-[0.3em] hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-[10px] font-headline font-bold text-white/20 uppercase tracking-[0.25em] sm:tracking-[0.3em] hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

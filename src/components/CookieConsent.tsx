import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "./ui/button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const consent = localStorage.getItem("herbsera_cookie_consent");
    if (!consent) {
      // Show consent banner after a short delay for smoother entrance
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("herbsera_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("herbsera_cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-[200]"
        >
          <div className="bg-[#022c22]/90 backdrop-blur-2xl border border-white/15 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-left relative overflow-hidden group">
            {/* Decorative background glow */}
            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-lime-400 opacity-10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-lime-400 shrink-0">
                <Cookie size={20} className="animate-pulse" />
              </div>
              <div className="space-y-3 flex-1">
                <h4 className="font-headline font-black text-xs uppercase tracking-widest text-white">Botanical Cookies</h4>
                <p className="text-xs text-stone-300 font-body leading-relaxed">
                  We use cookies to refine your skincare ritual, remember your cart, and analyze our boutique traffic. By continuing to explore HerbsEra, you agree to our use of cookies.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    onClick={handleAccept}
                    className="bg-lime-400 hover:bg-white text-emerald-950 text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-full h-auto"
                  >
                    Accept Ritual
                  </Button>
                  <Button
                    onClick={handleDecline}
                    variant="outline"
                    className="bg-transparent border-white/15 text-white hover:bg-white/5 hover:text-white text-[9px] font-headline font-black uppercase tracking-widest px-4 py-2.5 rounded-full h-auto"
                  >
                    Decline
                  </Button>
                  <Link
                    to="/privacy"
                    className="text-[9px] font-headline font-black uppercase tracking-widest text-stone-400 hover:text-white transition-colors flex items-center pl-1"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;

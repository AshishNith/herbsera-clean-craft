import { motion } from "framer-motion";

interface TrustBadgeProps {
  icon: string; // Using Material Symbol name
  title: string;
  description: string;
  delay?: number;
}

const TrustBadge = ({ icon, title, description, delay = 0 }: TrustBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="p-1 group h-full"
    >
      <div className="bg-white/40 backdrop-blur-xl border border-white/60 p-8 rounded-[2.5rem] h-full flex flex-col items-center text-center transition-all duration-500 group-hover:bg-white/60 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] group-hover:border-white shadow-sm">
        <div className="w-20 h-20 rounded-full bg-emerald-950/5 flex items-center justify-center mb-8 relative group-hover:scale-110 transition-transform duration-500">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-900/10 animate-[spin_20s_linear_infinite]" />
          <span className="material-symbols-outlined text-4xl text-emerald-900 drop-shadow-sm group-hover:scale-110 transition-transform">
            {icon}
          </span>
        </div>
        
        <h4 className="font-headline font-black text-xs uppercase tracking-[0.25em] text-emerald-950 mb-3">
          {title}
        </h4>
        
        <p className="text-emerald-900/60 text-sm font-medium leading-relaxed max-w-[200px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default TrustBadge;

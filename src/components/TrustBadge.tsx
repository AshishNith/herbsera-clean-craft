import { motion } from "framer-motion";

interface TrustBadgeProps {
  number: string;
  image: string;
  icon: string; // Using Material Symbol name
  title: string;
  description: string;
  glowColor: string; // e.g., 'group-hover:shadow-[0_0_50px_rgba(16,185,129,0.2)]'
  delay?: number;
}

const TrustBadge = ({ number, image, icon, title, description, glowColor, delay = 0 }: TrustBadgeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="p-2 group h-full flex-shrink-0 relative w-full"
    >
      <div className={`bg-white/40 backdrop-blur-xl border border-white/60 p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] h-full w-full flex flex-col justify-between items-start text-left transition-all duration-500 group-hover:bg-white/70 group-hover:border-white shadow-sm overflow-hidden ${glowColor}`}>
        
        {/* Large Decorative Number Outline in Background */}
        <span className="absolute right-6 bottom-4 text-[7rem] sm:text-[8rem] font-headline font-black text-emerald-950/[0.04] select-none pointer-events-none tracking-tighter leading-none group-hover:text-emerald-950/[0.08] transition-colors duration-500">
          {number}
        </span>

        <div className="w-full">
          {/* Editorial Card Header Image */}
          <div className="relative w-full h-36 sm:h-44 overflow-hidden rounded-[1.8rem] mb-6 shadow-md border border-white/20">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            {/* Floating Icon Wrapper */}
            <div className="w-12 h-12 rounded-full bg-emerald-950/5 flex items-center justify-center relative group-hover:scale-110 group-hover:bg-emerald-950/10 transition-all duration-500">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-900/10 animate-[spin_30s_linear_infinite]" />
              <span className="material-symbols-outlined text-xl text-emerald-900 drop-shadow-sm transition-transform duration-500 group-hover:rotate-12">
                {icon}
              </span>
            </div>
            
            <h4 className="font-headline font-black text-xs sm:text-sm uppercase tracking-[0.2em] text-emerald-950 leading-tight">
              {title}
            </h4>
          </div>
        </div>
        
        <p className="text-emerald-900/75 text-[11px] sm:text-xs font-medium leading-relaxed max-w-[280px] relative z-10 pt-3 border-t border-emerald-900/5 w-full">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default TrustBadge;

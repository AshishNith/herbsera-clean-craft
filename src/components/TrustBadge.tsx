import { LucideIcon } from "lucide-react";

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const TrustBadge = ({ icon: Icon, title, description }: TrustBadgeProps) => {
  return (
    <div className="trust-badge">
      <div className="w-14 h-14 rounded-full bg-sage-light flex items-center justify-center mb-4">
        <Icon className="h-7 w-7 text-forest" />
      </div>
      <h4 className="font-serif text-lg font-medium text-charcoal mb-2">
        {title}
      </h4>
      <p className="text-charcoal-light text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default TrustBadge;

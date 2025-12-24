import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  onClick?: () => void;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0, onClick }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 cursor-pointer",
        "bg-gradient-to-br from-primary/10 via-secondary/10 to-card",
        "border border-border/50 shadow-soft",
        "hover:shadow-card hover:border-primary/30 transition-all duration-300"
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Icon container */}
      <motion.div
        whileHover={{ rotate: 5 }}
        className="relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-xl gradient-button shadow-button mb-4"
      >
        <Icon className="text-primary-foreground" size={28} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />
    </motion.div>
  );
}

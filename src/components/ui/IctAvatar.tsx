import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Camera, User } from "lucide-react";

interface IctAvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  editable?: boolean;
  onEdit?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
  xl: "h-32 w-32",
};

const iconSizes = {
  sm: 16,
  md: 24,
  lg: 36,
  xl: 48,
};

export function IctAvatar({ className, src, alt = "User avatar", size = "md", editable, onEdit }: IctAvatarProps) {
  return (
    <motion.div
      whileHover={editable ? { scale: 1.05 } : undefined}
      className={cn(
        "relative rounded-full overflow-hidden gradient-button shadow-card",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
          <User size={iconSizes[size]} className="text-primary-foreground" />
        </div>
      )}
      
      {editable && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="absolute inset-0 flex items-center justify-center bg-foreground/40 opacity-0 hover:opacity-100 transition-opacity duration-300"
          aria-label="Change avatar"
        >
          <Camera className="text-primary-foreground" size={iconSizes[size] * 0.6} />
        </motion.button>
      )}
    </motion.div>
  );
}

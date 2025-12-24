import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IctCardProps {
  variant?: "default" | "gradient" | "elevated";
  hover?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function IctCard({ className, variant = "default", hover = true, children }: IctCardProps) {
  const variants = {
    default: "bg-card border border-border",
    gradient: "gradient-card border border-border/50",
    elevated: "bg-card shadow-card border border-border/30",
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variants[variant],
        hover && "hover:shadow-card cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface IctCardHeaderProps {
  className?: string;
  children?: React.ReactNode;
}

export function IctCardHeader({ className, children }: IctCardHeaderProps) {
  return <div className={cn("flex flex-col space-y-2", className)}>{children}</div>;
}

interface IctCardTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export function IctCardTitle({ className, children }: IctCardTitleProps) {
  return (
    <h3 className={cn("text-xl font-bold text-foreground", className)}>
      {children}
    </h3>
  );
}

interface IctCardDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export function IctCardDescription({ className, children }: IctCardDescriptionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </p>
  );
}

interface IctCardContentProps {
  className?: string;
  children?: React.ReactNode;
}

export function IctCardContent({ className, children }: IctCardContentProps) {
  return <div className={cn("pt-4", className)}>{children}</div>;
}

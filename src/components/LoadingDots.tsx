import { motion } from "framer-motion";

interface LoadingDotsProps {
  color?: "primary" | "white";
}

export function LoadingDots({ color = "primary" }: LoadingDotsProps) {
  const dotClass = color === "white" 
    ? "bg-primary-foreground" 
    : "bg-primary";

  return (
    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className={`w-3 h-3 rounded-full ${dotClass}`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  );
}

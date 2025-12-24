import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface IctInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  showPasswordToggle?: boolean;
}

const IctInput = React.forwardRef<HTMLInputElement, IctInputProps>(
  ({ className, type, icon, error, showPasswordToggle, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="w-full space-y-1.5">
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              "flex h-14 w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base font-medium transition-all duration-300",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-12",
              (isPassword && showPasswordToggle) && "pr-12",
              error && "border-destructive focus:border-destructive focus:ring-destructive/20",
              className
            )}
            ref={ref}
            {...props}
          />
          {isPassword && showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-destructive font-medium animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);
IctInput.displayName = "IctInput";

export { IctInput };

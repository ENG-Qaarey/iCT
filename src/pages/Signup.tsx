import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { IctButton } from "@/components/ui/IctButton";
import { IctInput } from "@/components/ui/IctInput";
import logo from "@/assets/ict-girls-logo.png";
import { useUser } from "@/hooks/use-user";
import { registerUser } from "@/lib/auth";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setFormError("");
    setIsLoading(true);
    
    try {
      const account = await registerUser(name, email, password);
      setUser({ name: account.name, email: account.email, avatar: account.avatar });
      navigate("/home");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to sign up.";
      setFormError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-4 py-8">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-56 h-56 rounded-full bg-secondary/15 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-primary/5 blur-2xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center mb-6"
        >
          <img
            src={logo}
            alt="ICT Girls Logo"
            className="w-16 h-16 object-contain mb-3"
          />
          <h1 className="text-3xl font-bold text-gradient mb-2">Join ICT Girls</h1>
          <p className="text-muted-foreground text-center">
            Start your journey in technology today
          </p>
        </motion.div>

        {/* Signup Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-card/80 backdrop-blur-lg rounded-3xl shadow-card border border-border/50 p-8"
        >
          {formError && (
            <div
              role="alert"
              className="mb-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-destructive"
            >
              {formError}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <IctInput
                id="name"
                type="text"
                placeholder="Enter your name"
                icon={<User size={20} />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <IctInput
                id="email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={20} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <IctInput
                id="password"
                type="password"
                placeholder="Create a password"
                icon={<Lock size={20} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                showPasswordToggle
                aria-describedby={errors.password ? "password-error" : undefined}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <IctInput
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                icon={<Lock size={20} />}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                showPasswordToggle
                aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              />
            </div>

            <div className="pt-2">
              <IctButton
                type="submit"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Create Account
              </IctButton>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:text-accent font-semibold transition-colors duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Bottom message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          By signing up, you agree to our Terms of Service ✨
        </motion.p>
      </motion.div>
    </div>
  );
}

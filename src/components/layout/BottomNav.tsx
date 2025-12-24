import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LayoutDashboard, User, Mail, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/contact", label: "Contact", icon: Mail },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="mx-4 mb-4">
        <div className="bg-card/95 backdrop-blur-lg rounded-2xl shadow-card border border-border/50 px-2 py-3">
          <ul className="flex items-center justify-around">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className="relative flex flex-col items-center gap-1 px-3 py-1"
                    aria-label={item.label}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 gradient-button rounded-xl"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <Icon
                      size={22}
                      className={cn(
                        "relative z-10 transition-colors duration-200",
                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                      )}
                    />
                    <span
                      className={cn(
                        "relative z-10 text-[10px] font-medium transition-colors duration-200",
                        isActive ? "text-primary-foreground" : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

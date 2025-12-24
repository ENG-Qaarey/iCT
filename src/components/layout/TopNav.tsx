import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, LayoutDashboard, User, Mail, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/ict-girls-logo.png";

const navItems = [
  { path: "/home", label: "Home", icon: Home },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/contact", label: "Contact", icon: Mail },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function TopNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="hidden lg:block fixed top-0 left-0 right-0 z-50">
      <div className="mx-6 mt-4">
        <nav className="bg-card/95 backdrop-blur-lg rounded-2xl shadow-card border border-border/50 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/home" className="flex items-center gap-3">
              <img src={logo} alt="ICT Girls" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gradient">ICT Girls</span>
            </NavLink>

            {/* Navigation Links */}
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="relative flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200"
                      aria-label={item.label}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabDesktop"
                          className="absolute inset-0 gradient-button rounded-xl"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <Icon
                        size={18}
                        className={cn(
                          "relative z-10 transition-colors duration-200",
                          isActive ? "text-primary-foreground" : "text-muted-foreground"
                        )}
                      />
                      <span
                        className={cn(
                          "relative z-10 text-sm font-medium transition-colors duration-200",
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

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
              aria-label="Logout"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </motion.button>
          </div>
        </nav>
      </div>
    </header>
  );
}

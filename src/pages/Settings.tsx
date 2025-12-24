import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Lock, Eye, Globe, Palette, HelpCircle, LogOut, ChevronRight, Shield, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";

interface SettingItem {
  icon: React.ElementType;
  title: string;
  description: string;
  action?: "toggle" | "link" | "danger" | "theme";
  enabled?: boolean;
}

const settingsSections = [
  {
    title: "Preferences",
    items: [
      {
        icon: Bell,
        title: "Push Notifications",
        description: "Receive updates about courses and community",
        action: "toggle" as const,
        enabled: true,
      },
      {
        icon: Globe,
        title: "Language",
        description: "English (US)",
        action: "link" as const,
      },
      {
        icon: Palette,
        title: "Appearance",
        description: "Light / Dark",
        action: "theme" as const,
      },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      {
        icon: Lock,
        title: "Change Password",
        description: "Update your account password",
        action: "link" as const,
      },
      {
        icon: Eye,
        title: "Profile Visibility",
        description: "Control who can see your profile",
        action: "link" as const,
      },
      {
        icon: Shield,
        title: "Two-Factor Authentication",
        description: "Add an extra layer of security",
        action: "toggle" as const,
        enabled: false,
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        icon: HelpCircle,
        title: "Help Center",
        description: "Get answers to common questions",
        action: "link" as const,
      },
    ],
  },
];

export default function Settings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    "Push Notifications": true,
    "Two-Factor Authentication": false,
  });

  const handleToggle = (title: string) => {
    setToggleStates((prev) => {
      const newState = { ...prev, [title]: !prev[title] };
      toast({
        title: `${title} ${newState[title] ? "enabled" : "disabled"}`,
        description: `You've ${newState[title] ? "enabled" : "disabled"} ${title.toLowerCase()}.`,
      });
      return newState;
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
          className="bg-card rounded-3xl shadow-soft border border-border/50 overflow-hidden"
        >
          <h2 className="text-lg font-bold text-foreground px-6 py-4 border-b border-border/50 bg-muted/30">
            {section.title}
          </h2>
          <div className="divide-y divide-border/50">
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              const isTheme = item.action === "theme";
              const isEnabled = isTheme ? theme === "dark" : toggleStates[item.title] ?? item.enabled;

              return (
                <motion.button
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: sectionIndex * 0.1 + itemIndex * 0.05 }}
                  onClick={() => {
                    if (item.action === "toggle") handleToggle(item.title);
                    if (item.action === "theme") toggleTheme();
                  }}
                  className="w-full flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {isTheme ? (
                      theme === "dark" ? <Moon className="text-primary" size={22} /> : <Sun className="text-primary" size={22} />
                    ) : (
                      <Icon className="text-primary" size={22} />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {isTheme ? (theme === "dark" ? "Dark mode" : "Light mode") : item.description}
                    </p>
                  </div>
                  {item.action === "toggle" || item.action === "theme" ? (
                    <div
                      className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-300 ${
                        isEnabled ? "gradient-button" : "bg-muted"
                      }`}
                    >
                      <motion.div
                        animate={{ x: isEnabled ? 20 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-6 h-6 rounded-full bg-card shadow-sm"
                      />
                    </div>
                  ) : (
                    <ChevronRight className="text-muted-foreground" size={20} />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 p-5 bg-card rounded-3xl shadow-soft border border-destructive/20 hover:bg-destructive/5 transition-colors duration-200"
        >
          <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center">
            <LogOut className="text-destructive" size={22} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-semibold text-destructive">Log Out</p>
            <p className="text-sm text-muted-foreground">Sign out of your account</p>
          </div>
          <ChevronRight className="text-destructive/60" size={20} />
        </button>
      </motion.div>

      {/* Version Info */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground pb-8"
      >
        ICT Girls App v1.0.0
      </motion.p>
    </div>
  );
}

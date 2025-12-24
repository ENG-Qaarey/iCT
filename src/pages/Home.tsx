import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, User, Settings, Sparkles, TrendingUp, Users } from "lucide-react";
import { IctAvatar } from "@/components/ui/IctAvatar";
import { FeatureCard } from "@/components/FeatureCard";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Track your progress and see your learning journey at a glance.",
    path: "/dashboard",
  },
  {
    icon: User,
    title: "Profile",
    description: "Customize your profile and showcase your achievements.",
    path: "/profile",
  },
  {
    icon: Settings,
    title: "Settings",
    description: "Manage your account preferences and notifications.",
    path: "/settings",
  },
];

const stats = [
  { icon: Users, label: "Community Members", value: "10K+" },
  { icon: Sparkles, label: "Projects Completed", value: "5K+" },
  { icon: TrendingUp, label: "Skills Learned", value: "200+" },
];

export default function Home() {
  const navigate = useNavigate();
  const userName = "Sarah"; // This would come from auth context in a real app

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl gradient-button p-8 shadow-card"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90" />
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <IctAvatar size="xl" editable onEdit={() => console.log("Edit avatar")} />
          
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
              Welcome back 👋
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-primary-foreground/90">
              {userName}
            </p>
            <p className="text-primary-foreground/70 mt-2">
              Ready to continue your tech journey?
            </p>
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-3 gap-4"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="bg-card rounded-2xl p-4 md:p-6 shadow-soft border border-border/50 text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 mb-3">
                <Icon className="text-primary" size={20} />
              </div>
              <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </motion.section>

      {/* Feature Cards */}
      <section>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-2xl font-bold text-foreground mb-6"
        >
          Quick Actions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.4 + index * 0.1}
              onClick={() => navigate(feature.path)}
            />
          ))}
        </div>
      </section>

      {/* Motivational Callout */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-gradient-to-r from-muted to-card rounded-3xl p-8 border border-border/50 shadow-soft"
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl gradient-button flex items-center justify-center shadow-button">
            <Sparkles className="text-primary-foreground" size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground mb-1">
              Did you know?
            </h3>
            <p className="text-muted-foreground">
              Women in tech are reshaping the future! Keep learning, keep growing, and inspire others on your journey.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

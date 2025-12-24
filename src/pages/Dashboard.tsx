import { motion } from "framer-motion";
import { BookOpen, Award, Clock, Target, TrendingUp, CheckCircle } from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";

const dashboardStats = [
  { icon: BookOpen, label: "Courses Enrolled", value: "12", trend: "+3 this month" },
  { icon: Award, label: "Certificates Earned", value: "5", trend: "+1 this week" },
  { icon: Clock, label: "Learning Hours", value: "48h", trend: "+8h this week" },
  { icon: Target, label: "Goals Completed", value: "8", trend: "+2 this month" },
];

const recentActivity = [
  { title: "Completed Python Basics", time: "2 hours ago", icon: CheckCircle },
  { title: "Started Web Development", time: "Yesterday", icon: BookOpen },
  { title: "Earned JavaScript Badge", time: "3 days ago", icon: Award },
];

const upcomingGoals = [
  { title: "Complete React Course", progress: 75 },
  { title: "Build Portfolio Project", progress: 40 },
  { title: "Learn Cloud Computing", progress: 20 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Your Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your learning progress and achievements
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-5 shadow-soft border border-border/50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="text-primary" size={22} />
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp size={12} />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-card rounded-3xl shadow-soft border border-border/50 p-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg gradient-button flex items-center justify-center shadow-sm">
                    <Icon className="text-primary-foreground" size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Progress Goals */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-card rounded-3xl shadow-soft border border-border/50 p-6"
        >
          <h2 className="text-xl font-bold text-foreground mb-5">Current Goals</h2>
          <div className="space-y-5">
            {upcomingGoals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-foreground">{goal.title}</p>
                  <span className="text-sm font-semibold text-primary">{goal.progress}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                    className="h-full gradient-button rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-foreground mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={BookOpen}
            title="Web Development"
            description="Continue building responsive websites with HTML, CSS, and JavaScript."
            delay={0.9}
          />
          <FeatureCard
            icon={Award}
            title="Python Programming"
            description="Master programming fundamentals and build real-world applications."
            delay={1.0}
          />
          <FeatureCard
            icon={Target}
            title="Data Science"
            description="Learn to analyze data and create insights using modern tools."
            delay={1.1}
          />
        </div>
      </motion.section>
    </div>
  );
}

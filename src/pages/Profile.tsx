import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Mail, Phone, MapPin, Calendar, Edit2, Save } from "lucide-react";
import { IctAvatar } from "@/components/ui/IctAvatar";
import { IctButton } from "@/components/ui/IctButton";
import { IctInput } from "@/components/ui/IctInput";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  joinDate: string;
}

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [profile, setProfile] = useState<UserProfile>({
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate about technology and empowering others. Currently learning web development and data science. Love building projects that make a difference!",
    joinDate: "January 2024",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleChange = (field: keyof UserProfile) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const skills = ["Python", "JavaScript", "React", "Data Analysis", "UI/UX Design"];
  const achievements = [
    { title: "Quick Learner", description: "Completed 5 courses in first month" },
    { title: "Code Master", description: "Submitted 50+ coding exercises" },
    { title: "Community Star", description: "Helped 10+ members" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your personal information and preferences
          </p>
        </div>
        <IctButton
          variant={isEditing ? "default" : "outline"}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          isLoading={isSaving}
        >
          {isEditing ? (
            <>
              <Save size={18} />
              Save
            </>
          ) : (
            <>
              <Edit2 size={18} />
              Edit
            </>
          )}
        </IctButton>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card rounded-3xl shadow-card border border-border/50 p-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <IctAvatar
            size="xl"
            editable={isEditing}
            onEdit={() => console.log("Upload new photo")}
          />
          <div className="text-center md:text-left flex-1">
            {isEditing ? (
              <IctInput
                value={profile.name}
                onChange={handleChange("name")}
                className="text-2xl font-bold mb-2"
              />
            ) : (
              <h2 className="text-2xl font-bold text-foreground mb-2">{profile.name}</h2>
            )}
            <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2">
              <Calendar size={16} />
              Member since {profile.joinDate}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
              <Mail className="text-muted-foreground" size={20} />
              {isEditing ? (
                <input
                  type="email"
                  value={profile.email}
                  onChange={handleChange("email")}
                  className="flex-1 bg-transparent border-none outline-none text-foreground"
                />
              ) : (
                <span className="text-foreground">{profile.email}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
              <Phone className="text-muted-foreground" size={20} />
              {isEditing ? (
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange("phone")}
                  className="flex-1 bg-transparent border-none outline-none text-foreground"
                />
              ) : (
                <span className="text-foreground">{profile.phone}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Location</label>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
              <MapPin className="text-muted-foreground" size={20} />
              {isEditing ? (
                <input
                  type="text"
                  value={profile.location}
                  onChange={handleChange("location")}
                  className="flex-1 bg-transparent border-none outline-none text-foreground"
                />
              ) : (
                <span className="text-foreground">{profile.location}</span>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={handleChange("bio")}
                rows={4}
                className="w-full p-4 bg-muted/50 rounded-xl border-2 border-transparent focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none resize-none transition-all duration-300"
              />
            ) : (
              <p className="p-4 bg-muted/50 rounded-xl text-foreground">{profile.bio}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-3xl shadow-soft border border-border/50 p-8"
      >
        <h3 className="text-xl font-bold text-foreground mb-4">Skills</h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors duration-200"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-card rounded-3xl shadow-soft border border-border/50 p-8"
      >
        <h3 className="text-xl font-bold text-foreground mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50"
            >
              <div className="w-10 h-10 rounded-xl gradient-button flex items-center justify-center shadow-sm mb-3">
                <span className="text-lg">🏆</span>
              </div>
              <h4 className="font-bold text-foreground mb-1">{achievement.title}</h4>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

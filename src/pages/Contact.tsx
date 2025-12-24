import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Twitter, Linkedin, Instagram } from "lucide-react";
import { IctButton } from "@/components/ui/IctButton";
import { IctInput } from "@/components/ui/IctInput";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@ictgirls.org" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Location", value: "Global Community" },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
];

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length > 1000) {
      newErrors.message = "Message must be less than 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });
    
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions or want to join our community? We'd love to hear from you! 
          Drop us a message and we'll get back to you as soon as possible.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-3xl shadow-card border border-border/50 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center shadow-button">
              <MessageSquare className="text-primary-foreground" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Send a Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <IctInput
                id="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange("name")}
                error={errors.name}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <IctInput
                id="contact-email"
                type="email"
                placeholder="you@example.com"
                icon={<Mail size={20} />}
                value={formData.email}
                onChange={handleChange("email")}
                error={errors.email}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange("message")}
                className="flex w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base font-medium transition-all duration-300 placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 resize-none"
              />
              {errors.message && (
                <p className="mt-1.5 text-sm text-destructive font-medium animate-fade-in">
                  {errors.message}
                </p>
              )}
            </div>

            <IctButton
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              <Send size={20} />
              Send Message
            </IctButton>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Contact Details Card */}
          <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-card rounded-3xl shadow-soft border border-border/50 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Contact Information
            </h2>
            <div className="space-y-5">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Social Links Card */}
          <div className="bg-card rounded-3xl shadow-soft border border-border/50 p-8">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Follow Us
            </h2>
            <p className="text-muted-foreground mb-6">
              Stay connected and join our growing community on social media!
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl gradient-button flex items-center justify-center shadow-button"
                    aria-label={social.label}
                  >
                    <Icon className="text-primary-foreground" size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Encouragement Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="gradient-button rounded-3xl p-8 shadow-card"
          >
            <h3 className="text-xl font-bold text-primary-foreground mb-2">
              Ready to Join Us? 🚀
            </h3>
            <p className="text-primary-foreground/80">
              Whether you're taking your first steps in tech or looking to advance your skills, 
              ICT Girls is here to support you every step of the way.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

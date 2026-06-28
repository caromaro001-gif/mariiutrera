import { motion, type Variants } from "framer-motion";
import { Image as ImageIcon, Video, Calendar, MessageCircle, Star, Shield, Lock } from "lucide-react";
import lightleak from "@assets/lightleak.jpg";

const features = [
  {
    icon: ImageIcon,
    title: "Exclusive Photo Sets",
    description: "Private galleries updated weekly with content never posted anywhere else.",
  },
  {
    icon: Video,
    title: "Private Videos",
    description: "Behind-the-scenes clips, personal vlogs, and exclusive video content.",
  },
  {
    icon: Calendar,
    title: "Daily Updates",
    description: "Fresh content delivered every single day so there's always something new.",
  },
  {
    icon: MessageCircle,
    title: "VIP Messages",
    description: "Direct personal messaging access and priority replies.",
  },
  {
    icon: Star,
    title: "Limited Drops",
    description: "Time-sensitive exclusive releases only available to active members.",
  },
  {
    icon: Shield,
    title: "Early Access",
    description: "Be the first to see everything new before it hits the public feed.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-background">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 mix-blend-screen pointer-events-none">
        <div 
          className="w-full h-full bg-cover bg-no-repeat bg-right-top" 
          style={{ backgroundImage: `url(${lightleak})`, filter: 'blur(40px)' }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            What's <span className="text-gradient-gold">Inside</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg font-light"
          >
            A look beyond the velvet rope. Here is what awaits when you unlock your premium access.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group relative rounded-xl overflow-hidden glass-panel p-8 min-h-[220px]"
              >
                {/* Simulated lock blur overlay */}
                <div className="absolute inset-0 bg-background/40 backdrop-blur-sm z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-primary">Members Only</span>
                </div>

                <div className="relative z-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-serif">{feature.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Lock, Camera, Video, Calendar, MessageCircle, Gift } from "lucide-react";

const features = [
  { title: "Exclusive Photo Sets", icon: Camera, desc: "High-res galleries not posted anywhere else." },
  { title: "Private Videos", icon: Video, desc: "Uncensored, behind-the-scenes vlogs." },
  { title: "Daily Updates", icon: Calendar, desc: "See my day-to-day life closely." },
  { title: "VIP Messages", icon: MessageCircle, desc: "Priority replies and custom requests." },
  { title: "Limited Drops", icon: Gift, desc: "Physical merch and special digital sets." },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function Features() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4" data-testid="features-heading">
            Exclusive Access
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" data-testid="features-sub">
            Everything you get when you step behind the velvet rope.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feat, i) => (
            <motion.div key={i} variants={item} className="group relative rounded-2xl glass p-8 overflow-hidden" data-testid={`feature-card-${i}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <feat.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 font-serif">{feat.title}</h3>
                <p className="text-sm text-gray-400 mb-6">{feat.desc}</p>
                
                <div className="mt-auto inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
                  <Lock className="w-3 h-3 text-primary" />
                  Members Only
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
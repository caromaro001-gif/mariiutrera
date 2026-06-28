import { motion } from "framer-motion";
import { Star } from "lucide-react";
import avatar1 from "@assets/avatar1.jpg";
import avatar2 from "@assets/avatar2.jpg";
import avatar3 from "@assets/avatar3.jpg";

const testimonials = [
  {
    name: "James L.",
    review: "Absolutely incredible content. The daily updates make the VIP tier worth every penny. She shares things here you'll never see on her public feeds.",
    avatar: avatar1,
  },
  {
    name: "Michael R.",
    review: "I've been subscribed for 3 months and the quality just keeps getting better. The private DMs are a game changer.",
    avatar: avatar2,
  },
  {
    name: "Alex C.",
    review: "If you're on the fence, just do it. The exclusive drops alone pay for the membership. Truly premium experience.",
    avatar: avatar3,
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            What <span className="text-gradient-gold">Members Say</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-panel p-8 rounded-xl flex flex-col gap-4"
            >
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-primary" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic flex-1">
                "{item.review}"
              </p>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-10 h-10 rounded-full border border-primary/30 object-cover"
                />
                <span className="text-white font-medium text-sm">{item.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

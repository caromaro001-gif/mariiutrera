import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const testimonials = [
  {
    initials: "JD",
    name: "James D.",
    review: "The content is absolutely unreal. Worth every penny, I've been a sub for 6 months and it just keeps getting better.",
    plan: "VIP Access"
  },
  {
    initials: "AL",
    name: "Alex L.",
    review: "Fast responses, amazing quality photos, and she actually interacts with her fans. Highly recommend the Lifetime plan.",
    plan: "Lifetime Premium"
  },
  {
    initials: "MK",
    name: "Marcus K.",
    review: "The limited drops are insane. So exclusive. Glad I found this before it blew up even more.",
    plan: "VIP Access"
  },
  {
    initials: "SR",
    name: "Sam R.",
    review: "Best premium sub I've got. The behind the scenes videos feel so personal. 10/10.",
    plan: "Monthly Access"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background relative border-t border-white/5 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-white mb-4" data-testid="testimonials-heading">
            Member Experiences
          </h2>
          <p className="text-gray-400">
            Don't just take my word for it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-2xl flex flex-col"
              data-testid={`testimonial-card-${i}`}
            >
              <div className="flex text-primary mb-6 gap-1">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-8 italic flex-1">"{item.review}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <Avatar className="h-12 w-12 border border-white/10 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-black text-primary font-bold">{item.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-white font-medium">{item.name}</h4>
                  <p className="text-xs text-primary">{item.plan}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
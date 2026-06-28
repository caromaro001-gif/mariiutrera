import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "monthly",
    name: "Monthly Access",
    price: "$25",
    period: "/month",
    description: "Perfect for getting started with premium content.",
    features: ["All premium content", "Daily updates", "Cancel anytime"],
    highlight: false,
  },
  {
    id: "vip",
    name: "VIP Access",
    price: "$50",
    period: "/month",
    description: "The ultimate experience with priority access.",
    features: ["Everything in Monthly", "Priority DMs", "Exclusive VIP drops"],
    highlight: true,
    badge: "Most Popular"
  },
  {
    id: "lifetime",
    name: "Lifetime Premium",
    price: "$150",
    period: "one-time",
    description: "Pay once, unlock forever.",
    features: ["Lifetime access", "All future content", "VIP forever"],
    highlight: false,
  }
];

export function Pricing({ onSelectPlan }: { onSelectPlan: (planId: string) => void }) {
  const handleSelect = (id: string) => {
    onSelectPlan(id);
    document.getElementById("payment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-24 relative bg-black">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            Choose Your <span className="text-gradient-gold">Access</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-lg mx-auto font-light"
          >
            Select the tier that fits your desire. Secure, instant access upon verification.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-2xl p-8 h-full flex flex-col ${
                plan.highlight 
                  ? "glass-panel border-primary shadow-[0_0_30px_rgba(212,175,55,0.15)] md:-translate-y-4" 
                  : "bg-card border border-white/10"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary text-black text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-white/50 h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-4xl font-serif font-bold text-white">{plan.price}</span>
                <span className="text-white/50 text-sm">{plan.period}</span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                onClick={() => handleSelect(plan.id)}
                variant={plan.highlight ? "default" : "outline"}
                className={`w-full py-6 text-md ${plan.highlight ? "" : "border-white/20 text-white hover:bg-white/5"}`}
              >
                Unlock Premium
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

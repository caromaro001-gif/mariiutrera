import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Monthly Access",
    price: "$25",
    period: "/month",
    features: ["All exclusive photo sets", "Daily updates & stories", "Access to VIP messages", "Standard response time"],
    popular: false,
    value: "monthly"
  },
  {
    name: "VIP Access",
    price: "$50",
    period: "/month",
    features: ["Everything in Monthly", "Exclusive private videos", "Priority VIP messages", "Custom request access", "Early access to drops"],
    popular: true,
    value: "vip"
  },
  {
    name: "Lifetime Premium",
    price: "$150",
    period: "one-time",
    features: ["Everything in VIP", "Never pay monthly again", "Lifetime physical merch drops", "Direct WhatsApp access", "Ultimate status"],
    popular: false,
    value: "lifetime"
  }
];

export function Pricing() {
  const handleSelectPlan = (planValue: string) => {
    // We will set this in URL hash or dispatch custom event to update form,
    // For now simply smooth scroll
    const event = new CustomEvent('select-plan', { detail: planValue });
    window.dispatchEvent(event);

    const el = document.getElementById('verify');
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4" data-testid="pricing-heading">
            Choose Your Level
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Secure your spot in the inner circle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative rounded-3xl glass p-8 flex flex-col h-full ${plan.popular ? 'border-primary shadow-[0_0_30px_rgba(255,215,0,0.15)] md:-translate-y-4' : 'border-white/10 hover:border-white/20'}`}
              data-testid={`pricing-card-${i}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-black text-xs font-bold uppercase tracking-wider rounded-full">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-serif text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-sm text-gray-400">{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleSelectPlan(plan.value)}
                className={`w-full py-3 rounded-full font-bold transition-all hover:scale-105 active:scale-95 ${plan.popular ? 'bg-primary text-black shadow-lg shadow-primary/20 hover:bg-accent' : 'glass text-white hover:bg-white/10'}`}
                data-testid={`btn-select-plan-${i}`}
              >
                Unlock Premium
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
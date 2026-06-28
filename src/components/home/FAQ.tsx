import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How do I get access after paying?",
    a: "After you send your payment, fill out the verification form. Once our team confirms the payment (usually within 1-6 hours), you will receive an email with an exclusive invite link and instructions to access the premium content."
  },
  {
    q: "Which payment methods are accepted?",
    a: "We currently accept Cash App and Bitcoin (BTC). We ensure complete privacy for all transactions."
  },
  {
    q: "How long until my access is confirmed?",
    a: "Payments are typically verified within a few hours. If you pay via Bitcoin, it may depend on network confirmations. We strive to grant access as quickly as possible."
  },
  {
    q: "Is my payment secure?",
    a: "Yes. By using direct methods like Cash App or Bitcoin, your financial information remains completely private and secure. We do not store any credit card information."
  },
  {
    q: "What content is included?",
    a: "Depending on your tier, you'll get access to exclusive photo sets, private behind-the-scenes videos, daily unreleased updates, and priority direct messaging."
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes. For monthly subscriptions, you can choose not to renew at any time. Lifetime members have permanent access without any recurring fees."
  },
  {
    q: "Can I upgrade my plan?",
    a: "Absolutely. If you are on the Monthly tier and want to upgrade to VIP or Lifetime, just contact our support team and pay the difference."
  },
  {
    q: "What if I have an issue?",
    a: "You can reach out to our dedicated support via the Contact page or use the WhatsApp button in the bottom corner of the screen for direct assistance."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-4"
          >
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-6 md:p-8 rounded-xl"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-sans text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/60 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

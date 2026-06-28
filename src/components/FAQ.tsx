import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "How do I gain access after payment?",
    a: "Once you submit the verification form with your payment details, our team reviews it manually. You will receive an email within 1-12 hours with your exclusive login credentials or secure links."
  },
  {
    q: "What payment methods are accepted?",
    a: "We currently accept Cash App and Bitcoin (BTC). This ensures privacy and security for all members."
  },
  {
    q: "Is my payment secure?",
    a: "Yes. Payments are handled entirely through Cash App or standard Bitcoin transactions. We don't store your credit card information on this site."
  },
  {
    q: "Can I cancel my subscription?",
    a: "Since payments are made manually peer-to-peer, subscriptions don't auto-renew. To cancel, simply don't send payment for the next month."
  },
  {
    q: "How quickly will I get access?",
    a: "Usually within a few hours. If you haven't received access after 24 hours, please contact support via WhatsApp or email."
  },
  {
    q: "Is this content exclusive?",
    a: "100%. The content posted in the premium area is never shared on public social media accounts. It is strictly for VIP members."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-white mb-4" data-testid="faq-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know about the premium experience.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-6 md:p-8 rounded-3xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="text-left text-white hover:text-primary transition-colors font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
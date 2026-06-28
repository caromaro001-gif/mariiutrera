import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Pricing } from "@/components/home/Pricing";
import { Payment } from "@/components/home/Payment";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    document.title = "MariiUtrera Premium — Exclusive Content";
  }, []);

  return (
    <Layout>
      <Hero />
      <Features />
      <Pricing onSelectPlan={setSelectedPlan} />
      <Payment prefilledPlan={selectedPlan} />
      <Testimonials />
      <FAQ />
      <WhatsAppButton />
    </Layout>
  );
}

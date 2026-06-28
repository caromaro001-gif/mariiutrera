import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Pricing } from "@/components/Pricing";
import { PaymentSection } from "@/components/PaymentSection";
import { VerifyForm } from "@/components/VerifyForm";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        <Features />
        <Pricing />
        <PaymentSection />
        <VerifyForm />
        <Testimonials />
        <FAQ />
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
}
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-32 max-w-3xl">
        <div className="glass p-8 md:p-12 rounded-2xl">
          <h1 className="font-serif text-4xl font-bold text-white mb-8">Terms of Service</h1>
          <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using our premium content service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the service.</p>
            
            <h2 className="text-primary mt-8 mb-4">2. Subscription and Access</h2>
            <p>Access to premium content requires a valid subscription. Subscriptions are billed according to the plan selected. All content is for personal use only.</p>
            
            <h2 className="text-primary mt-8 mb-4">3. Prohibited Conduct</h2>
            <p>You may not share, redistribute, republish, or resell any content obtained through this service. Violation of this rule will result in immediate termination of your account without refund.</p>
            
            <h2 className="text-primary mt-8 mb-4">4. Refunds</h2>
            <p>Due to the digital nature of the content, all sales are final and non-refundable unless otherwise required by law.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
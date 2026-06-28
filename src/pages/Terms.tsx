import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

export default function Terms() {
  useEffect(() => {
    document.title = "Terms of Service | MariiUtrera Premium";
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="pt-32 pb-24 bg-background min-h-screen">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 md:p-12 rounded-2xl"
          >
            <h1 className="text-4xl font-serif font-bold text-white mb-8">Terms of Service</h1>
            
            <div className="prose prose-invert prose-gold max-w-none text-white/70">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-primary font-serif mt-8 text-2xl">1. Acceptance of Terms</h2>
              <p>By accessing or using the MariiUtrera Premium platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.</p>
              
              <h2 className="text-primary font-serif mt-8 text-2xl">2. Subscriptions & Payments</h2>
              <p>Access to premium content requires payment. All payments are final and non-refundable unless otherwise required by law. You agree to provide current, complete, and accurate purchase information for all purchases made.</p>

              <h2 className="text-primary font-serif mt-8 text-2xl">3. Content Rules</h2>
              <p>All content provided on this platform is the exclusive property of MariiUtrera. You are granted a limited, non-exclusive, non-transferable license to view the content for personal use only.</p>
              <p><strong>Strict Prohibition:</strong> You may not distribute, modify, transmit, reuse, download, repost, copy, or use said content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission.</p>

              <h2 className="text-primary font-serif mt-8 text-2xl">4. Account Termination</h2>
              <p>We reserve the right to terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms of Service. Leaking content will result in an immediate, un-refunded ban.</p>

              <h2 className="text-primary font-serif mt-8 text-2xl">5. Changes to Terms</h2>
              <p>We reserve the right to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

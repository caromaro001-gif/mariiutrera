import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";

export default function Privacy() {
  useEffect(() => {
    document.title = "Privacy Policy | MariiUtrera Premium";
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
            <h1 className="text-4xl font-serif font-bold text-white mb-8">Privacy Policy</h1>
            
            <div className="prose prose-invert prose-gold max-w-none text-white/70">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-primary font-serif mt-8 text-2xl">1. Information We Collect</h2>
              <p>When you subscribe to MariiUtrera Premium, we collect information that you provide to us directly, such as your name, email address, payment identifiers (like Cash App username or BTC transaction hashes), and any other information you choose to provide in forms.</p>
              
              <h2 className="text-primary font-serif mt-8 text-2xl">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and verify access</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Communicate with you about products, services, and events</li>
              </ul>

              <h2 className="text-primary font-serif mt-8 text-2xl">3. Sharing of Information</h2>
              <p>We do not share your personal information with third parties except as described in this privacy policy or as required by law. We use highly secure communication channels to ensure your data remains completely private.</p>

              <h2 className="text-primary font-serif mt-8 text-2xl">4. Data Security</h2>
              <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. The premium nature of this platform dictates strict adherence to privacy and security protocols.</p>

              <h2 className="text-primary font-serif mt-8 text-2xl">5. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us via the Contact page or our dedicated support channels.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

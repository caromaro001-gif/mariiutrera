import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-32 max-w-3xl">
        <div className="glass p-8 md:p-12 rounded-2xl">
          <h1 className="font-serif text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <h2 className="text-primary mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as your name, email address, and payment verification details when you subscribe to our service.</p>
            
            <h2 className="text-primary mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you.</p>
            
            <h2 className="text-primary mt-8 mb-4">3. Information Sharing</h2>
            <p>We do not share your personal information with third parties except as necessary to provide our services or as required by law.</p>
            
            <h2 className="text-primary mt-8 mb-4">4. Security</h2>
            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP?.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-32 max-w-3xl">
        <div className="glass p-8 md:p-12 rounded-2xl text-center">
          <h1 className="font-serif text-4xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 mb-12">Need help with your subscription or have questions? We're here for you.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-white/5 bg-white/5 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-white mb-2">Email Support</h3>
              <p className="text-sm text-gray-400 mb-4">Drop us a line and we'll get back to you within 24 hours.</p>
              <a href="mailto:support@mariiutrerapremium.com" className="text-primary hover:underline text-sm font-medium">
                support@mariiutrerapremium.com
              </a>
            </div>

            <div className="p-6 rounded-xl border border-white/5 bg-white/5 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-white mb-2">WhatsApp Chat</h3>
              <p className="text-sm text-gray-400 mb-4">For faster resolution, chat with our support team.</p>
              {whatsappNumber ? (
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-medium">
                  Chat Now
                </a>
              ) : (
                <span className="text-gray-500 text-sm italic">Not available</span>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
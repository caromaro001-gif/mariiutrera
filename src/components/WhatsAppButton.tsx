import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP || "1234567890";
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanNumber}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition-all group"
      title="Need Help? Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-black" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-black/80 backdrop-blur-sm border border-primary/20 text-white text-xs py-2 px-3 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Need Help? Chat on WhatsApp
      </span>
    </motion.a>
  );
}

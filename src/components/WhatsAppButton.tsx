import { SiWhatsapp } from "react-icons/si";

export function WhatsAppButton() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP?.replace(/[^0-9]/g, '') || '';
  
  if (!whatsappNumber) return null;

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform hover:shadow-xl group"
      aria-label="Chat on WhatsApp"
      data-testid="btn-whatsapp"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-75"></div>
      <SiWhatsapp className="w-8 h-8 relative z-10" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 text-white text-xs font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 glass">
        Need Help? Chat on WhatsApp
      </div>
    </a>
  );
}
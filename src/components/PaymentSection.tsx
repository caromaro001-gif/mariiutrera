import { SiCashapp, SiBitcoin } from "react-icons/si";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export function PaymentSection() {
  const { toast } = useToast();
  const cashapp = import.meta.env.VITE_CASHAPP || "$YourCashTag";
  const btcAddress = import.meta.env.VITE_BTC_ADDRESS || "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa";

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `The ${type} has been copied.`,
    });
  };

  return (
    <section className="py-16 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-bold text-white mb-4" data-testid="payment-heading">
            Payment Methods
          </h2>
          <p className="text-gray-400">
            Send your payment using one of the accepted methods below, then verify it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-2xl flex flex-col items-center text-center border-t-2 border-t-[#00D632]/50 hover:bg-white/5 transition-colors"
            data-testid="payment-method-cashapp"
          >
            <div className="w-16 h-16 rounded-full bg-[#00D632]/10 flex items-center justify-center mb-4">
              <SiCashapp className="w-8 h-8 text-[#00D632]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cash App</h3>
            <p className="text-sm text-gray-400 mb-6 font-mono bg-black/50 px-4 py-2 rounded-lg w-full truncate">
              {cashapp}
            </p>
            <button 
              onClick={() => handleCopy(cashapp, "Cash App tag")}
              className="flex items-center gap-2 text-[#00D632] hover:text-[#00D632]/80 text-sm font-medium transition-colors"
            >
              <Copy className="w-4 h-4" /> Copy Tag
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-6 rounded-2xl flex flex-col items-center text-center border-t-2 border-t-[#F7931A]/50 hover:bg-white/5 transition-colors"
            data-testid="payment-method-btc"
          >
            <div className="w-16 h-16 rounded-full bg-[#F7931A]/10 flex items-center justify-center mb-4">
              <SiBitcoin className="w-8 h-8 text-[#F7931A]" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Bitcoin (BTC)</h3>
            <p className="text-sm text-gray-400 mb-6 font-mono bg-black/50 px-4 py-2 rounded-lg w-full truncate">
              {btcAddress}
            </p>
            <button 
              onClick={() => handleCopy(btcAddress, "BTC Address")}
              className="flex items-center gap-2 text-[#F7931A] hover:text-[#F7931A]/80 text-sm font-medium transition-colors"
            >
              <Copy className="w-4 h-4" /> Copy Address
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
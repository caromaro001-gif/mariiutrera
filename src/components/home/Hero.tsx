import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import hero1 from "@assets/hero1.jpg";

export function Hero() {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden w-full">
      {/* Background carousel/parallax effect setup */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero1})` }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 block">
            Exclusive Access
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight mb-6">
            Unlock <span className="text-gradient-gold italic pr-4">MariiUtrera's</span> <br className="hidden md:block" /> Premium Content
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Private content, exclusive updates, premium galleries, behind-the-scenes access, and subscriber-only drops. Enter the inner circle.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToPricing}
              className="px-8 py-4 rounded-md bg-primary text-black font-semibold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] w-full sm:w-auto"
            >
              Unlock Premium
            </button>
            <button
              onClick={scrollToFeatures}
              className="px-8 py-4 rounded-md border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition-all w-full sm:w-auto backdrop-blur-sm"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-white/50 hover:text-primary transition-colors"
        onClick={scrollToFeatures}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

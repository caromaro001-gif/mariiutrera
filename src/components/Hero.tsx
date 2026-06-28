import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; size: number; speedY: number; opacity: number }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedY: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 215, 0, ${p.opacity})`;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50" />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 text-primary text-sm font-medium tracking-wider mb-6 glass">
            VIP ACCESS ONLY
          </span>
          
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight animate-gold-shimmer" data-testid="hero-heading">
            Unlock MariiUtrera's Exclusive Premium Content
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed" data-testid="hero-subtitle">
            Private content, exclusive updates, premium galleries, behind-the-scenes access, and subscriber-only drops.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollTo('pricing')}
              className="w-full sm:w-auto bg-primary hover:bg-accent text-black font-bold px-8 py-4 rounded-full transition-all hover:scale-105 active:scale-95 text-lg shadow-[0_0_30px_rgba(255,215,0,0.3)]"
              data-testid="hero-btn-unlock"
            >
              Unlock Premium Now
            </button>
            
            <button 
              onClick={() => scrollTo('features')}
              className="w-full sm:w-auto glass hover:bg-white/10 text-white font-medium px-8 py-4 rounded-full transition-all text-lg"
              data-testid="hero-btn-features"
            >
              View Plans
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
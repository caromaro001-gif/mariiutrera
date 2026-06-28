import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location !== "/") {
      return; // Let it navigate via wouter Link if not on home
    }
    
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Features", id: "features" },
    { label: "Pricing", id: "pricing" },
    { label: "Payment", id: "payment" },
    { label: "FAQ", id: "faq" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-primary/10 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              MariiUtrera<span className="text-primary text-gradient-gold ml-1">Premium</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              location === "/" ? (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-sm font-medium text-white/80 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  className="text-sm font-medium text-white/80 hover:text-primary transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              )
            ))}
            <a 
              href={location === "/" ? "#pricing" : "/#pricing"}
              onClick={(e) => { if(location === "/") scrollToSection(e, "pricing") }}
              className="px-5 py-2 rounded-md bg-primary text-black font-semibold hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
            >
              Unlock Premium
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                className="text-2xl font-serif text-white/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#pricing"
              className="mt-4 px-8 py-3 rounded-md bg-primary text-black font-semibold text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Unlock Premium
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="bg-black py-12 border-t border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
          <span className="font-serif text-3xl font-bold tracking-tight text-white mb-6">
            MariiUtrera<span className="text-primary">Premium</span>
          </span>
          <div className="flex gap-6 mb-8 text-sm">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="text-muted-foreground text-sm flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
            </a>
          </div>
          <p className="mt-8 text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} MariiUtrera Premium. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

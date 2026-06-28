import { Crown } from "lucide-react";
import { Link } from "wouter";

export function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" data-testid="link-home">
          <Crown className="w-6 h-6 text-primary transition-transform group-hover:scale-110" />
          <span className="font-serif text-xl font-bold tracking-wider text-white">
            MariiUtrera <span className="text-primary">Premium</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo('features')} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors" data-testid="nav-features">Features</button>
          <button onClick={() => scrollTo('pricing')} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors" data-testid="nav-pricing">Pricing</button>
          <button onClick={() => scrollTo('verify')} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors" data-testid="nav-verify">Verify Payment</button>
          <button onClick={() => scrollTo('faq')} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors" data-testid="nav-faq">FAQ</button>
        </nav>

        <button 
          onClick={() => scrollTo('pricing')}
          className="bg-primary hover:bg-accent text-black font-semibold px-6 py-2 rounded-full transition-all hover:scale-105 active:scale-95 text-sm"
          data-testid="btn-unlock-premium"
        >
          Unlock Premium
        </button>
      </div>
    </header>
  );
}
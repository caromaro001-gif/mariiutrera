import { Link } from "wouter";
import { Crown } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/10 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-primary" />
            <span className="font-serif text-lg font-bold tracking-wider text-white">
              MariiUtrera <span className="text-primary">Premium</span>
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors" data-testid="link-privacy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors" data-testid="link-terms">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-gray-400 hover:text-primary transition-colors" data-testid="link-contact">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center border-t border-white/5 pt-8">
          <p className="text-xs text-gray-500" data-testid="text-copyright">
            © {new Date().getFullYear()} MariiUtrera Premium. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-2">
            Exclusive members-only access.
          </p>
        </div>
      </div>
    </footer>
  );
}
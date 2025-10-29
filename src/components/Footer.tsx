import { Facebook, Instagram, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const Footer = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <footer className="bg-gradient-to-b from-card to-soft-pink/20 border-t-2 border-primary/10 py-16" ref={elementRef}>
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-16 mb-12 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          {/* About */}
          <div>
            <h3 className="text-3xl font-playfair font-bold text-gradient-gold mb-5">
              Kuku's Beauty Parlour
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base mb-6">
              Bringing professional beauty services to your doorstep. Experience luxury, convenience, and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-all text-base hover:translate-x-1 inline-block">
                  → Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-all text-base hover:translate-x-1 inline-block">
                  → About Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-all text-base hover:translate-x-1 inline-block">
                  → Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-all text-base hover:translate-x-1 inline-block">
                  → Contact
                </a>
              </li>
            </ul>
            <Button 
              variant="outline"
              className="mt-6 font-semibold tracking-wide"
              onClick={() => window.location.href = "/auth"}
            >
              ADMIN LOGIN
            </Button>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-foreground text-lg mb-5">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white hover:scale-110 hover:shadow-glow transition-all hover:rotate-12 animate-bounce-in"
                aria-label="Facebook"
                style={{ animationDelay: '100ms' }}
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white hover:scale-110 hover:shadow-glow transition-all hover:rotate-12 animate-bounce-in"
                aria-label="Instagram"
                style={{ animationDelay: '200ms' }}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white hover:scale-110 hover:shadow-glow transition-all hover:rotate-12 animate-bounce-in"
                aria-label="Twitter"
                style={{ animationDelay: '300ms' }}
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t-2 border-primary/10 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2 text-base">
            Made with <Heart className="h-5 w-5 text-primary fill-primary animate-pulse" /> by Kuku's Beauty Parlour © 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Facebook, Instagram, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import logo from "@/assets/logo.png";

const Footer = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <footer className="bg-gradient-to-b from-card to-soft-pink/20 border-t-2 border-primary/10 py-12 md:py-16" ref={elementRef}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-8 md:mb-12 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4 md:mb-5">
              <img 
                src={logo} 
                alt="BeautyOnDoor Logo" 
                className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
              />
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-gradient-gold">
                BeautyOnDoor
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4 md:mb-6">
              Bringing professional beauty services to your doorstep. Experience luxury, convenience, and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground text-base md:text-lg mb-4 md:mb-5">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-all text-sm md:text-base hover:translate-x-1 inline-block">
                  → Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-all text-sm md:text-base hover:translate-x-1 inline-block">
                  → About Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-all text-sm md:text-base hover:translate-x-1 inline-block">
                  → Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-all text-sm md:text-base hover:translate-x-1 inline-block">
                  → Contact
                </a>
              </li>
            </ul>
            {/* <Button 
              variant="outline"
              className="mt-4 md:mt-6 font-semibold tracking-wide text-sm"
              onClick={() => window.location.href = "/auth"}
            >
              ADMIN LOGIN
            </Button> */}
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-foreground text-base md:text-lg mb-4 md:mb-5">Follow Us</h4>
            <div className="flex gap-3 md:gap-4">
              <a
                href="https://www.facebook.com/share/1D12xwfzir/"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full gradient-primary flex items-center justify-center text-white hover:scale-110 hover:shadow-glow transition-all hover:rotate-12 animate-bounce-in"
                aria-label="Facebook"
                style={{ animationDelay: '100ms' }}
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="https://www.instagram.com/makeup_artist_kuku?igsh=MWp3d2cwMTU3ZWFxNQ=="
                className="w-10 h-10 md:w-12 md:h-12 rounded-full gradient-primary flex items-center justify-center text-white hover:scale-110 hover:shadow-glow transition-all hover:rotate-12 animate-bounce-in"
                aria-label="Instagram"
                style={{ animationDelay: '200ms' }}
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full gradient-primary flex items-center justify-center text-white hover:scale-110 hover:shadow-glow transition-all hover:rotate-12 animate-bounce-in"
                aria-label="Twitter"
                style={{ animationDelay: '300ms' }}
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-10 border-t-2 border-primary/10 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm md:text-base">
            Made with <Heart className="h-4 w-4 md:h-5 md:w-5 text-primary fill-primary animate-pulse" /> by BeautyOnDoor © 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

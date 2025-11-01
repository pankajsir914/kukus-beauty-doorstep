import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Facebook, Instagram, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 transition-all duration-300 ${
        scrolled ? "bg-black shadow-strong" : "bg-black/90 shadow-medium"
      }`}
    >
      {/* Top Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <h1 className="text-lg sm:text-xl md:text-2xl font-playfair font-bold text-gradient-gold tracking-wide hover:scale-105 transition-transform cursor-pointer">
              BeautyOnDoor
            </h1>

            {/* Right Icons & CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://www.facebook.com/share/1D12xwfzir/"
                target="_blank"
                className="text-white hover:text-champagne transition-all p-2 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/makeup_artist_kuku?igsh=MWp3d2cwMTU3ZWFxNQ=="
                target="_blank"
                className="text-white hover:text-champagne transition-all p-2 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <button
                className="text-white hover:text-champagne transition-all p-2 hover:scale-110"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </button>
              <Button
                variant="premium"
                size="sm"
                className="ml-2 font-semibold tracking-wide ripple glow-on-hover"
                onClick={() => scrollToSection("contact")}
              >
                BOOK APPOINTMENT
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu for Desktop */}
      <div className="hidden md:block bg-black/90">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-10 h-14">
            {["SERVICES", "BRIDAL", "OFFERS", "ABOUT", "TESTIMONIALS", "CONTACT"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white hover:text-champagne transition-all text-sm font-medium tracking-wider relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10 animate-slide-from-bottom shadow-lg">
          <div className="container mx-auto px-3 py-4 space-y-4">
            {["SERVICES", "BRIDAL", "OFFERS", "ABOUT", "TESTIMONIALS", "CONTACT"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white text-sm hover:text-gold transition-colors text-left font-medium"
                >
                  {item}
                </button>
              )
            )}

            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <a
                href="https://www.facebook.com/share/1D12xwfzir/"
                target="_blank"
                className="text-white hover:text-gold transition-colors p-2"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/makeup_artist_kuku?igsh=MWp3d2cwMTU3ZWFxNQ=="
                target="_blank"
                className="text-white hover:text-gold transition-colors p-2"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <button
                className="text-white hover:text-gold transition-colors p-2"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </button>
            </div>

            <Button
              className="gradient-gold w-full shadow-glow"
              onClick={() => scrollToSection("contact")}
            >
              BOOK APPOINTMENT
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

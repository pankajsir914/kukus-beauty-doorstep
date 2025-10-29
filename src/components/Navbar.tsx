import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Facebook, Instagram, User } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 shadow-strong">
      {/* Top Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <h1 className="text-2xl font-playfair font-bold text-gradient-gold tracking-wide">
              KUKU'S BEAUTY PARLOUR
            </h1>

            {/* Right Icons & CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-white hover:text-champagne transition-all p-2 hover:scale-110" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="text-white hover:text-champagne transition-all p-2 hover:scale-110" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="text-white hover:text-champagne transition-all p-2 hover:scale-110" aria-label="Account">
                <User className="h-5 w-5" />
              </button>
              <Button 
                variant="premium"
                className="ml-2 font-semibold tracking-wide"
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

      {/* Navigation Menu */}
      <div className="hidden md:block bg-black/90">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-10 h-14">
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-champagne transition-all text-sm font-medium tracking-wider relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-gold hover:after:w-full after:transition-all after:duration-300"
            >
              SERVICES
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-champagne transition-all text-sm font-medium tracking-wider relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-gold hover:after:w-full after:transition-all after:duration-300"
            >
              BRIDAL
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-champagne transition-all text-sm font-medium tracking-wider relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-gold hover:after:w-full after:transition-all after:duration-300"
            >
              OFFERS
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-champagne transition-all text-sm font-medium tracking-wider relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-gold hover:after:w-full after:transition-all after:duration-300"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-white hover:text-champagne transition-all text-sm font-medium tracking-wider relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-gold hover:after:w-full after:transition-all after:duration-300"
            >
              TESTIMONIALS
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-champagne transition-all text-sm font-medium tracking-wider relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-gold hover:after:w-full after:transition-all after:duration-300"
            >
              CONTACT
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-white hover:text-gold transition-colors text-left font-medium"
              >
                SERVICES
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-white hover:text-gold transition-colors text-left font-medium"
              >
                BRIDAL
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-white hover:text-gold transition-colors text-left font-medium"
              >
                OFFERS
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-white hover:text-gold transition-colors text-left font-medium"
              >
                ABOUT
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-white hover:text-gold transition-colors text-left font-medium"
              >
                TESTIMONIALS
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-gold transition-colors text-left font-medium"
              >
                CONTACT
              </button>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <button className="text-white hover:text-gold transition-colors p-2" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </button>
                <button className="text-white hover:text-gold transition-colors p-2" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </button>
                <button className="text-white hover:text-gold transition-colors p-2" aria-label="Account">
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      {/* Top Bar */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <h1 className="text-2xl font-playfair font-bold text-white tracking-wide">
              KUKU'S BEAUTY PARLOUR
            </h1>

            {/* Right Icons & CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-white hover:text-gold transition-colors p-2" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="text-white hover:text-gold transition-colors p-2" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="text-white hover:text-gold transition-colors p-2" aria-label="Account">
                <User className="h-5 w-5" />
              </button>
              <Button 
                className="gradient-gold shadow-glow ml-2"
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
      <div className="hidden md:block bg-black/95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-8 h-14">
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-gold transition-colors text-sm font-medium tracking-wide"
            >
              SERVICES
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-gold transition-colors text-sm font-medium tracking-wide"
            >
              BRIDAL
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-gold transition-colors text-sm font-medium tracking-wide"
            >
              OFFERS
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-gold transition-colors text-sm font-medium tracking-wide"
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-white hover:text-gold transition-colors text-sm font-medium tracking-wide"
            >
              TESTIMONIALS
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-gold transition-colors text-sm font-medium tracking-wide"
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

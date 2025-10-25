import { Button } from "@/components/ui/button";
import { Sparkles, Home } from "lucide-react";
import heroImage from "@/assets/hero-beauty.jpg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 mt-20">
        <div className="max-w-3xl animate-slide-up">
          <div className="flex items-center gap-2 mb-6">
            <Home className="h-6 w-6 text-gold" />
            <span className="text-gold font-semibold text-lg">Doorstep Beauty Services</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-white leading-tight">
            Luxury Beauty
            <br />
            <span className="text-gradient-gold">At Your Doorstep</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Experience professional beauty services in the comfort of your home. 
            Expert hair styling, makeup, skincare, and bridal packages tailored just for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="gradient-gold shadow-glow text-lg px-8 py-6"
              onClick={scrollToContact}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Book Your Appointment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-foreground text-lg px-8 py-6"
              onClick={() => {
                const element = document.getElementById("services");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;

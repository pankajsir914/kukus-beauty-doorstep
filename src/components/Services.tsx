import { Button } from "@/components/ui/button";
import { Scissors, Palette, Sparkles, Crown, Flower2, Heart, Star, Wand2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const services = [
  {
    title: "Hair Styling",
    icon: Scissors,
  },
  {
    title: "Makeup Artistry",
    icon: Palette,
  },
  {
    title: "Skincare",
    icon: Sparkles,
  },
  {
    title: "Bridal Packages",
    icon: Crown,
  },
  {
    title: "Mehendi",
    icon: Flower2,
  },
  {
    title: "Facial Treatments",
    icon: Heart,
  },
  {
    title: "Party Makeup",
    icon: Star,
  },
  {
    title: "Nail Services",
    icon: Wand2,
  },
];

const Services = () => {
  const navigate = useNavigate();
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="services" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-background to-soft-pink/20" ref={elementRef}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className={`text-center mb-12 md:mb-20 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 md:mb-6 decorative-line">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our range of premium beauty services, all available at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-soft-pink/30 transition-all duration-300 cursor-pointer scroll-reveal ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full gradient-primary flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-center text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* More Button */}
        <div className={`text-center mt-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <Button 
            variant="premium"
            size="lg"
            onClick={() => navigate('/services')}
            className="font-semibold tracking-wide ripple glow-on-hover animate-pulse-glow"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;

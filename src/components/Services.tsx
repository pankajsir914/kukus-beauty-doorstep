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
    <section id="services" className="py-8 sm:py-16 md:py-20 bg-gradient-to-b from-background to-soft-pink/20" ref={elementRef}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className={`text-center mb-6 sm:mb-10 md:mb-16 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-2 sm:mb-3 md:mb-4 decorative-line">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our range of premium beauty services, all available at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group flex flex-col items-center gap-2 p-2 sm:p-3 md:p-4 rounded-xl hover:bg-soft-pink/30 transition-all duration-300 cursor-pointer scroll-reveal ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full gradient-primary flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-semibold text-center text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* More Button */}
        <div className={`text-center mt-6 sm:mt-10 md:mt-14 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <Button 
            variant="premium"
            size="default"
            onClick={() => navigate('/services')}
            className="font-semibold tracking-wide ripple glow-on-hover animate-pulse-glow text-sm sm:text-base"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;

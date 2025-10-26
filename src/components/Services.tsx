import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Sparkles, Crown } from "lucide-react";
import hairImage from "@/assets/service-hair.jpg";
import makeupImage from "@/assets/service-makeup.jpg";
import skincareImage from "@/assets/service-skincare.jpg";
import bridalImage from "@/assets/service-bridal.jpg";

const services = [
  {
    title: "Hair Styling",
    description: "Professional cuts, coloring, treatments, and styling for every occasion",
    icon: Scissors,
    image: hairImage,
  },
  {
    title: "Makeup Artistry",
    description: "Flawless makeup for parties, events, and special occasions",
    icon: Palette,
    image: makeupImage,
  },
  {
    title: "Skincare & Facials",
    description: "Rejuvenating treatments for glowing, healthy skin",
    icon: Sparkles,
    image: skincareImage,
  },
  {
    title: "Bridal Packages",
    description: "Complete bridal beauty solutions for your special day",
    icon: Crown,
    image: bridalImage,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-28 bg-gradient-to-b from-background to-soft-pink/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-6 decorative-line">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our range of premium beauty services, all available at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover-lift animate-slide-up cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-plum/40 to-transparent" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-champagne/20 backdrop-blur-sm">
                        <Icon className="h-6 w-6 text-champagne" />
                      </div>
                      <h3 className="text-2xl font-playfair font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-card to-soft-pink/30">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  <div className="mt-4 flex items-center text-primary font-semibold text-sm group-hover:text-primary-light transition-colors">
                    Learn More →
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

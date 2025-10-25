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
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Our <span className="text-gradient-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our range of premium beauty services, all available at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group overflow-hidden border-border hover:border-primary transition-all duration-500 shadow-soft hover:shadow-medium animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-6 w-6 text-gold" />
                      <h3 className="text-xl font-playfair font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">{service.description}</p>
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

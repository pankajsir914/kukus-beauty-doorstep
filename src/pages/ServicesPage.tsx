import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Sparkles, Crown, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import hairImage from "@/assets/service-hair.jpg";
import makeupImage from "@/assets/service-makeup.jpg";
import skincareImage from "@/assets/service-skincare.jpg";
import bridalImage from "@/assets/service-bridal.jpg";

const allServices = [
  {
    title: "Hair Styling",
    description: "Professional cuts, coloring, treatments, and styling for every occasion",
    icon: Scissors,
    image: hairImage,
    price: "₹800 onwards",
    duration: "60-90 mins",
    features: [
      "Hair Cut & Styling",
      "Hair Coloring",
      "Hair Spa & Treatments",
      "Keratin Treatment",
      "Hair Straightening",
      "Perming & Curling"
    ]
  },
  {
    title: "Makeup Artistry",
    description: "Flawless makeup for parties, events, and special occasions",
    icon: Palette,
    image: makeupImage,
    price: "₹1,500 onwards",
    duration: "90-120 mins",
    features: [
      "Party Makeup",
      "HD Makeup",
      "Airbrush Makeup",
      "Engagement Makeup",
      "Reception Makeup",
      "Natural Makeup"
    ]
  },
  {
    title: "Skincare & Facials",
    description: "Rejuvenating treatments for glowing, healthy skin",
    icon: Sparkles,
    image: skincareImage,
    price: "₹600 onwards",
    duration: "45-60 mins",
    features: [
      "Gold Facial",
      "Diamond Facial",
      "Anti-Aging Facial",
      "Fruit Facial",
      "Deep Cleansing",
      "Skin Brightening"
    ]
  },
  {
    title: "Bridal Packages",
    description: "Complete bridal beauty solutions for your special day",
    icon: Crown,
    image: bridalImage,
    price: "₹15,000 onwards",
    duration: "Full Day",
    features: [
      "Pre-Bridal Packages",
      "Bridal Makeup",
      "Bridal Hair Styling",
      "Mehndi Application",
      "Skin & Hair Consultation",
      "Trial Sessions Included"
    ]
  }
];

const ServicesPage = () => {
  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  return (
    <div className="min-h-screen font-inter">
      <Navbar />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-background to-soft-pink/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 decorative-line">
                Our <span className="text-gradient-primary">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Professional beauty services delivered at your doorstep with care and expertise
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {allServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="group overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover-lift animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-plum/40 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-3 rounded-full bg-champagne/20 backdrop-blur-sm">
                            <Icon className="h-7 w-7 text-champagne" />
                          </div>
                          <h2 className="text-3xl font-playfair font-bold text-white">
                            {service.title}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-8 bg-gradient-to-b from-card to-soft-pink/30">
                      <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                        {service.description}
                      </p>
                      
                      {/* Price & Duration */}
                      <div className="flex items-center gap-6 mb-6 pb-6 border-b border-primary/10">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-foreground">{service.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-foreground">{service.duration}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h3 className="font-semibold text-foreground mb-4 text-lg">Services Included:</h3>
                        <ul className="grid grid-cols-2 gap-3">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-primary mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        variant="premium" 
                        className="w-full"
                        onClick={scrollToContact}
                      >
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* CTA Section */}
            <div className="text-center mt-20 p-12 bg-gradient-to-r from-primary/5 to-soft-pink/20 rounded-3xl border-2 border-primary/10">
              <h3 className="text-3xl font-playfair font-bold mb-4">
                Ready to Transform Your Look?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
                Book an appointment today and experience luxury beauty services at your doorstep
              </p>
              <Button 
                variant="premium" 
                size="lg"
                onClick={scrollToContact}
              >
                Contact Us Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;

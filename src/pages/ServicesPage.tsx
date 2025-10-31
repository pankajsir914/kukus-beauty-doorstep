import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Sparkles, Crown, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import hairImage from "@/assets/service-hair.jpg";
import makeupImage from "@/assets/service-makeup.jpg";
import skincareImage from "@/assets/service-skincare.jpg";
import bridalImage from "@/assets/service-bridal.jpg";

// Map categories to icons and default images
const categoryMap: Record<string, { icon: any; image: string }> = {
  "Hair": { icon: Scissors, image: hairImage },
  "Makeup": { icon: Palette, image: makeupImage },
  "Skincare": { icon: Sparkles, image: skincareImage },
  "Bridal": { icon: Crown, image: bridalImage },
};

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_minutes: number;
  category: string;
  image_url?: string;
  is_active: boolean;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("category");

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContact = () => {
    window.location.href = "/#contact";
  };

  const getCategoryIcon = (category: string) => {
    return categoryMap[category]?.icon || Sparkles;
  };

  const getCategoryImage = (category: string, imageUrl?: string) => {
    return imageUrl || categoryMap[category]?.image || hairImage;
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
            {loading ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-80 w-full" />
                    <CardContent className="p-8">
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-5/6" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No services available at the moment. Please check back later.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {services.map((service, index) => {
                  const Icon = getCategoryIcon(service.category);
                  const image = getCategoryImage(service.category, service.image_url);
                  return (
                    <Card
                      key={service.id}
                      className="group overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-500 hover-lift animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-80 overflow-hidden">
                        <img
                          src={image}
                          alt={service.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-plum/40 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 rounded-full bg-champagne/20 backdrop-blur-sm">
                              <Icon className="h-7 w-7 text-champagne" />
                            </div>
                            <h2 className="text-3xl font-playfair font-bold text-white">
                              {service.name}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-8 bg-gradient-to-b from-card to-soft-pink/30">
                        <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                          {service.description}
                        </p>
                        
                        {/* Price & Duration */}
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center gap-2">
                            <IndianRupee className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">₹{service.price} onwards</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-foreground">{service.duration_minutes} mins</span>
                          </div>
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
            )}

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

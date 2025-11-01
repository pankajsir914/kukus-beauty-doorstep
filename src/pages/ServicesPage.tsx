import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Palette, Sparkles, Crown, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import hairImage from "@/assets/service-hair.jpg";
import makeupImage from "@/assets/service-makeup.jpg";
import skincareImage from "@/assets/service-skincare.jpg";
import bridalImage from "@/assets/service-bridal.jpg";
import AppointmentBookingForm from "@/components/AppointmentBookingForm";

// Map categories to icons and default images
const categoryMap: Record<string, { icon: any; image: string }> = {
  Hair: { icon: Scissors, image: hairImage },
  Makeup: { icon: Palette, image: makeupImage },
  Skincare: { icon: Sparkles, image: skincareImage },
  Bridal: { icon: Crown, image: bridalImage },
};

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  duration_minutes: number;
  category: string;
  image_url?: string;
  is_active: boolean;
}

const ServicesPage = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ id: string; name: string } | null>(null);

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

  const handleBookNow = (serviceId: string, serviceName: string) => {
    setSelectedService({ id: serviceId, name: serviceName });
    setBookingOpen(true);
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
      <main className="pt-24 sm:pt-32">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-soft-pink/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16 animate-slide-up">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-playfair font-bold mb-4 sm:mb-6 decorative-line">
                Our <span className="text-gradient-primary">Services</span>
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Professional beauty services delivered at your doorstep with care and expertise
              </p>
            </div>

            {/* Services Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-56 sm:h-64 w-full" />
                    <CardContent className="p-6 sm:p-8">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                {services.map((service, index) => {
                  const Icon = getCategoryIcon(service.category);
                  const image = getCategoryImage(service.category, service.image_url);
                  return (
                    <Card
                      key={service.id}
                      className="group overflow-hidden border border-transparent hover:border-primary/30 transition-all duration-500 hover-lift animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                        <img
                          src={image}
                          alt={service.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-plum/40 to-transparent" />
                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="p-2 sm:p-3 rounded-full bg-champagne/20 backdrop-blur-sm">
                              <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-champagne" />
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-white">
                              {service.name}
                            </h2>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6 sm:p-8 bg-gradient-to-b from-card to-soft-pink/30">
                        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                          {service.description}
                        </p>

                        {/* Price Display */}
                        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                          <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                          <div className="flex items-center gap-2 sm:gap-3">
                            {service.original_price && service.original_price > service.price ? (
                              <>
                                <span className="text-sm sm:text-lg text-muted-foreground line-through">
                                  ₹{service.original_price}
                                </span>
                                <span className="text-xl sm:text-2xl font-bold text-primary">
                                  ₹{service.price}
                                </span>
                              </>
                            ) : (
                              <span className="text-xl sm:text-2xl font-bold text-primary">
                                ₹{service.price}
                              </span>
                            )}
                          </div>
                        </div>

                        <Button
                          variant="premium"
                          className="w-full text-sm sm:text-base py-2 sm:py-3"
                          onClick={() => handleBookNow(service.id, service.name)}
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
            <div className="text-center mt-12 sm:mt-20 p-6 sm:p-10 bg-gradient-to-r from-primary/5 to-soft-pink/20 rounded-2xl sm:rounded-3xl border-2 border-primary/10">
              <h3 className="text-2xl sm:text-3xl font-playfair font-bold mb-3 sm:mb-4">
                Ready to Transform Your Look?
              </h3>
              <p className="text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base max-w-xl mx-auto">
                Book an appointment today and experience luxury beauty services at your doorstep
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Appointment Booking Form */}
      {selectedService && (
        <AppointmentBookingForm
          open={bookingOpen}
          onOpenChange={setBookingOpen}
          serviceId={selectedService.id}
          serviceName={selectedService.name}
        />
      )}
    </div>
  );
};

export default ServicesPage;

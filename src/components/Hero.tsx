import { Button } from "@/components/ui/button";
import { Sparkles, Home, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-beauty.jpg";
import bridalImage from "@/assets/service-bridal.jpg";
import hairImage from "@/assets/service-hair.jpg";
import makeupImage from "@/assets/service-makeup.jpg";

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    // Auto-play carousel
    const autoplay = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(autoplay);
  }, [api]);

  const slides = [
    {
      image: bridalImage,
      title: "Expert Curated Pre-Bridal Rituals",
      subtitle: "For Bridal Radiance",
      banner: "PRE-BRIDAL PACKAGES STARTING AT ₹3999*",
      cta: "Book Your Appointment",
    },
    {
      image: heroImage,
      title: "Luxury Beauty Services",
      subtitle: "At Your Doorstep",
      banner: "LIMITED TIME OFFER - 20% OFF First Booking!",
      cta: "Book Your Appointment",
    },
    {
      image: hairImage,
      title: "Professional Hair Styling",
      subtitle: "Transform Your Look",
      banner: "PREMIUM HAIR PACKAGES FROM ₹1999*",
      cta: "Explore Hair Services",
    },
    {
      image: makeupImage,
      title: "Flawless Makeup Artistry",
      subtitle: "For Every Occasion",
      banner: "SPECIAL MAKEUP PACKAGES FROM ₹2499*",
      cta: "View Makeup Services",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Carousel
        setApi={setApi}
        className="w-full h-screen"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="h-screen">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="relative h-screen">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-3xl pt-20">
                  {/* Doorstep Badge */}
                  <div className="mb-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                      <Home className="h-4 w-4 text-gold" />
                      <span className="text-white font-semibold text-sm">
                        Doorstep Beauty Services
                      </span>
                    </div>
                  </div>

                  <div className="animate-slide-up">
                    <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4 text-white leading-tight">
                      {slide.title}
                      <br />
                      <span className="text-gradient-gold">{slide.subtitle}</span>
                    </h1>

                    {/* Promotional Banner Box */}
                    <div className="mb-8">
                      <div className="inline-block px-8 py-4 bg-gradient-to-r from-gold/90 to-rose-gold/90 backdrop-blur-sm rounded-lg shadow-glow">
                        <p className="text-2xl md:text-3xl font-bold text-white">
                          {slide.banner}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="gradient-gold shadow-glow text-lg px-8 py-6 hover:scale-105 transition-transform"
                        onClick={scrollToContact}
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        {slide.cta}
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
                        Explore All Services
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Arrows */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === current
                  ? "bg-gold w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </Carousel>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;

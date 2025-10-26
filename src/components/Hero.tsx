import { Home, ChevronLeft, ChevronRight } from "lucide-react";
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-burgundy/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="max-w-3xl pt-20">
                  {/* Doorstep Badge */}
                  <div className="mb-8 animate-fade-in">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-card">
                      <Home className="h-5 w-5 text-champagne" />
                      <span className="text-white font-semibold text-sm tracking-wide">
                        Doorstep Beauty Services
                      </span>
                    </div>
                  </div>

                  <div className="animate-slide-up">
                    {/* Promotional Banner Box */}
                    <div>
                      <div className="inline-block px-8 py-4 gradient-gold rounded-xl shadow-glow-gold">
                        <p className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                          {slide.banner}
                        </p>
                      </div>
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
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
        >
          <ChevronRight className="h-7 w-7" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-champagne w-10 h-3 shadow-glow-gold"
                  : "bg-white/50 hover:bg-white/80 w-3 h-3"
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

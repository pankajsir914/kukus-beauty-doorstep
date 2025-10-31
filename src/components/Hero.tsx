import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface Banner {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  priority: number;
}

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBanners(data || []);
    } catch (error) {
      console.error("Error fetching banners:", error);
    }
  };

  useEffect(() => {
    if (!api || banners.length === 0) return;

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
  }, [api, banners.length]);

  if (banners.length === 0) {
    return (
      <section className="relative min-h-[50vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-soft-pink/20">
        <div className="text-center">
          <h2 className="text-4xl font-playfair font-bold text-muted-foreground">Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[50vh] md:min-h-screen flex items-center justify-center overflow-hidden w-full max-w-full">
      <Carousel
        setApi={setApi}
        className="w-full h-[50vh] md:h-screen max-w-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="h-[50vh] md:h-screen max-w-full">
          {banners.map((banner, index) => (
            <CarouselItem key={banner.id} className="relative h-[50vh] md:h-screen">
              {/* Background Image with Ken Burns effect */}
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-[8000ms] ease-out hover:scale-105"
                style={{
                  backgroundImage: banner.image_url ? `url(${banner.image_url})` : 'none',
                  backgroundColor: banner.image_url ? '#1a1a1a' : '#1a1a1a'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 animate-fade-in" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom Navigation Arrows with enhanced animations */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110 glow-on-hover ripple animate-fade-in"
        >
          <ChevronLeft className="h-5 w-5 md:h-7 md:w-7" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full glass-card flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110 glow-on-hover ripple animate-fade-in"
        >
          <ChevronRight className="h-5 w-5 md:h-7 md:w-7" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`rounded-full transition-all duration-300 ${
                index === current
                  ? "bg-champagne w-6 md:w-10 h-2 md:h-3 shadow-glow-gold"
                  : "bg-white/50 hover:bg-white/80 w-2 md:w-3 h-2 md:h-3"
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

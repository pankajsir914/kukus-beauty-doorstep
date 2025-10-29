import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Banner {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link_url: string | null;
  priority: number;
}

const BannerCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Auto-play functionality
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api]);

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

  if (banners.length === 0) {
    return null;
  }

  const BannerContent = ({ banner }: { banner: Banner }) => (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl">
      {banner.image_url && (
        <img
          src={banner.image_url}
          alt={banner.title}
          className="w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
        <div className="p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            {banner.title}
          </h2>
          {banner.description && (
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              {banner.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="container mx-auto px-4 py-8">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              {banner.link_url ? (
                <a
                  href={banner.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <BannerContent banner={banner} />
                </a>
              ) : (
                <BannerContent banner={banner} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {banners.length > 1 && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>
    </section>
  );
};

export default BannerCarousel;

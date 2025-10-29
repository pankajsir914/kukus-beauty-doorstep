import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [banners.length]);

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

  const currentBanner = banners[currentIndex];

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
      <div className="relative">
        {currentBanner.link_url ? (
          <a
            href={currentBanner.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <BannerContent banner={currentBanner} />
          </a>
        ) : (
          <BannerContent banner={currentBanner} />
        )}
        
        {banners.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-primary/30"
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerCarousel;

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const VideoSection = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background" ref={elementRef}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className={`text-center mb-8 md:mb-12 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-3 md:mb-4">
            Experience Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our beauty transformation moments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            "84f37zbam9",
            "m0nbkvx7hp",
            "mx8d7733h9",
            "8m9j1l65xz"
          ].map((mediaId, index) => (
            <div 
              key={index} 
              className={`relative aspect-[9/16] rounded-2xl overflow-hidden shadow-glow bg-black hover:scale-105 hover:shadow-glow-gold transition-all duration-500 glow-on-hover scroll-reveal-scale ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: `<wistia-player media-id="${mediaId}" muted="true" autoplay="true" class="w-full h-full"></wistia-player>`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

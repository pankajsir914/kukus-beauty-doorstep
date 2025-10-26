const VideoSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Experience Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our beauty transformation moments
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-glow bg-black">
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              poster="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=500&auto=format&fit=crop"
            >
              <source
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

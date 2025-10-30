import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  full_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

const Testimonials = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [reviews, setReviews] = useState<Review[]>([]);
  
  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  const fetchApprovedReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <section id="testimonials" className="py-8 sm:py-14 md:py-20 bg-gradient-to-b from-soft-pink/20 to-background" ref={elementRef}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className={`text-center mb-6 sm:mb-10 md:mb-14 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-2 sm:mb-3 md:mb-4 decorative-line">
            What Our <span className="text-gradient-primary">Clients Say</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {reviews.map((review, index) => (
              <Card
                key={review.id}
                className={`border-2 border-primary/10 hover:border-primary/30 hover-lift relative overflow-hidden glow-on-hover scroll-reveal-${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-primary opacity-10 rounded-bl-full" />
                <CardContent className="p-4 sm:p-5 md:p-6 relative">
                  <div className="flex gap-1 mb-3 sm:mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 fill-champagne text-champagne drop-shadow-sm star-animate transition-transform hover:scale-125" 
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 sm:mb-5 md:mb-6 italic leading-relaxed text-xs sm:text-sm">
                    "{review.review_text}"
                  </p>
                  <div className="border-t border-primary/10 pt-3">
                    <p className="font-bold text-foreground text-sm sm:text-base">{review.full_name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {new Date(review.created_at).toLocaleDateString('en-IN', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;

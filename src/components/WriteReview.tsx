import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const WriteReview = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    review: "",
  });
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("reviews").insert({
        full_name: formData.name,
        email: formData.email,
        rating: rating,
        review_text: formData.review,
      });

      if (error) throw error;

      toast.success("Thank you for your review! It will be published after approval.");
      setFormData({ name: "", email: "", review: "" });
      setRating(0);
    } catch (error: any) {
      toast.error("Failed to submit review. Please try again.");
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-8 sm:py-14 md:py-20 bg-gradient-to-b from-soft-pink/30 to-background">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-6 sm:mb-10 md:mb-12 animate-slide-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-2 sm:mb-3 md:mb-4 decorative-line">
            Write Your <span className="text-gradient-primary">Review</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Share your experience with us and help others discover our services
          </p>
        </div>

        <Card className="max-w-3xl mx-auto shadow-strong border-2 border-primary/10 hover:border-primary/20 animate-slide-in-left">
          <CardContent className="p-4 sm:p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {/* Rating */}
              <div className="text-center">
                <p className="text-sm sm:text-base md:text-lg font-semibold mb-3">Rate Your Experience</p>
                <div className="flex justify-center gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-125"
                    >
                      <Star
                        className={`h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-champagne text-champagne"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <Input
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-background input-focus transition-all text-sm md:text-base"
                />
              </div>

              {/* Email */}
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email (Optional)"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background input-focus transition-all text-sm md:text-base"
                />
              </div>

              {/* Review */}
              <div>
                <Textarea
                  name="review"
                  placeholder="Write your review here... *"
                  value={formData.review}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-background input-focus transition-all text-sm md:text-base"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="premium"
                size="default"
                className="w-full font-semibold text-sm sm:text-base md:text-lg ripple glow-on-hover transition-all hover:scale-105"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WriteReview;

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const testimonials = [
  {
    name: "Priya Sharma",
    service: "Bridal Package",
    rating: 5,
    text: "Kuku's team made my wedding day absolutely perfect! The bridal makeup and hairstyling were flawless. The convenience of having them come to my home was priceless.",
  },
  {
    name: "Anita Desai",
    service: "Skincare & Facial",
    rating: 5,
    text: "The facial treatment was so relaxing and my skin has never looked better! The beautician was professional and used amazing products. Highly recommend!",
  },
  {
    name: "Meera Patel",
    service: "Hair Styling",
    rating: 5,
    text: "I love the convenience of doorstep service! The hair color came out exactly as I wanted. Will definitely book again for my next party.",
  },
  {
    name: "Kavya Singh",
    service: "Makeup & Hair",
    rating: 5,
    text: "Professional, punctual, and talented! My party makeup and hairstyle received so many compliments. Thank you Kuku's for making me feel beautiful!",
  },
];

const Testimonials = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <section id="testimonials" className="py-28 bg-gradient-to-b from-soft-pink/20 to-background" ref={elementRef}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-20 scroll-reveal ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-6 decorative-line">
            What Our <span className="text-gradient-primary">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`border-2 border-primary/10 hover:border-primary/30 hover-lift relative overflow-hidden glow-on-hover scroll-reveal-${index % 2 === 0 ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-primary opacity-10 rounded-bl-full" />
              <CardContent className="p-8 relative">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 fill-champagne text-champagne drop-shadow-sm star-animate transition-transform hover:scale-125" 
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-8 italic leading-relaxed text-base">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-primary/10 pt-4">
                  <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
                  <p className="text-sm text-primary font-medium mt-1">{testimonial.service}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

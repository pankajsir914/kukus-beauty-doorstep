import { Card, CardContent } from "@/components/ui/card";
import { Home, Clock, Star, Award } from "lucide-react";

const features = [
  {
    icon: Home,
    title: "Doorstep Service",
    description: "Enjoy premium beauty services in the comfort of your home",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    description: "Book appointments at your convenience, even on weekends",
  },
  {
    icon: Star,
    title: "Expert Professionals",
    description: "Certified beauticians with years of experience",
  },
  {
    icon: Award,
    title: "Premium Products",
    description: "We use only high-quality, branded beauty products",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Why Choose <span className="text-gradient-primary">Kuku's</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We bring professional beauty services to your doorstep with excellence and care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="text-center border-border shadow-soft hover:shadow-medium transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-playfair">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          <Card className="gradient-secondary text-white border-0 shadow-medium">
            <CardContent className="p-12">
              <h3 className="text-3xl font-playfair font-bold mb-4">About Kuku's Beauty Parlour</h3>
              <p className="text-lg leading-relaxed text-white/90">
                With years of experience in the beauty industry, Kuku's Beauty Parlour has been 
                transforming lives by bringing professional beauty services directly to your doorstep. 
                Our team of certified beauticians is passionate about making you look and feel your best, 
                using premium products and the latest techniques. We believe everyone deserves to experience 
                luxury beauty care in the comfort of their own home.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;

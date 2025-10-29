import { Card, CardContent } from "@/components/ui/card";
import { Home, Clock, Sparkles, Heart, Shield, Crown } from "lucide-react";
import bridalImg from "@/assets/service-bridal.jpg";
import hairImg from "@/assets/service-hair.jpg";
import makeupImg from "@/assets/service-makeup.jpg";
import skincareImg from "@/assets/service-skincare.jpg";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "5000+", label: "Happy Clients" },
  { number: "50+", label: "Expert Beauticians" },
  { number: "100+", label: "Services" },
];

const features = [
  {
    icon: Home,
    title: "Doorstep Service",
    description: "Luxury beauty services delivered to your doorstep with care and convenience",
  },
  {
    icon: Sparkles,
    title: "Premium Experience",
    description: "High-end products and techniques for exceptional results every time",
  },
  {
    icon: Shield,
    title: "Certified Experts",
    description: "Licensed professionals with years of specialized training and expertise",
  },
  {
    icon: Crown,
    title: "Personalized Care",
    description: "Customized beauty solutions tailored to your unique needs and preferences",
  },
];

const expertise = [
  {
    image: bridalImg,
    title: "Bridal Makeup",
    description: "Complete bridal packages with trial sessions and personalized styling",
  },
  {
    image: hairImg,
    title: "Hair Styling",
    description: "Professional cuts, coloring, treatments, and styling for every occasion",
  },
  {
    image: makeupImg,
    title: "Makeup Artistry",
    description: "Expert makeup for parties, events, and special celebrations",
  },
  {
    image: skincareImg,
    title: "Skincare",
    description: "Advanced facials and skin treatments for radiant, healthy skin",
  },
];

const About = () => {
  const { elementRef, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 bg-background" ref={elementRef}>
      <div className="container mx-auto px-3 sm:px-4">
        {/* Hero About Section */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
          <div className={`relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-medium scroll-reveal-left ${isVisible ? 'visible' : ''}`}>
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"
              alt="Professional Beauty Parlour"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="text-lg font-medium">Trusted by thousands</p>
            </div>
          </div>
          
          <div className={`scroll-reveal-right ${isVisible ? 'visible' : ''}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-4 md:mb-6">
              About <span className="text-gradient-primary">Kuku's Beauty Parlour</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With over a decade of excellence in the beauty industry, Kuku's Beauty Parlour has been 
              the trusted choice for thousands of clients seeking professional beauty services in the 
              comfort of their homes.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our team of certified beauticians brings years of expertise, premium products, and the 
              latest techniques directly to your doorstep. We believe everyone deserves to experience 
              luxury beauty care without compromising on convenience.
            </p>
            <div className="flex items-center gap-3 text-rose-gold">
              <Sparkles className="h-6 w-6" />
              <span className="font-semibold text-lg">Making beauty accessible, one home at a time</span>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`text-center border-0 shadow-medium gradient-gold scroll-reveal-scale ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">
                  {stat.number}
                </div>
                <p className="text-white/90 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-24">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Why Choose <span className="text-gradient-primary">Kuku's</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of professional expertise, premium quality, and unmatched convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className={`text-center border-border shadow-soft hover:shadow-glow hover:scale-105 transition-all duration-500 group card-3d-hover scroll-reveal ${isVisible ? 'visible' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-playfair">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Our Expertise Section */}
        <div className="mb-24">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Our <span className="text-gradient-primary">Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Specialized services delivered by certified professionals with passion and precision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((service, index) => (
              <div
                key={index}
                className={`group relative h-80 rounded-2xl overflow-hidden shadow-medium hover:shadow-glow transition-all duration-500 cursor-pointer card-3d-hover glow-on-hover scroll-reveal-scale ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-playfair font-bold mb-2 transform group-hover:translate-y-[-4px] transition-transform duration-500">
                    {service.title}
                  </h3>
                  <p className="text-white/90 transform group-hover:translate-y-[-4px] transition-transform duration-500">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-rose-gold font-semibold">Learn More</span>
                    <Sparkles className="h-4 w-4 text-rose-gold" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust & Commitment Section */}
        <div className="max-w-4xl mx-auto animate-slide-up">
          <Card className="relative overflow-hidden border-0 shadow-glow bg-gradient-to-br from-primary via-primary/90 to-secondary">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
            <CardContent className="relative p-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6 shadow-soft">
                <Heart className="h-10 w-10 text-white drop-shadow-lg" />
              </div>
              <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4 text-white drop-shadow-lg">
                Our Commitment to You
              </h3>
              <p className="text-lg leading-relaxed text-white drop-shadow-md mb-8 max-w-3xl mx-auto">
                At Kuku's Beauty Parlour, we don't just provide beauty services – we create experiences 
                that boost confidence and celebrate individuality. Every treatment is performed with 
                meticulous attention to detail, using only premium, branded products.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
                  <Shield className="h-5 w-5 text-white drop-shadow-md" />
                  <span className="text-white drop-shadow-md">100% Safe Products</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
                  <Sparkles className="h-5 w-5 text-white drop-shadow-md" />
                  <span className="text-white drop-shadow-md">Licensed Professionals</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all">
                  <Crown className="h-5 w-5 text-white drop-shadow-md" />
                  <span className="text-white drop-shadow-md">Premium Quality</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;

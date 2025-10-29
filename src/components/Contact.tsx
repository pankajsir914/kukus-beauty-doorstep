import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email",
    details: "hello@kukusbeauty.com",
  },
  {
    icon: MapPin,
    title: "Service Areas",
    details: "All major areas in the city",
  },
  {
    icon: Clock,
    title: "Hours",
    details: "9:00 AM - 9:00 PM (All Days)",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        full_name: formData.name,
        phone: formData.phone,
        service_interested: formData.service,
        message: formData.message,
        status: "new",
      });

      if (error) throw error;

      toast.success("Thank you! We'll contact you soon to confirm your appointment.");
      setFormData({ name: "", phone: "", service: "", message: "" });
    } catch (error: any) {
      toast.error("Failed to submit. Please try again or call us directly.");
      console.error("Error submitting lead:", error);
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
    <section id="contact" className="py-28 bg-gradient-to-b from-background to-soft-pink/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 animate-slide-up">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-6 decorative-line">
            Book Your <span className="text-gradient-primary">Appointment</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ready to experience luxury beauty services at home? Get in touch with us today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-in-left">
            <div>
              <h3 className="text-3xl font-playfair font-bold mb-8 text-gradient-primary">Get In Touch</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-5 group">
                      <div className="flex-shrink-0 w-14 h-14 rounded-full gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-lg mb-1">{info.title}</p>
                        <p className="text-muted-foreground text-base">{info.details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="gradient-gold border-0 shadow-glow-gold overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <CardContent className="p-10 text-center relative">
                <div className="text-6xl mb-4">✨</div>
                <h4 className="text-3xl font-playfair font-bold mb-3 text-white">
                  Special Offer!
                </h4>
                <p className="text-xl text-white font-semibold">
                  Get 20% off on your first booking
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-strong border-2 border-primary/10 hover:border-primary/20 animate-slide-in-right" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background input-focus transition-all"
                  />
                </div>
                <div>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-background input-focus transition-all"
                  />
                </div>
                <div>
                  <Input
                    name="service"
                    placeholder="Service Interested In"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="bg-background input-focus transition-all"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Additional Details / Preferred Date & Time"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-background input-focus transition-all"
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  className="w-full font-semibold text-lg ripple glow-on-hover transition-all hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Book Appointment"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;

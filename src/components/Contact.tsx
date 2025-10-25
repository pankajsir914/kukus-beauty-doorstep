import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

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
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll contact you soon to confirm your appointment.");
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
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
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
            Book Your <span className="text-gradient-primary">Appointment</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to experience luxury beauty services at home? Get in touch with us today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-6">Get In Touch</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{info.title}</p>
                        <p className="text-muted-foreground">{info.details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="gradient-gold border-0 shadow-glow">
              <CardContent className="p-8 text-center">
                <h4 className="text-2xl font-playfair font-bold mb-2 text-foreground">
                  Special Offer!
                </h4>
                <p className="text-lg text-foreground/90">
                  Get 20% off on your first booking
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-medium border-border animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background"
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
                    className="bg-background"
                  />
                </div>
                <div>
                  <Input
                    name="service"
                    placeholder="Service Interested In"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="bg-background"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Additional Details / Preferred Date & Time"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="bg-background"
                  />
                </div>
                <Button type="submit" className="w-full gradient-gold shadow-glow">
                  Book Appointment
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

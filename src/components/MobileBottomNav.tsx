import { Home, Scissors, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileBottomNav = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210"; // Replace with actual number
    const message = "Hi, I would like to book an appointment at BeautyOnDoor";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-primary/20 shadow-2xl md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {/* Home Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3 hover:bg-primary/10"
        >
          <Home className="h-5 w-5 text-primary" />
          <span className="text-xs font-medium">Home</span>
        </Button>

        {/* Services Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => scrollToSection('services')}
          className="flex flex-col items-center gap-1 h-auto py-2 px-3 hover:bg-primary/10"
        >
          <Scissors className="h-5 w-5 text-primary" />
          <span className="text-xs font-medium">Services</span>
        </Button>

        {/* WhatsApp Button */}
        <Button
          variant="default"
          size="sm"
          onClick={handleWhatsAppClick}
          className="flex flex-col items-center gap-1 h-auto py-2 px-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#128C7E] hover:to-[#075E54] text-white shadow-lg"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs font-semibold">WhatsApp</span>
        </Button>
      </div>
    </div>
  );
};

export default MobileBottomNav;

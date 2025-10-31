import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import WriteReview from "@/components/WriteReview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const Index = () => {
  return (
    <div className="min-h-screen font-inter overflow-x-hidden">
      <Navbar />
      <main className="pb-16 md:pb-0 overflow-x-hidden">
        <Hero />
        <Services />
        <About />
        <VideoSection />
        <Testimonials />
        <WriteReview />
        <Contact />
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Index;

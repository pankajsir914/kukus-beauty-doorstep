import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import VideoSection from "@/components/VideoSection";
import Testimonials from "@/components/Testimonials";
import WriteReview from "@/components/WriteReview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen font-inter">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <VideoSection />
        <Testimonials />
        <WriteReview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

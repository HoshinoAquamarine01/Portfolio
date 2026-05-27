import ThemeToggle from "@/components/ThemeToggle";
import StarBackground from "@/components/StarBackground";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutMe from "../components/AboutMe";
import SkillSection from "../components/SkillSection";
import CertificateSection from "../components/CertificateSection";
import ProjectSection from "../components/ProjectSection";
import StatsSection from "../components/StatsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import RecruiterMode from "@/components/RecruiterMode";
import { useEffect, useState } from "react";

const Home = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary/70 to-primary/50 z-50"
        style={{
          width: `${scrollProgress}%`,
          transition: "width 0.1s ease-out",
        }}
      />
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="absolute -top-10 left-0 bg-primary text-primary-foreground px-4 py-2 rounded-br focus:top-0 transition-all duration-200 z-50"
      >
        Skip to main content
      </a>

      <ThemeToggle />
      <RecruiterMode />
      <StarBackground />
      <Navbar />
      <main id="main-content" className="focus:outline-none">
        <HeroSection />
        <AboutMe />
        <SkillSection />
        <CertificateSection />
        <ProjectSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

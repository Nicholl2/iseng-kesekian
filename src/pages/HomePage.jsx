
import { useState, useEffect, useRef } from 'react';
import TitleSection from '../components/splash/TitleSection';
import BackgroundPattern from '../components/splash/BackgroundPatterns';
import FloatingElements from '../components/splash/FloatingElements';
import Footer from '../components/splash/Footer';
import LogoContainer from '../components/splash/LogoContainer';
import LoadingAnimation from '../components/splash/LoadingAnimation';
import HeroSection from '../components/home/HeroSection';
import FeaturedMenuSection from '../components/home/FeaturedMenuSection';

export default function HomePage() {
  const [fadeIn, setFadeIn] = useState(false);
  const shownRef = useRef(typeof window !== 'undefined' && Boolean(window.__splashShown));
  const alreadyShown = shownRef.current;
  const [progress, setProgress] = useState(alreadyShown ? 100 : 0);
  const [loaded, setLoaded] = useState(alreadyShown);

  useEffect(() => {
    if (shownRef.current) return;

    const timer = setTimeout(() => setFadeIn(true), 300);
    const interval = setInterval(() => {
      setProgress((p) => (p < 100 ? p + 10 : 100));
    }, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      if (typeof window !== 'undefined') {
        window.__splashShown = true;
        shownRef.current = true;
      }

      const t = setTimeout(() => setLoaded(true), 600);
      return () => clearTimeout(t);
    }
  }, [progress]);

  if (!loaded) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
        <BackgroundPattern />
        <FloatingElements />
        <LogoContainer />
        <TitleSection fadeIn={fadeIn} />
        <LoadingAnimation fadeIn={fadeIn} progress={progress} />
        <Footer fadeIn={fadeIn} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 space-y-12 md:space-y-16">
        <FeaturedMenuSection />
      </main>

      <Footer fadeIn />
    </div>
  );
}
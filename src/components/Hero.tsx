import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HeroProps {
  title?: string;
  titleLine2?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundVideoSrc?: string;
  hideCTA?: boolean;
  darkerOverlay?: boolean;
  ctaText?: string;
}

export default function Hero({
  title = "Specialists in Pool Construction, Repairs and Remodeling",
  titleLine2 = "Bringing Your Dream Home to Life",
  subtitle = "We help you place the pool in the best spot in your home to make the most of every space in your backyard.",
  backgroundImage = "/bestway-images/gallery-1.webp",
  backgroundVideoSrc,
  hideCTA = false,
  darkerOverlay = false,
  ctaText = "Call for Visit",
}: HeroProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[90vh] md:h-screen flex items-end justify-center overflow-hidden">
      {backgroundVideoSrc ? (
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${scrollY * 0.4}px)` }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={backgroundVideoSrc}
            autoPlay
            muted
            loop
            playsInline
          />
          <div className={`absolute inset-0 ${darkerOverlay ? 'bg-text-strong/60' : 'bg-text-strong/40'}`}></div>
        </div>
      ) : (
        <div 
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          <div className={`absolute inset-0 ${darkerOverlay ? 'bg-text-strong/60' : 'bg-text-strong/40'}`}></div>
        </div>
      )}

      <div className="absolute bottom-20 md:bottom-28 lg:bottom-32 left-0 right-0 z-10">
        <div className="w-[80%] mx-auto">
          <h1 className="text-white leading-tight mb-6" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
            <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl">{title}</span>
            {titleLine2 && (
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic">{titleLine2}</span>
            )}
          </h1>
          {subtitle && (
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">
              {subtitle}
            </p>
          )}
          {!hideCTA && (
            <Link to="/contact" onClick={() => {
              setTimeout(() => {
                const formElement = document.getElementById('contact-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}>
              <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                {ctaText}
              </button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

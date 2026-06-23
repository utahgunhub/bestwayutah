import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";

const nicePoolImages = Array.from({ length: 31 }, (_, i) => `/bestway-images/nice-pools/pools-${i + 1}.png`);

const whyChooseBackgrounds = [
  nicePoolImages[0],
  nicePoolImages[7],
  nicePoolImages[14],
  nicePoolImages[21],
];

const whyChooseItems = [
  {
    title: "Expertise and Specialized Knowledge",
    text:
      "Bestway Utah is a pool construction, repair, and remodeling company that offers multiple benefits in terms of expertise, service, warranty, efficiency, and customer satisfaction.",
  },
  {
    title: "One-Stop-Shop Service",
    text:
      "We take pride in having a full team for all of our projects. Our customers don't have to wait for a 2nd company to come in and do the work. Our team works quickly, very cleanly, and by doing everything in-house, our customers will save a lot of money.",
  },
  {
    title: "Warranty and After-Sales Service",
    text:
      "Trust our full-service expertise to guide you smoothly through the entire construction, repairs and remodeling process. We'll collaborate closely with you every step of the way, ensuring your reimagined home exceeds your expectations and stands strong for years to come.",
  },
  {
    title: "Efficiency and Cost Savings",
    text:
      "We have a great team of professionals specialized in the sector, as well as all the auxiliary machinery necessary for the completion of the projects. Innovation and best practices drive everything we do.",
  },
];

const stats = [
  { label: "Pool construction", value: "150" },
  { label: "Excavation and Rebar", value: "100" },
  { label: "Satisfied customers", value: "250" },
];

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeWhyIndex, setActiveWhyIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const whyImageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const visibilityRatiosRef = useRef<number[]>(new Array(whyChooseItems.length).fill(0));
  const testimonialRef = useRef<HTMLDivElement>(null);
  
  const fullText = "We Are Trusted by More Than 250+ Clients";

  const useFadeIn = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
  };

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

  const typeText = useCallback(() => {
    if (isTyping) return;
    
    setIsTyping(true);
    setDisplayedText("");
    
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, 50);
    
    return () => clearInterval(typeInterval);
  }, [fullText, isTyping]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) {
            visibilityRatiosRef.current[idx] = entry.intersectionRatio;
          }
        });

        const ratios = visibilityRatiosRef.current;
        let bestIdx = 0;
        let bestRatio = -1;
        for (let i = 0; i < ratios.length; i++) {
          if (ratios[i] > bestRatio) {
            bestRatio = ratios[i];
            bestIdx = i;
          }
        }

        if (bestIdx !== activeWhyIndex) {
          setIsTransitioning(true);
          setTimeout(() => {
            setActiveWhyIndex(bestIdx);
            setTimeout(() => {
              setIsTransitioning(false);
            }, 50);
          }, 250);
        }
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );

    whyImageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeWhyIndex]);

  useEffect(() => {
    const testimonialObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isTyping && displayedText === "") {
            typeText();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (testimonialRef.current) {
      testimonialObserver.observe(testimonialRef.current);
    }

    return () => testimonialObserver.disconnect();
  }, [typeText, isTyping, displayedText]);

  const designedSection = useFadeIn();
  const whyChooseHeader = useFadeIn();
  const servicesSection = useFadeIn();
  const ourGallerySection = useFadeIn();
  const galleryCarousel = useFadeIn();

  return (
    <Layout>
      <Hero 
        title="Utah Pool Builder"
        titleLine2="Build, Repair & Remodel"
        subtitle="Utah's trusted pool builder. One in-house team from excavation to finish."
        backgroundVideoSrc="/bestway-images/hero-video.mp4"
        darkerOverlay={true}
        ctaText="Free Estimate"
      />

      <section className="py-20 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={designedSection.ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start transition-all duration-1000 ${
              designedSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <h2 className="text-5xl md:text-4xl lg:text-5xl font-bold text-text-strong mb-8 leading-tight" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                From the Ground Up<br />
                <span className="italic">Pool Constructions</span>
              </h2>
            </div>
            <div>
              <p className="text-base text-text mb-8 leading-relaxed">
                We help you place the pool in the best spot in your home to make the most of every space in your backyard. We take pride in having a full team for all of our projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-8">
                <Link to="/contact" onClick={() => {
                  setTimeout(() => {
                    const formElement = document.getElementById('contact-form');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }, 100);
                }} className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="w-4 h-4 bg-text-strong"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">Contact Us</span>
                </Link>
                <Link to="/about" className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="w-4 h-4 border-2 border-text-strong bg-bg-alt"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">Read More About Us</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <div 
        className="overflow-hidden w-full pb-20" 
        style={{backgroundColor: '#eae3d7'}}
      >
        <div 
          className="flex gap-2 mb-2 px-6"
          style={{
            transform: `translateX(${scrollY * -0.1}px)`,
            willChange: 'transform'
          }}
        >
          {nicePoolImages.slice(0, 6).map((src, idx) => (
            <div key={idx} className="flex-shrink-0 w-96 h-72 overflow-hidden">
              <img 
                src={src}
                alt={`Pool ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div 
          className="flex gap-2 justify-end px-6"
          style={{
            transform: `translateX(${scrollY * 0.1}px)`,
            willChange: 'transform'
          }}
        >
          {nicePoolImages.slice(6, 11).map((src, idx) => (
            <div key={`row2-${idx}`} className="flex-shrink-0 w-96 h-72 overflow-hidden">
              <img 
                src={src}
                alt={`Pool ${idx + 7}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <section className="pt-20 pb-40" style={{backgroundColor: '#eae3d7'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={whyChooseHeader.ref}
            className={`text-center transition-all duration-1000 ${
              whyChooseHeader.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-strong mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              Why Choose Us?
            </h2>
            <p className="text-xl text-text max-w-2xl mx-auto">
              Specialists in comprehensive Pool Construction, Repairs and Remodeling Excellence. When it comes to transforming your living space, trust the experts at Bestway Utah.
            </p>
          </div>
        </div>
      </section>

      <section className="relative" style={{backgroundColor: '#F5F1ED'}}>
        <div className="absolute inset-0">
          {whyChooseBackgrounds.map((src, idx) => (
            <div
              key={idx}
              ref={(el) => (whyImageRefs.current[idx] = el)}
              data-index={idx}
              className="h-[70vh] md:h-[80vh] lg:h-[70vh] w-full overflow-hidden relative"
            >
              <img
                src={src}
                alt={`Why Choose Bestway Utah — ${whyChooseItems[idx].title}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-text-strong/40"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 pt-12 pb-0 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="sticky top-1/2 -translate-y-1/2 self-start mt-24 md:mt-40 lg:mt-56">
                <div 
                  className={`transition-all duration-300 ease-in-out transform ${
                    isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                    {whyChooseItems[activeWhyIndex].title}
                  </h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    {whyChooseItems[activeWhyIndex].text}
                  </p>
                </div>
              </div>

              <div className="h-[240vh] md:h-[280vh]">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16 md:pt-0 pb-16" style={{backgroundColor: '#F5F1ED'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={servicesSection.ref}
            className={`transition-all duration-1000 ${
              servicesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="space-y-6 lg:col-span-2">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-strong" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                Pool Construction, Repairs<br />and <span className="italic">Remodeling</span>
              </h2>
              <div>
                <p className="text-base text-text leading-relaxed">
                  Experience comprehensive Pool Construction, Repairs and Remodeling services in Utah. We are expert professionals with over 16 years of experience in the industry, prioritizing customer satisfaction and meeting customer needs.
                </p>
              </div>
              
              <div className="flex items-center gap-3 mt-6">
                <Link to="/services" className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="w-4 h-4 bg-text-strong"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">View Services</span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl md:text-4xl font-bold text-text-strong">{stat.value}</p>
                    <p className="text-xs md:text-sm text-text mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-10">
              <div>
                <div className="w-full h-56 md:h-64 overflow-hidden bg-bg-muted">
                  <img 
                    src="/bestway-images/plaster.webp"
                    alt="Plaster"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <Link 
                    to="/services"
                    className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity"
                  >
                    <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
                    <span className="text-sm font-medium uppercase tracking-wide">Plaster</span>
                  </Link>
                </div>
              </div>

              <div>
                <div className="w-full h-56 md:h-64 overflow-hidden bg-bg-muted">
                  <img 
                    src="/bestway-images/copping.webp"
                    alt="Copping"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <Link 
                    to="/services"
                    className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity"
                  >
                    <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
                    <span className="text-sm font-medium uppercase tracking-wide">Copping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section ref={testimonialRef} className="relative flex items-center justify-center overflow-hidden" style={{ height: '130vh' }}>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/bestway-images/gallery-15.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-text-strong/40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ color: 'white' }}>
            {displayedText.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < displayedText.split('\n').length - 1 && <br />}
              </span>
            ))}
            {isTyping && <span className="animate-pulse">|</span>}
          </h2>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden" style={{backgroundColor: '#eae3d7'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={ourGallerySection.ref}
            className={`max-w-xl transition-all duration-1000 ${
              ourGallerySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-strong mb-6" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              Gallery
            </h2>
            <p className="text-sm text-text mb-6">
              Explore our gallery to see inspired pool construction, repairs, and remodeling projects across Utah. 
              Discover thoughtful details, beautiful finishes, and pools built to last.
            </p>
            <Link to="/gallery" className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity">
              <div className="w-4 h-4 bg-text-strong"></div>
              <span className="text-sm font-medium uppercase tracking-wide">View All Images</span>
            </Link>
          </div>
        </div>

        <div 
          ref={galleryCarousel.ref}
          className={`-mx-4 sm:-mx-6 lg:-mx-8 mt-8 lg:mt-12 transition-all duration-1000 ${
            galleryCarousel.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Carousel opts={{ loop: true, align: 'start' }} className="w-full">
            <CarouselContent>
              {nicePoolImages.map((src, idx) => (
                <CarouselItem key={idx} className="basis-[85%] md:basis-[75%] lg:basis-[70%]">
                  <div className="w-full h-[26rem] md:h-[32rem] lg:h-[36rem] overflow-hidden">
                    <img
                      src={src}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="right-40 bottom-6 top-auto left-auto -translate-y-0 bg-white/90 hover:bg-white text-text-strong shadow-sm ring-2 ring-accent-sand/30 hover:ring-accent-sand/50" />
            <CarouselNext className="right-28 bottom-6 top-auto -translate-y-0 bg-white/90 hover:bg-white text-text-strong shadow-sm ring-2 ring-accent-sand/30 hover:ring-accent-sand/50" />
          </Carousel>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

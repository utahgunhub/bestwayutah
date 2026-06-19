import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { 
  ChefHat, 
  Bath, 
  Home, 
  Plus, 
  Palette,
  Star,
  Quote
} from "lucide-react";
// Using gallery images instead of assets
const bathroomProject = "/avondale/1224 Avondale Ave SE High Res_05.jpg";
const livingRoomProject = "/fox-croft-photos/12-Foxcroft Rd NW-12.jpg";
const heroKitchen = "/fox-croft-photos/05-Foxcroft Rd NW-5.jpg";

const services = [
  {
    icon: <ChefHat size={32} />,
    title: "Kitchen Remodeling",
    description: "Transform your kitchen into the heart of your home with custom cabinetry, modern appliances, and thoughtful design.",
    href: "/services",
    image: heroKitchen
  },
  {
    icon: <Bath size={32} />,
    title: "Bathroom Renovation",
    description: "Create your personal spa retreat with luxurious fixtures, custom tile work, and optimal functionality.",
    href: "/services",
    image: bathroomProject
  },
  {
    icon: <Home size={32} />,
    title: "Whole Home Remodel",
    description: "Reimagine your entire living space with comprehensive renovation that maximizes comfort and style.",
    href: "/services",
    image: livingRoomProject
  }
];

const featuredProjects = [
  {
    title: "Modern Farmhouse Kitchen",
    location: "Atlanta, Georgia",
    image: heroKitchen,
    href: "/gallery",
    category: "Kitchen"
  },
  {
    title: "Spa-Inspired Bathroom",
    location: "Charleston, South Carolina", 
    image: bathroomProject,
    href: "/gallery",
    category: "Bathroom"
  },
  {
    title: "Open Concept Living",
    location: "Atlanta, Georgia",
    image: livingRoomProject,
    href: "/gallery", 
    category: "Whole Home"
  }
];

const whyChooseItems = [
  {
    title: "Transparent & Frequent Communication",
    text:
      "From preconstruction to project completion, we keep you informed every step of the way. Our proactive communication approach means no surprises, just clear updates, regular check ins, and immediate access to your project team whenever you need answers.",
  },
  {
    title: "High-Touch Organization with White Glove Philosophy",
    text:
      "Experience a level of service that goes beyond construction. Our white glove approach means careful attention to every detail, organized workflows that respect your time and property, and a commitment to excellence that shows in every interaction.",
  },
  {
    title: "Price Certainty You Can Trust",
    text:
      "The numbers we agree upon in preconstruction are the numbers you will pay at completion. No hidden fees, no unexpected costs, no budget creep. We honor our commitments and provide complete financial transparency from start to finish.",
  },
  {
    title: "Timeline Expectations You Can Count On",
    text:
      "We do not just promise a timeline. We deliver on it. Our proven project management process, experienced team coordination, and realistic scheduling keep your project on track. When we commit to a completion date, we mean it.",
  },
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
  
  const fullText = "More than just a home builder, we are dream weavers";

  // Custom hook for fade-in animation
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

  // Typewriter animation effect
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
    }, 50); // Adjust speed here (lower = faster)
    
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

  // Testimonial intersection observer for typewriter effect
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

  // Create fade-in animations for each section
  const designedSection = useFadeIn();
  const gallerySection = useFadeIn();
  const whyChooseHeader = useFadeIn();
  const servicesSection = useFadeIn();
  const ourGallerySection = useFadeIn();
  const galleryCarousel = useFadeIn();

  return (
    <Layout>
      {/* Hero Section */}
      <Hero 
        title="Designed for You, Built for Life"
        subtitle="New home plans and thoughtful remodels built with care and precision."
        backgroundVideoSrc="/foxcroft-hero.mp4"
        darkerOverlay={true}
      />

      {/* Our Services */}
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
                Custom Home<br />
                <span className="italic">Builders</span>
              </h2>
            </div>
            <div>
                    <p className="text-base text-text mb-8 leading-relaxed">
                      Bradford Custom Homes is the choice for discerning homeowners who demand transparency. Our homes don't just elevate wellbeing and craftsmanship; they inspire awe, endure as timeless masterpieces, and embody the unique legacy of those privileged enough to live within them.
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
                  <span className="text-sm font-medium uppercase tracking-wide">Get In Touch</span>
                </Link>
                <Link to="/gallery" className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="w-4 h-4 border-2 border-text-strong bg-bg-alt"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">Discover Portfolio</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Gallery Images with Parallax - Full Width */}
      <div 
        className="overflow-hidden w-full pb-20" 
        style={{backgroundColor: '#eae3d7'}}
      >
        {/* First Row - moves left */}
        <div 
          className="flex gap-2 mb-2 px-6"
          style={{
            transform: `translateX(${scrollY * -0.1}px)`,
            willChange: 'transform'
          }}
        >
          {[
            '/homepage-paralax-images/LaRuche_MacBuilt_17 Gilmer Way_Obie Entry-08.jpg',
            '/homepage-paralax-images/58-Foxcroft Rd NW-58.jpg',
            '/homepage-paralax-images/LaRuchePhoto-MacBuilt-147CarlSandersDr-Daytime-6.jpg',
            '/homepage-paralax-images/31-Foxcroft Rd NW-31.jpg',
            '/homepage-paralax-images/LaRuche_MacBuilt_17 Gilmer Way_Obie Entry-05.jpg',
            '/homepage-paralax-images/18-Foxcroft Rd NW-18.jpg'
          ].map((src, idx) => (
            <div key={idx} className="flex-shrink-0 w-96 h-72 overflow-hidden">
              <img 
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Second Row - moves right */}
        <div 
          className="flex gap-2 justify-end px-6"
          style={{
            transform: `translateX(${scrollY * 0.1}px)`,
            willChange: 'transform'
          }}
        >
          {[
            '/homepage-paralax-images/LaRuchePhoto-MacBuilt-147CarlSandersDr-Daytime-2.jpg',
            '/homepage-paralax-images/04-Foxcroft Rd NW-4.jpg',
            '/homepage-paralax-images/LaRuchePhoto-MacBuilt-147CarlSandersDr-Daytime-12.jpg',
            '/homepage-paralax-images/08-Foxcroft Rd NW-8.jpg',
            '/homepage-paralax-images/LaRuche_MacBuilt_17 Gilmer Way_Obie Entry-00.jpg'
          ].map((src, idx) => (
            <div key={`row2-${idx}`} className="flex-shrink-0 w-96 h-72 overflow-hidden">
              <img 
                src={src}
                alt={`Gallery ${idx + 8}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Bradford - Header */}
      <section className="pt-20 pb-40" style={{backgroundColor: '#eae3d7'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={whyChooseHeader.ref}
            className={`text-center transition-all duration-1000 ${
              whyChooseHeader.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-strong mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              Our Promise to You
            </h2>
            <p className="text-xl text-text max-w-2xl mx-auto">
              Four core commitments that set Bradford Custom Homes apart: transparency, service excellence, budget certainty, and reliable timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Bradford - Scrollytelling with full-width images */}
      <section className="relative" style={{backgroundColor: '#F5F1ED'}}>
        {/* Full-width background images */}
        <div className="absolute inset-0">
          {[
            '/3rd-section.png', // Transparent & Frequent Communication
            '/2nd-section.png', // Price Certainty You Can Trust
            '/home-gallery/home-gallery-1.png', // High-Touch Organization
            '/4th-home-page.jpg'  // Timeline Expectations
          ].map((src, idx) => (
            <div
              key={idx}
              ref={(el) => (whyImageRefs.current[idx] = el)}
              data-index={idx}
              className="h-[70vh] md:h-[80vh] lg:h-[70vh] w-full overflow-hidden relative"
            >
              <img
                src={src}
                alt={`Why Choose Bradford ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-text-strong/40"></div>
              {/* Gold stamp for first 2 sections */}
              {idx < 2 && (
                <img
                  src="/gold-stamp.png"
                  alt="Gold Award Winner"
                  className="absolute bottom-8 right-8 w-20 md:w-24 lg:w-28 z-10"
                />
              )}
              {/* Silver stamp for 3rd section */}
              {idx === 2 && (
                <img
                  src="/silver-stamp.png"
                  alt="Silver Award Winner"
                  className="absolute bottom-8 right-8 w-20 md:w-24 lg:w-28 z-10"
                />
              )}
            </div>
          ))}
        </div>

        {/* Content overlay */}
        <div className="relative z-10 pt-12 pb-0 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left: Sticky text that updates with scroll */}
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

              {/* Right: Spacer to maintain layout */}
              <div className="h-[240vh] md:h-[280vh]">
                {/* This div maintains the scroll height for the sticky positioning */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="pt-16 md:pt-0 pb-16" style={{backgroundColor: '#F5F1ED'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={servicesSection.ref}
            className={`transition-all duration-1000 ${
              servicesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
          {/* Content row */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Text content - 1/4 of row */}
            <div className="space-y-6 lg:col-span-2">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-strong" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                What We <span className="italic">Build</span>
              </h2>
              <div>
                <p className="text-base text-text leading-relaxed">
                  We design and build custom homes tailored to your lot, lifestyle, and vision. Our team also delivers refined renovations that improve flow, function, and everyday comfort.
                </p>
              </div>
              
              <div className="flex items-center gap-3 mt-6">
                <Link to="/new-construction" className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="w-4 h-4 bg-text-strong"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">VIEW NEW BUILDS</span>
                </Link>
              </div>
            </div>

            {/* Featured New Builds - two horizontal cards stacked */}
            <div className="lg:col-span-3 space-y-10">
              {/* Project 1: Fox Croft */}
              <div>
                <div className="w-full h-56 md:h-64 overflow-hidden bg-bg-muted">
                  <img 
                    src="/fox-croft-photos/01-Foxcroft Rd NW-1.jpg"
                    alt="Fox Croft"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <Link 
                    to="/projects/fox-croft"
                    className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity"
                  >
                    <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
                    <span className="text-sm font-medium uppercase tracking-wide">Fox Croft</span>
                  </Link>
                </div>
              </div>

              {/* Project 2: Stone Creek Interior */}
              <div>
                <div className="w-full h-56 md:h-64 overflow-hidden bg-bg-muted">
                  <img 
                    src="/project-stone-creek/205 Stone Creek Ct High Res_01.jpg"
                    alt="Stone Creek Interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <Link 
                    to="/projects/stone-creek"
                    className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity"
                  >
                    <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
                    <span className="text-sm font-medium uppercase tracking-wide">Stone Creek Interior</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section ref={testimonialRef} className="relative flex items-center justify-center overflow-hidden" style={{ height: '130vh' }}>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/new-builds5.png')`,
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

      {/* Our Gallery */}
      <section className="py-24 relative overflow-hidden" style={{backgroundColor: '#eae3d7'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading and copy */}
          <div 
            ref={ourGallerySection.ref}
            className={`max-w-xl transition-all duration-1000 ${
              ourGallerySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-strong mb-6" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              Our Gallery
            </h2>
            <p className="text-sm text-text mb-6">
              Explore our gallery to see inspired new builds and elevated remodels from across our portfolio. 
              Discover thoughtful details, beautiful materials, and moments that make a house feel like home.
            </p>
            <Link to="/gallery" className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity">
              <div className="w-4 h-4 bg-text-strong"></div>
              <span className="text-sm font-medium uppercase tracking-wide">VIEW ALL IMAGES</span>
            </Link>
          </div>
        </div>

        {/* Edge-to-edge carousel */}
        <div 
          ref={galleryCarousel.ref}
          className={`-mx-4 sm:-mx-6 lg:-mx-8 mt-8 lg:mt-12 transition-all duration-1000 ${
            galleryCarousel.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Carousel opts={{ loop: true, align: 'start' }} className="w-full">
            <CarouselContent>
              {[
                '/new-builds6.jpg',
                '/home-gallery/home-gallery-3.png',
                '/new-builds7.jpg',
                '/home-gallery/home-gallery-4.png',
                '/home-gallery/home-gallery-5.png',
                '/home-gallery/home-gallery-6.png',
                '/home-gallery/home-gallery-7.png',
                '/home-gallery/home-gallery-8.png',
                '/home-gallery/home-gallery-9.png',
                '/home-gallery/home-gallery-10.png',
                '/home-gallery/home-gallery-11.png',
                '/home-gallery/home-gallery-12.png',
                '/home-gallery/home-gallery-13.png',
                '/home-gallery/home-gallery-14.png'
              ].map((src, idx) => (
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

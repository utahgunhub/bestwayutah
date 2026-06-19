import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Check, Phone, Mail, Plus, Minus } from "lucide-react";

const inspirationalBuilds = [
  {
    title: "Lee Circle",
    location: "Pine Hills",
    type: "Addition",
    year: "'24",
    image: "/lee-circle-house.jpg",
    link: "/gallery"
  },
  {
    title: "Avondale",
    location: "Boulevard Heights",
    type: "Custom",
    year: "'24",
    image: "/avondale/1224 Avondale Ave SE High Res_01.jpg",
    link: "/projects/avondale"
  },
  {
    title: "Post Oak",
    location: "Post Oak",
    type: "Basement",
    year: "'24",
    image: "/anderson-basement/3624 Post Oak Tritt Rd High Res_10.jpg",
    link: "/projects/anderson-basement"
  },
  {
    title: "Fox Croft",
    location: "Hamilton Township",
    type: "Kitchen",
    year: "'24",
    image: "/fox-croft-photos/09-Foxcroft Rd NW-9.jpg",
    link: "/projects/fox-croft"
  }
];

const testimonials = [
  {
    name: "Charlie E.",
    role: "Homeowners",
    quote: "Bradford exceeded every expectation we had with our custom build. We came to them needing ALOT of help and they checked every box and some."
  },
  {
    name: "Eugene",
    role: "Homeowners",
    quote: "Cody and his team do great homes! Very detailed, quality work, good pricing, professional team pleasure doing business with. Thank you guys. Definitely recommend!"
  }
];

const processSteps = [
  {
    number: "1",
    title: "CONSULTATION",
    description: "We start by getting to know you and your lifestyle needs. Whether you're downsizing or looking for specific features, we'll design your home around what matters most to you."
  },
  {
    number: "2",
    title: "DESIGN",
    description: "Our team of architects and designers will work closely with you to customize your floor plan, finishes, and features. Every detail is chosen with your vision in mind."
  },
  {
    number: "3",
    title: "BUILD",
    description: "Once your design is finalized, we move forward with construction. You'll be kept up to date with regular progress reports, and we'll work hard to stay on schedule and within your budget."
  },
  {
    number: "4",
    title: "MOVE IN",
    description: "Before you move in, we'll do a final walk-through with you to ensure every aspect of your home meets our high standards—and your satisfaction."
  }
];

const heroImages = [
  "/lee-cricle-bathroom.jpg", // White bathroom image
  "/okun-photos/43-okun-43.jpg" // Dark kitchen/bar image
];

export default function CustomHomePlans() {
  const [scrollY, setScrollY] = useState(0);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [quoteDisplayed, setQuoteDisplayed] = useState("");
  const [isQuoteTyping, setIsQuoteTyping] = useState(false);
  const hasStartedQuoteRef = useRef(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    zipCode: "",
    timeline: "Now",
    budget: "$1M - $2M",
    hasLand: "Yes",
    landBudget: "$100K-$200K",
    contactPreference: "Phone"
  });

  const useFadeIn = (threshold = 0.1) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, [threshold]);

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

  // Auto-rotate hero images
  useEffect(() => {
    if (!autoplayEnabled) return;
    
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [autoplayEnabled]);

  const heroSection = useFadeIn();
  const visionSection = useFadeIn();
  const journeySection = useFadeIn();
  const quoteSection = useFadeIn();
  const buildsSection = useFadeIn();
  const testimonialsSection = useFadeIn();
  const processSection = useFadeIn();
  const formSection = useFadeIn();
  // Horizontal gallery (Inspirational Builds)
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryScrollPosition, setGalleryScrollPosition] = useState(0);
  // Journey accordion + parallax strip
  const [expandedJourneyItem, setExpandedJourneyItem] = useState<number | null>(0);
  const topStripRef = useRef<HTMLDivElement | null>(null);
  const imagesGridRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const handleHeroClick = (index: number) => {
    setActiveHeroIndex(index);
    setAutoplayEnabled(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  // Track horizontal scroll for inspirational builds (subtle parallax)
  useEffect(() => {
    const handleGalleryScroll = () => {
      if (galleryRef.current) {
        setGalleryScrollPosition(galleryRef.current.scrollLeft);
      }
    };

    const el = galleryRef.current;
    if (el) {
      el.addEventListener('scroll', handleGalleryScroll);
      return () => el.removeEventListener('scroll', handleGalleryScroll);
    }
  }, []);

  // Parallax for the three-image top strip in Journey section
  useEffect(() => {
    const applyParallax = () => {
      if (!topStripRef.current || !imagesGridRef.current) return;
      const rect = topStripRef.current.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const passed = window.innerHeight - rect.top;
      const progress = Math.min(Math.max(passed / total, 0), 1);
      const startOffsetPx = 80;
      const travelPx = 140;
      const translateX = startOffsetPx - progress * travelPx;
      imagesGridRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        applyParallax();
      });
    };

    applyParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', applyParallax as any);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', applyParallax as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Typewriter effect for the Nate Berkus quote in the vision section
  useEffect(() => {
    if (!visionSection.isVisible || hasStartedQuoteRef.current) return;
    hasStartedQuoteRef.current = true;
    const fullQuote = "\"Your home should tell the story of who you are, and be the collection of what you love.\"";

    setIsQuoteTyping(true);
    setQuoteDisplayed("");
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullQuote.length) {
        setQuoteDisplayed(fullQuote.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsQuoteTyping(false);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [visionSection.isVisible]);

  // Parallax effect for process section text elements
  useEffect(() => {
    const textElements = document.querySelectorAll('[data-parallax-text]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', '-translate-x-20', 'translate-x-20');
            entry.target.classList.add('opacity-100', 'translate-x-0');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    textElements.forEach((el) => observer.observe(el));

    return () => {
      textElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Scroll animation for service area cities
  useEffect(() => {
    const cityElements = document.querySelectorAll('[data-parallax-city]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    cityElements.forEach((el) => observer.observe(el));

    return () => {
      cityElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images with Swipe Transition */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(${(index - activeHeroIndex) * 100}%)`,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
          ))}
        </div>

        {/* Content Container */}
        <div className="w-[80%] mx-auto py-32 relative z-10 flex items-center min-h-screen">
          {/* Left side - Main Content with Decorative Border */}
          <div className="flex-1">
            <div 
              ref={heroSection.ref}
              className={`relative transition-all duration-1000 ${
                heroSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Decorative L-shaped border with draw animation (position unchanged) */}
              <div key={`l-accent-${activeHeroIndex}`} className="absolute -left-4 -top-4 w-64 h-64 pointer-events-none">
                <span className="absolute left-0 top-0 w-1 h-full bg-accent-primary draw-vert" />
                <span className="absolute left-0 top-0 h-1 w-full bg-accent-primary draw-horiz" />
              </div>
              {/* Bottom accent line with matching thickness and draw animation */}
              <div key={`bottom-line-${activeHeroIndex}`} className="absolute -left-2 -bottom-2 w-32 h-1 bg-accent-primary draw-line"></div>
              
              <div className="pl-8 pt-8 pb-12">
                {activeHeroIndex === 0 ? (
                  <>
                    <h1 
                      className="text-white leading-tight mb-6" 
                      style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
                    >
                      <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Turn Your Dream</div>
                      <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">Into A Home</div>
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">
                      Every great home begins with a plan.
                    </p>
                    <Link to="/contact" onClick={() => {
                      setTimeout(() => {
                        const formElement = document.getElementById('contact-form');
                        if (formElement) {
                          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }}>
                      <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                        Schedule Your Private Consultation
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <h1 
                      className="text-white leading-tight mb-6" 
                      style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
                    >
                      <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">From Concept</div>
                      <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">To Completion</div>
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">
                      Your vision, our expertise.
                    </p>
                    <Link to="/contact" onClick={() => {
                      setTimeout(() => {
                        const formElement = document.getElementById('contact-form');
                        if (formElement) {
                          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }, 100);
                    }}>
                      <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                        Explore Our Process
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Right side - Numbered Sections (Carousel Controls) - Outside container to touch edge */}
        <div className="hidden lg:block absolute bottom-20 right-0 z-20">
          <div className="bg-white flex">
            <button
              onClick={() => handleHeroClick(0)}
              className={`px-12 py-8 flex items-center gap-6 transition-all duration-300 cursor-pointer ${
                activeHeroIndex === 0 
                  ? 'bg-white' 
                  : 'bg-white/80 hover:bg-white'
              }`}
            >
              <div className={`text-7xl font-bold transition-colors ${
                activeHeroIndex === 0 ? 'text-accent-primary' : 'text-text-strong/40'
              }`}>01</div>
              <div className="text-left">
                <p className="text-sm font-semibold text-text-strong whitespace-nowrap leading-tight">Why Choose</p>
                <p className="text-sm font-semibold text-text-strong whitespace-nowrap leading-tight">Bradford</p>
              </div>
            </button>
            <button
              onClick={() => handleHeroClick(1)}
              className={`pr-12 py-8 flex items-center gap-6 transition-all duration-300 cursor-pointer ${
                activeHeroIndex === 1 
                  ? 'bg-white' 
                  : 'bg-white/80 hover:bg-white'
              }`}
            >
              <div className={`text-7xl font-bold transition-colors ${
                activeHeroIndex === 1 ? 'text-accent-primary' : 'text-text-strong/40'
              }`}>02</div>
              <div className="text-left">
                <p className="text-sm font-semibold text-text-strong whitespace-nowrap leading-tight">The Custom Home</p>
                <p className="text-sm font-semibold text-text-strong whitespace-nowrap leading-tight">Journey</p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Vision + Quote Section (two-column layout) */}
      <section className="py-24 bg-white">
        <div className="w-[80%] mx-auto">
          {/* Centered Section Header */}
          <div 
            ref={visionSection.ref}
            className={`text-center mb-12 transition-all duration-1000 ${
              visionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-sm tracking-[0.2em] text-accent-primary mb-4">LET'S BUILD YOURS TOGETHER</p>
            <h2 className="text-text-strong leading-tight max-w-5xl mx-auto" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              <span className="block text-4xl md:text-5xl lg:text-6xl">Create A Home</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl">That Reflects Your Vision, <span className="text-accent-primary italic">For You.</span></span>
            </h2>
          </div>

          <div 
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start transition-all duration-1000 ${
              visionSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Left (now): Image + Callout */}
            <div className="lg:col-span-6">
              <div className="relative w-full">
                {/* Accent frame */}
                <div className="absolute -left-6 -top-6 w-24 h-24 border-t-4 border-l-4 border-accent-primary"></div>
                <img
                  src="/lee-circle-house.jpg"
                  alt="Living room inspiration"
                  className="w-full h-auto object-cover shadow-lg"
                />
              </div>

              {/* Callout moved to right column */}
            </div>

            {/* Right (now): Copy */}
            <div className="lg:col-span-6">
              <div className="space-y-5 text-text leading-relaxed text-base md:text-lg">
                <p>
                  Designing a true custom home goes far beyond picking finishes—it's about creating a prototype of your life, tailored to how you want to live every day. At Bradford, we don't pull plans from a shelf; we design spaces that align with your lifestyle, your priorities, and the quality you expect at a higher level of investment. From the first sketch to the moment you move in, every step is intentional, seamless, and centered on delivering a home that feels unmistakably yours.
                </p>
                <p>
                  Bradford offers expert guidance, personalized design solutions, and transparent project management, so you can relax and enjoy the journey. Whether you want a sprawling estate, a contemporary retreat, or a family-centric home, your vision is at the heart of every decision.
                </p>
                <div className="pt-4">
                  <blockquote className="italic text-2xl md:text-3xl lg:text-4xl text-text" style={{ fontFamily: "'PP Editorial Old', serif" }}>
                    {quoteDisplayed}
                    {isQuoteTyping && <span className="animate-pulse">|</span>}
                  </blockquote>
                  <p className="mt-3 text-text-strong/60 text-base">— Nate Berkus</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Custom Home Journey Section */}
      <section className="pt-0 pb-24 bg-white">
        <div className="w-[80%] mx-auto">
          {/* Header copy moved near accordion per request */}
          <div 
            ref={journeySection.ref}
            className={`mb-6 transition-all duration-1000 ${
              journeySection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          />

          {/* Top 3 images strip with gentle parallax (kept as requested) */}
          <div ref={topStripRef} className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mb-28 md:mb-32">
            <div ref={imagesGridRef} className="grid grid-cols-3 gap-5 md:gap-8 items-end will-change-transform" style={{ transform: 'translate3d(80px, 0, 0)' }}>
              <div className="relative">
                <img src="/home-gallery/home-gallery-1.png" alt="Entryway" className="h-[200px] md:h-[280px] w-full object-cover" />
              </div>
              <div>
                <img src="/home-gallery/home-gallery-3.png" alt="Interior detail" className="h-[200px] md:h-[280px] w-full object-cover" />
              </div>
              <div className="relative">
                <img src="/new-builds4.png" alt="Kitchen cabinetry" className="h-[200px] md:h-[280px] w-full object-cover" />
              </div>
            </div>
          </div>

          {/* Lower grid: single video left + accordion right */}
          <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
            <div className="md:col-span-6">
              <div className="relative w-full overflow-hidden">
                <video src="/foxcroft-hero.mp4" className="w-full h-[360px] md:h-[460px] object-cover" autoPlay muted loop playsInline></video>
              </div>
            </div>

            <div className="md:col-span-6">
              {/* Section header above the dropdowns */}
              <h3 className="text-4xl md:text-5xl lg:text-6xl text-text-strong leading-tight mb-6" style={{ fontFamily: "'PP Editorial Old', serif" }}>
                <span className="font-light">The Custom Home</span> <span className="italic font-normal">Journey</span>
              </h3>
              <div className="divide-y divide-text/20 border-b border-text/20">
                {[
                  {
                    title: 'Exploration and Vision: Discover What You Want',
                    details: 'This phase is all about exploring ideas, styles, and inspirations. Bradford helps you navigate design options, architectural styles, and layouts that suit your lifestyle. We provide design consultations and plan reviews, helping you focus your ideas and create a vision for your home.'
                  },
                  {
                    title: 'Concept and Planning: Aligning Your Vision with Practicality',
                    details: 'We work with you to refine your vision into a practical plan that balances your desires with your budget and site constraints. Our team collaborates with architects and engineers to ensure every detail is considered.'
                  },
                  {
                    title: 'Design Development: Bringing Your Ideas to Life',
                    details: 'Watch your vision take shape as we develop detailed architectural plans, select premium materials, and finalize the design elements that will make your home unique. Every decision is made with your input and approval.'
                  },
                  {
                    title: 'Construction: Building with Precision and Expertise',
                    details: 'Our skilled craftsmen bring your plans to life with meticulous attention to detail. We maintain open communication throughout the build, providing regular updates and ensuring the highest standards of quality at every stage.'
                  }
                ].map((item, index) => (
                  <div key={index} className="py-4">
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => setExpandedJourneyItem(prev => prev === index ? null : index)}>
                      <div>
                        <div className="font-semibold text-base md:text-lg text-text-strong">{item.title}</div>
                        {expandedJourneyItem === index && (
                          <div className="text-sm md:text-base text-text mt-3 leading-relaxed">
                            {item.details}
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0 w-[18px] h-[18px] text-text flex items-center justify-center mt-1">
                        {expandedJourneyItem === index ? (
                          <span className="block h-[2px] w-[14px] bg-current rounded-sm" />
                        ) : (
                          <Plus className="h-[18px] w-[18px]" strokeWidth={2.5} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspirational Builds - Horizontal Scroll (matches Signature Residences) */}
      <section className="py-24 bg-bg-alt">
        <div className="w-[80%] mx-auto mb-12">
          <div 
            ref={buildsSection.ref}
            className={`transition-all duration-1000 ${
              buildsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl text-text-strong mb-3" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              Inspirational Builds
            </h2>
            <p className="text-text text-base md:text-lg">Browse recent custom homes and transformations.</p>
          </div>
        </div>

        {/* Horizontal scrolling gallery - full-bleed to edges */}
        <div 
          ref={galleryRef}
          className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scroll-smooth hide-scrollbar w-screen relative left-1/2 -translate-x-1/2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {inspirationalBuilds.map((project, index) => (
            <div
              key={index}
              className="group relative flex-shrink-0 w-[85vw] md:w-[600px] h-[500px] overflow-hidden cursor-pointer"
              style={{ transform: `translateX(${galleryScrollPosition * -0.05}px)` }}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-text-strong via-text-strong/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-white/80 text-sm font-medium mb-4 uppercase tracking-wide">
                  {project.location} • {project.type}
                </p>
                <Link 
                  to={project.link ?? '/gallery'}
                  className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
                >
                  <div className="w-4 h-4 border-2 border-white bg-transparent"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">View Full Project</span>
                </Link>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 border-4 border-accent-sand opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-text">
            <span className="text-sm">Scroll to explore</span>
          </div>
        </div>
      </section>


      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="w-[90%] max-w-7xl mx-auto">
          <div 
            ref={processSection.ref}
            className={`text-center mb-20 transition-all duration-1000 ${
              processSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-text-strong mb-2" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              Our <span className="relative inline-block">Process
                <span className="absolute bottom-0 left-0 w-full h-1 bg-accent-primary" style={{ bottom: '-8px' }}></span>
              </span>
            </h2>
          </div>

          <div className="space-y-0">
            {/* Step 1 - Image right, text slides from left */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div 
                className="order-2 md:order-1 transition-all duration-1000 opacity-0 -translate-x-20"
                data-parallax-text="left"
              >
                <div className="text-7xl md:text-8xl text-accent-primary mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>1</div>
                <h3 className="text-2xl md:text-3xl text-text-strong mb-6 uppercase tracking-wide" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 600 }}>CONSULTATION</h3>
                <p className="text-base md:text-lg text-text leading-relaxed">
                  We start by getting to know you and your lifestyle needs. Whether you're downsizing or looking for specific features, we'll design your home around what matters most to you.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="/fox-croft-photos/15-Foxcroft Rd NW-15.jpg"
                  alt="Consultation"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            {/* Step 2 - Image left, text slides from right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-1">
                <img 
                  src="/okun-photos/23-okun-23.jpg"
                  alt="Design"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div 
                className="order-2 transition-all duration-1000 opacity-0 translate-x-20"
                data-parallax-text="right"
              >
                <div className="text-7xl md:text-8xl text-accent-primary mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>2</div>
                <h3 className="text-2xl md:text-3xl text-text-strong mb-6 uppercase tracking-wide" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 600 }}>DESIGN</h3>
                <p className="text-base md:text-lg text-text leading-relaxed">
                  Our team of architects and designers will work closely with you to customize your floor plan, finishes, and features. Every detail is chosen with your vision in mind.
                </p>
              </div>
            </div>

            {/* Step 3 - Image right, text slides from left */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div 
                className="order-2 md:order-1 transition-all duration-1000 opacity-0 -translate-x-20"
                data-parallax-text="left"
              >
                <div className="text-7xl md:text-8xl text-accent-primary mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>3</div>
                <h3 className="text-2xl md:text-3xl text-text-strong mb-6 uppercase tracking-wide" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 600 }}>BUILD</h3>
                <p className="text-base md:text-lg text-text leading-relaxed">
                  Once your design is finalized, we move forward with construction. You'll be kept up to date with regular progress reports, and we'll work hard to stay on schedule and within your budget.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src="/avondale/1224 Avondale Ave SE High Res_08.jpg"
                  alt="Build"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>

            {/* Step 4 - Image left, text slides from right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-1">
                <img 
                  src="/anderson-basement/3624 Post Oak Tritt Rd High Res_05.jpg"
                  alt="Move In"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div 
                className="order-2 transition-all duration-1000 opacity-0 translate-x-20"
                data-parallax-text="right"
              >
                <div className="text-7xl md:text-8xl text-accent-primary mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>4</div>
                <h3 className="text-2xl md:text-3xl text-text-strong mb-6 uppercase tracking-wide" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 600 }}>MOVE IN</h3>
                <p className="text-base md:text-lg text-text leading-relaxed">
                  Before you move in, we'll do a final walk-through with you to ensure every aspect of your home meets our high standards—and your satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Service Areas */}
      <section id="contact-form" className="py-20 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">
            {/* Left: Service Areas (Sticky) */}
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="space-y-8">
                {/* Logo */}
                <div>
                  <img 
                    src="/full-logo-black.png" 
                    alt="Bradford Custom Homes & Remodeling" 
                    className="h-16 w-auto"
                  />
                </div>

                {/* Service Areas Header */}
                <div>
                  <p className="text-2xl font-bold text-text-strong mb-4" style={{ fontFamily: "'PP Editorial Old', serif" }}>Service Areas</p>
                  <p className="text-text mb-6">Building custom homes across Metro Atlanta</p>
                </div>

                {/* Cities List */}
                <div className="space-y-3">
                  {[
                    'ACWORTH',
                    'MARIETTA',
                    'ATLANTA',
                    'WOODSTOCK',
                    'KENNESAW',
                    'CARTERSVILLE',
                    'ROSWELL',
                    'ALPHARETTA',
                    'BUCKHEAD',
                    'CUMMING',
                    'DUNWOODY',
                    'EAST COBB',
                    'MILTON'
                  ].map((city) => (
                    <div
                      key={city}
                      className="flex items-center gap-3 text-text-strong hover:text-accent-primary transition-colors cursor-pointer group"
                    >
                      <div className="w-1 h-1 bg-accent-primary rounded-full group-hover:w-2 group-hover:h-2 transition-all"></div>
                      <span className="text-sm font-medium tracking-wide">{city}</span>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="pt-4 border-t border-text-strong/20">
                  <p className="text-sm text-text mb-2">Questions? Call us:</p>
                  <p className="text-lg font-semibold text-text-strong">470.835.0595</p>
                </div>
              </div>
            </aside>

            {/* Right: Contact Form */}
            <div 
              ref={formSection.ref}
              className={`lg:pl-4 transition-all duration-1000 ${
                formSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-text-strong mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                Request Your Consultation
              </h2>
              <p className="text-text mb-8">Fill out the form below and we'll be in touch within 24 hours.</p>

              <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-text-strong mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-strong mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-text-strong mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-strong mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-strong mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-strong mb-1">
                  What is your desired timeline for receiving a quote?
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                >
                  <option>Now</option>
                  <option>1 Year</option>
                  <option>2 Years +</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-strong mb-1">
                  What is your Budget?
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                >
                  <option>$1M - $2M</option>
                  <option>$2M - $3M</option>
                  <option>$3M+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-strong mb-1">
                  Do you currently have land?
                </label>
                <select
                  name="hasLand"
                  value={formData.hasLand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              {formData.hasLand === "No" && (
                <div>
                  <label className="block text-sm font-medium text-text-strong mb-1">
                    If no, what's your ideal land budget?
                  </label>
                  <select
                    name="landBudget"
                    value={formData.landBudget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                  >
                    <option>$100K-$200K</option>
                    <option>$200K-$300K</option>
                    <option>$300K+</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-text-strong mb-1">
                  How would you like us to contact you?
                </label>
                <select
                  name="contactPreference"
                  value={formData.contactPreference}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0 outline-none"
                >
                  <option>Phone</option>
                  <option>Email</option>
                  <option>Either</option>
                </select>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="bg-accent-primary text-white px-12 py-4 text-lg font-semibold tracking-wide hover:bg-accent-primary/90 transition-all hover:scale-105"
                >
                  Request a Quote
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1A120A' }}>
        <div className="w-[80%] mx-auto text-center">
          <h2 className="text-white leading-tight mb-8" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
            <span className="block text-4xl md:text-5xl lg:text-6xl">Explore Custom Home Plans.</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl italic mt-2">Schedule a Consultation Today</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium">
                Talk to an Expert Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Local CSS for draw animations (keeps layout unchanged) */}
      <style>{`
        @keyframes drawVert { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes drawHoriz { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes drawLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .draw-vert { transform-origin: top left; transform: scaleY(0); animation: drawVert 800ms ease-out 300ms forwards; }
        .draw-horiz { transform-origin: left top; transform: scaleX(0); animation: drawHoriz 800ms ease-out 900ms forwards; }
        .draw-line { transform-origin: left center; transform: scaleX(0); animation: drawLine 800ms ease-out 1500ms forwards; }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </Layout>
  );
}


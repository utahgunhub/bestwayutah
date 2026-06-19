import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Home,
  Hammer,
  Pencil,
  Leaf,
  Zap,
  Award,
  Palette,
  ChevronRight,
  ArrowRight,
  Wrench,
  Paintbrush,
  Plus,
  Minus
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// Using gallery images instead of assets
const heroKitchen = "/fox-croft-photos/05-Foxcroft Rd NW-5.jpg";
const bathroomProject = "/avondale/1224 Avondale Ave SE High Res_05.jpg";
const livingRoomProject = "/fox-croft-photos/12-Foxcroft Rd NW-12.jpg";

// services section removed

const featuredProjects = [
  {
    title: "Fox Croft (New Construction)",
    location: "Atlanta, GA",
    size: "New Build",
    image: "/fox-croft-photos/01-Foxcroft Rd NW-1.jpg",
    description: "Custom new construction residence featuring indoor-outdoor living and a Neptune spa pool.",
    link: "/projects/fox-croft"
  },
  {
    title: "Stone Creek Interior (New Construction)",
    location: "Woodstock, GA",
    size: "New Build",
    image: "/project-stone-creek/205 Stone Creek Ct High Res_01.jpg",
    description: "Luxury custom home on nearly two acres with chef's kitchen and terrace-level entertainment space.",
    link: "/projects/stone-creek"
  },
  {
    title: "Avondale Residence (New Construction)",
    location: "Atlanta, GA",
    size: "New Build",
    image: "/avondale/1224 Avondale Ave SE High Res_01.jpg",
    description: "Modern luxury new build featuring spa-inspired master bath and custom built-ins throughout.",
    link: "/projects/avondale"
  }
];

// design features section removed

// journey steps section removed

// recent homes section removed

const categories = [
  {
    icon: <Home size={40} />,
    title: "Fox Croft",
    location: "Atlanta, GA",
    description: "Custom new build with seamless indoor–outdoor living and luxurious Neptune spa pool.",
    details: "This stunning modern farmhouse showcases expansive floor-to-ceiling windows, a chef's kitchen with premium appliances, and thoughtfully designed entertaining spaces. Custom millwork and high-end finishes throughout create an atmosphere of refined elegance and comfort.",
    image: "/fox-croft-photos/01-Foxcroft Rd NW-1.jpg",
    link: "/projects/fox-croft"
  },
  {
    icon: <Home size={40} />,
    title: "Stone Creek Interior",
    location: "Woodstock, GA",
    description: "Luxury custom home on nearly two acres with gourmet kitchen and entertainment suite.",
    details: "Nestled on a private wooded lot, this residence features expansive living spaces designed for both intimate gatherings and grand entertaining. The chef's kitchen flows seamlessly into open living areas, while premium finishes define every detail.",
    image: "/project-stone-creek/205 Stone Creek Ct High Res_01.jpg",
    link: "/projects/stone-creek"
  },
  {
    icon: <Home size={40} />,
    title: "Avondale Residence",
    location: "Atlanta, GA",
    description: "Modern luxury new build with spa-inspired master suite and integrated smart home systems.",
    details: "Contemporary elegance meets functional design in this meticulously crafted home. Custom built-ins and thoughtful storage solutions maximize both beauty and practicality throughout, while high-end finishes create a sophisticated living environment.",
    image: "/avondale-cover.JPG",
    link: "/projects/avondale"
  }
];

// FAQ section removed

export default function NewConstruction() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counters, setCounters] = useState({ homes: 0, sqft: 0, satisfaction: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [galleryScrollPosition, setGalleryScrollPosition] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null);
  const [categoriesScrollProgress, setCategoriesScrollProgress] = useState(0);
  const [categoriesMaxOffset, setCategoriesMaxOffset] = useState(0);
  const categoriesSectionRef = useRef<HTMLDivElement>(null);
  const categoriesGridRef = useRef<HTMLDivElement>(null);
  const categoriesContainerRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  // Fade-in hook
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

  // Scroll position tracking
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

  // Journey steps reveal on scroll (icons animate, circle backgrounds static)
  useEffect(() => {
    const root = journeyRef.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    );
    steps.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mouse position tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate numbers
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            
            setCounters({
              homes: Math.floor(progress * 150),
              sqft: Math.floor(progress * 500000),
              satisfaction: Math.floor(progress * 100)
            });
            
            if (step >= steps) {
              clearInterval(timer);
              setCounters({ homes: 150, sqft: 500000, satisfaction: 100 });
            }
          }, interval);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Gallery scroll tracking
  useEffect(() => {
    const handleGalleryScroll = () => {
      if (galleryRef.current) {
        setGalleryScrollPosition(galleryRef.current.scrollLeft);
      }
    };

    const gallery = galleryRef.current;
    if (gallery) {
      gallery.addEventListener('scroll', handleGalleryScroll);
      return () => gallery.removeEventListener('scroll', handleGalleryScroll);
    }
  }, []);

  // Categories parallax scroll effect (smooth per scroll unit)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;

    const computeAndSet = () => {
      if (!categoriesSectionRef.current) return;
      const rect = categoriesSectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollStart = windowHeight * 0.85; // when section approaches viewport
      const scrollEnd = -windowHeight * 0.25; // when section has scrolled past
      const scrollRange = scrollStart - scrollEnd;
      const progressRaw = 1 - ((rect.top - scrollEnd) / scrollRange);
      const progress = Math.max(0, Math.min(1, progressRaw));
      setCategoriesScrollProgress(progress);

      // Slide in from the right within the navbar-aligned container
      const containerWidth = categoriesContainerRef.current?.clientWidth ?? window.innerWidth;
      const maxOffset = Math.round(containerWidth * 0.08); // travel up to ~8% of container width (even gentler)
      setCategoriesMaxOffset(maxOffset);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeAndSet();
        ticking = false;
      });
    };

    const onResize = () => {
      computeAndSet();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    computeAndSet();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);


  // removed sections
  const categoriesSection = useFadeIn();
  const featuredSection = useFadeIn();

  // Project cards show explicit descriptions in data above.

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-end justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/new-construction-hero.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-text-strong/40"></div>
        </div>

        {/* Text at bottom left - aligned with navbar */}
        <div className="absolute bottom-20 md:bottom-28 lg:bottom-32 left-0 right-0 z-10">
          <div className="w-[80%] mx-auto">
            <h1 className="text-white leading-tight mb-6" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Distinctive</div>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">Custom Homes</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">Architect‑led builds with premium materials and precise execution.</p>
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
          </div>
        </div>
      </section>

      {/* Categories - Clean Numbered Grid */}
      <section ref={categoriesSectionRef} className="pt-28 pb-20 bg-bg relative overflow-hidden">
        {/* Ultra large background text moving to the right */}
        <div 
          className="pointer-events-none absolute inset-0 select-none overflow-hidden"
          aria-hidden
        >
          <div 
            className="absolute left-1/2 font-bold text-text-strong/10 whitespace-nowrap"
            style={{
              top: '60%',
              fontSize: '16vw',
              lineHeight: 1,
              letterSpacing: '-0.06em',
              transform: `translate(-50%, -50%) translateX(${categoriesScrollProgress * categoriesMaxOffset * 1.6}px) scaleX(0.92)`
            }}
          >
            NEW BUILDS
          </div>
        </div>
        <div ref={categoriesContainerRef} className="w-[80%] mx-auto">
          <div 
            ref={categoriesSection.ref}
            className={`mb-28 transition-all duration-1000 ${
              categoriesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-strong">
                <span className="block">New Builds</span>
              </h2>
              <div className="relative max-w-md text-right">
                <div className="pt-2 pl-6">
                  <span className="block text-xl md:text-2xl text-text leading-tight">Browse recent new</span>
                  <span className="block text-xl md:text-2xl text-text leading-tight">construction masterpieces.</span>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={categoriesGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-14 xl:gap-16 will-change-transform"
            style={{
              transform: `translateX(${-categoriesScrollProgress * categoriesMaxOffset}px)`
            }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group transition-all duration-700 bg-white border border-black p-3 flex flex-col ${
                  categoriesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Image */}
                <Link to={(category as any).link ?? "/gallery"} className="block mb-6">
                  <div 
                    className="relative aspect-video overflow-hidden bg-bg-muted shadow-lg"
                    onMouseEnter={() => setHoveredCategoryIndex(index)}
                    onMouseLeave={() => setHoveredCategoryIndex(null)}
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                {/* Title */}
                <h3 className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-bold text-text-strong mb-1 tracking-tight truncate">
                  {category.title}
                </h3>
                {category.location && (
                  <p className="text-sm text-text-strong/60 mb-4">{category.location}</p>
                )}

                {/* Details */}
                {(category as any).details && (
                  <p className="text-base text-text leading-relaxed mb-6">
                    {(category as any).details}
                  </p>
                )}

                <div className="mt-auto flex">
                  <Link 
                    to={(category as any).link ?? "/gallery"}
                    className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity"
                  >
                    <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
                    <span className="text-sm font-medium uppercase tracking-wide">View Full Project</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          
        </div>
      </section>

      {/* Inspired Design & Architecture Section */}
      <section className="py-20 text-white relative overflow-hidden" style={{ backgroundColor: '#1A120A' }}>
        {/* Background image */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/bradford-method-bg.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(26, 18, 10, 0.85)' }} />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line - desktop only, extends to last circle */}
            <div className="hidden md:block absolute left-[60px] top-[60px] bottom-[60px] w-0.5" style={{ backgroundColor: '#E8DCC8' }} />

            {/* Timeline Steps */}
            <div ref={journeyRef} className="space-y-16">
              {/* Step 1: Consultation */}
              <div className="relative flex items-start gap-8 journey-step" data-step style={{ ['--delay' as any]: '0ms' }}>
                {/* Icon Circle */}
                <div 
                  className="flex-shrink-0 w-[120px] h-[120px] rounded-full flex items-center justify-center relative z-10"
                  style={{ backgroundColor: '#E8DCC8' }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black icon-svg">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4 journey-content">
                  <h3 className="text-3xl md:text-4xl mb-4 text-white italic" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                    Consultation
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    We begin by understanding your vision, lifestyle, and budget to set clear expectations and build a transparent foundation for your custom home.
                  </p>
                </div>
              </div>

              {/* Step 2: Concept */}
              <div className="relative flex items-start gap-8 journey-step" data-step style={{ ['--delay' as any]: '100ms' }}>
                {/* Icon Circle */}
                <div 
                  className="flex-shrink-0 w-[120px] h-[120px] rounded-full flex items-center justify-center relative z-10"
                  style={{ backgroundColor: '#E8DCC8' }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black icon-svg">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4 journey-content">
                  <h3 className="text-3xl md:text-4xl mb-4 text-white italic" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                    Concept
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Your ideas take form as we create preliminary designs balancing style, function, and budget to craft a personalized blueprint.
                  </p>
                </div>
              </div>

              {/* Step 3: Design Partner Integration */}
              <div className="relative flex items-start gap-8 journey-step" data-step style={{ ['--delay' as any]: '200ms' }}>
                {/* Icon Circle */}
                <div 
                  className="flex-shrink-0 w-[120px] h-[120px] rounded-full flex items-center justify-center relative z-10"
                  style={{ backgroundColor: '#E8DCC8' }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black icon-svg">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4 journey-content">
                  <h3 className="text-3xl md:text-4xl mb-4 text-white italic" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                    Design Partner Integration
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    We collaborate seamlessly with top architects and designers to refine every detail, ensuring your home is both stunning and practical.
                  </p>
                </div>
              </div>

              {/* Step 4: Build & Collaborate */}
              <div className="relative flex items-start gap-8 journey-step" data-step style={{ ['--delay' as any]: '300ms' }}>
                {/* Icon Circle */}
                <div 
                  className="flex-shrink-0 w-[120px] h-[120px] rounded-full flex items-center justify-center relative z-10"
                  style={{ backgroundColor: '#E8DCC8' }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black icon-svg">
                    <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
                    <path d="M17.64 15 22 10.64" />
                    <path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4 journey-content">
                  <h3 className="text-3xl md:text-4xl mb-4 text-white italic" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                    Build & Collaborate
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    Our expert team brings your vision to life with precision craftsmanship and proactive communication from foundation to finish.
                  </p>
                </div>
              </div>

              {/* Step 5: Final Walkthrough */}
              <div className="relative flex items-start gap-8 journey-step" data-step style={{ ['--delay' as any]: '400ms' }}>
                {/* Icon Circle */}
                <div 
                  className="flex-shrink-0 w-[120px] h-[120px] rounded-full flex items-center justify-center relative z-10"
                  style={{ backgroundColor: '#E8DCC8' }}
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black icon-svg">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                {/* Content */}
                <div className="flex-1 pt-4 journey-content">
                  <h3 className="text-3xl md:text-4xl mb-4 text-white italic" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                    Final Walkthrough
                  </h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    We conduct a thorough review to ensure flawless quality, address final adjustments, and guarantee your complete satisfaction before handover.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured Projects - Horizontal Scroll Gallery */}
      <section className="py-20 bg-bg-alt relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div 
            ref={featuredSection.ref}
            className={`transition-all duration-1000 ${
              featuredSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text-strong mb-4">
              Signature Residences
            </h2>
            <p className="text-xl text-text">
              Browse recent new construction masterpieces.
            </p>
          </div>
        </div>

        {/* Horizontal scrolling gallery */}
        <div 
          ref={galleryRef}
          className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 scroll-smooth hide-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className="group relative flex-shrink-0 w-[85vw] md:w-[600px] h-[500px] overflow-hidden cursor-pointer"
              style={{
                transform: `translateX(${galleryScrollPosition * -0.05}px)`
              }}
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlay (ignore pointer events so content beneath is clickable) */}
              <div className="absolute inset-0 bg-gradient-to-t from-text-strong via-text-strong/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-white/80 text-sm font-medium mb-4 uppercase tracking-wide">
                  {project.location} • {project.size}
                </p>
                
                {/* View button - appears on hover */}
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Link 
                    to={project.link ?? "/gallery"}
                    className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
                  >
                    <div className="w-4 h-4 border-2 border-white bg-transparent"></div>
                    <span className="text-sm font-medium uppercase tracking-wide">View Full Project</span>
                  </Link>
                </div>
              </div>

              {/* Animated border on hover (decorative only; don't block clicks) */}
              <div className="absolute inset-0 border-4 border-accent-sand opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-text">
            <span className="text-sm">Scroll to explore</span>
            <ChevronRight size={20} className="animate-pulse" />
          </div>
        </div>
      </section>

      {/* FAQ: Luxury Homebuilding */}
      <section className="py-24 bg-bg">
        <div className="w-[80%] max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-normal text-text-strong">FAQ: Luxury Homebuilding</h2>
          </div>

          <Accordion type="single" defaultValue="faq-1" collapsible className="space-y-6">
            <AccordionItem value="faq-1" className="border-none">
              <AccordionTrigger className="[&>svg]:hidden bg-[#1A120A] text-white px-6 py-5 font-normal hover:no-underline [&[data-state=open]_.icon-plus]:hidden [&[data-state=open]_.icon-minus]:block">
                <div className="flex items-center gap-3">
                  <span className="text-white">
                    <Plus className="icon-plus w-5 h-5" />
                    <Minus className="icon-minus w-5 h-5 hidden" />
                  </span>
                  <span className="italic text-base md:text-lg">How long does a custom home build typically take?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-white text-text px-6 py-6 border text-base md:text-lg" style={{ borderColor: '#D1D5DB' }}>
                Timelines vary by size and complexity, but most of our luxury builds
                range from 10–16 months once permits are in place. We provide clear
                milestones and proactive updates throughout.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border-none">
              <AccordionTrigger className="[&>svg]:hidden bg-[#1A120A] text-white px-6 py-5 font-normal hover:no-underline [&[data-state=open]_.icon-plus]:hidden [&[data-state=open]_.icon-minus]:block">
                <div className="flex items-center gap-3">
                  <span className="text-white">
                    <Plus className="icon-plus w-5 h-5" />
                    <Minus className="icon-minus w-5 h-5 hidden" />
                  </span>
                  <span className="italic text-base md:text-lg">Do you help with design and selections?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-white text-text px-6 py-6 border text-base md:text-lg" style={{ borderColor: '#D1D5DB' }}>
                Yes. We collaborate with top architects and interior designers, and
                guide you through every selection—from layouts and elevations to
                finishes and smart-home systems—so the result matches your lifestyle.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border-none">
              <AccordionTrigger className="[&>svg]:hidden bg-[#1A120A] text-white px-6 py-5 font-normal hover:no-underline [&[data-state=open]_.icon-plus]:hidden [&[data-state=open]_.icon-minus]:block">
                <div className="flex items-center gap-3">
                  <span className="text-white">
                    <Plus className="icon-plus w-5 h-5" />
                    <Minus className="icon-minus w-5 h-5 hidden" />
                  </span>
                  <span className="italic text-base md:text-lg">How do you ensure quality during construction?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-white text-text px-6 py-6 border text-base md:text-lg" style={{ borderColor: '#D1D5DB' }}>
                We use vetted trades, premium materials, and a rigorous inspection
                process at each stage. Your project manager provides site photos,
                checklists, and regular walkthroughs to verify craftsmanship.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-center mt-12">
            <Link 
              to="/contact"
              className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity"
            >
              <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
              <span className="text-sm font-medium uppercase tracking-wide">Ask a Question</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Ready to Build CTA (from Remodel page) */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1A120A' }}>
        <div className="w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-10">
            {/* Left: Big two-line headline */}
            <div className="lg:col-span-8">
              <h2 className="text-white leading-tight" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Ready to Build</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic mt-2">Your Dream Home?</span>
              </h2>
            </div>

            {/* Right: Supporting copy */}
            <div className="lg:col-span-4">
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                Let's discuss your vision and bring it to<br />life with uncompromising quality.
              </p>
              
              <Button asChild className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-5 text-base md:text-lg font-medium">
                <Link to="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Removed: What Sets Our Homes Apart */}

      {/* Removed: Your Custom Home Journey */}

      {/* Removed: Recent Custom Homes */}

      {/* Removed: FAQ Section */}

      {/* Removed: Final CTA */}

      {/* Add CSS for hiding scrollbar and animations */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        /* Journey step animations */
        .journey-step {
          will-change: transform, opacity;
        }
        .journey-step .journey-content {
          opacity: 0;
          transform: translateY(24px);
          transition: transform 700ms cubic-bezier(.2,.7,.2,1), opacity 700ms cubic-bezier(.2,.7,.2,1);
          transition-delay: var(--delay, 0ms);
        }
        .journey-step .icon-svg {
          opacity: 0;
          transform: scale(0.85);
          transition: transform 700ms cubic-bezier(.2,.7,.2,1), opacity 700ms cubic-bezier(.2,.7,.2,1);
          transition-delay: calc(var(--delay, 0ms) + 100ms);
        }
        .journey-step.is-visible .journey-content {
          opacity: 1;
          transform: translateY(0);
        }
        .journey-step.is-visible .icon-svg {
          opacity: 1;
          transform: scale(1);
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Layout>
  );
}


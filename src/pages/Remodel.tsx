import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Paintbrush, 
  Home, 
  Hammer,
  Quote,
  Play,
  Star
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
// Using gallery images instead of assets
const heroKitchen = "/fox-croft-photos/05-Foxcroft Rd NW-5.jpg";
const bathroomProject = "/avondale/1224 Avondale Ave SE High Res_05.jpg";
const livingRoomProject = "/fox-croft-photos/12-Foxcroft Rd NW-12.jpg";

const featuredProjects = [
  {
    category: "Basement Remodel",
    title: "Renaissance",
    location: "",
    before: "/okun-photos/01-okun-1.jpg",
    after: "/okun-photos/43-okun-43.jpg",
    description: "Complete basement transformation featuring a custom bar, wellness spa with sauna and cold plunge, Cambria feature wall, and Bradford's signature C-shaped seating.",
    testimonial: "Every detail was thoughtfully designed. The wellness space and theater are incredible.",
    client: "Okun Residence",
    href: "/projects/okun"
  },
  {
    category: "Basement Remodel",
    title: "Post Oak Basement",
    location: "Marietta, GA",
    before: "/post-oak-cover.png",
    after: "/post-oak-cover.png",
    description: "Luxurious basement transformation with custom finishes, elegant design elements, and sophisticated entertaining spaces.",
    testimonial: "The craftsmanship and attention to detail exceeded our expectations. Every element was perfectly executed.",
    client: "Post Oak Residence",
    href: "/projects/post-oak-basement"
  },
  {
    category: "Kitchen Remodel",
    title: "Pharoah Kitchen",
    location: "Marietta, GA",
    before: "/pharoah-kitchen/103 American Pharoah Wy High Res_01.jpg",
    after: "/pharoah-kitchen/103 American Pharoah Wy High Res_05.jpg",
    description: "Stunning kitchen transformation featuring custom cabinetry, premium appliances, and sophisticated design elements that blend functionality with timeless elegance.",
    testimonial: "The craftsmanship and attention to detail exceeded our expectations. Every element was perfectly executed.",
    client: "Pharoah Residence",
    href: "/projects/pharoah-kitchen"
  }
];

const categories = [
  {
    icon: <Wrench size={40} />,
    title: "Kitchen Remodels",
    count: "150+",
    image: "/fox-croft-photos/09-Foxcroft Rd NW-9.jpg"
  },
  {
    icon: <Paintbrush size={40} />,
    title: "Bathroom Transformations",
    count: "200+",
    image: "/remodel-bathroom.png"
  },
  {
    icon: <Home size={40} />,
    title: "Whole-Home Remodels",
    count: "80+",
    image: "/lee-circle-house.jpg"
  },
  {
    icon: <Hammer size={40} />,
    title: "Expansive Additions",
    count: "120+",
    image: "/fox-croft-photos/19-Foxcroft Rd NW-19.jpg"
  }
];

const testimonials = [
  {
    quote: "Bradford Custom Homes didn't just remodel our kitchen—they transformed how our family lives. The craftsmanship is exceptional, and their attention to our needs made all the difference.\n\nEvery detail was carefully considered, from the custom cabinetry to the premium finishes. The project was completed on time and exceeded our expectations in every way.",
    client: "Amanda Richardson",
    project: "Kitchen & Living Room Remodel",
    rating: 5,
    image: heroKitchen
  },
  {
    quote: "From start to finish, the team was professional, responsive, and dedicated to perfection. Our bathroom is now a spa-like retreat we never want to leave.\n\nThe quality of workmanship is outstanding, and the design team helped us create exactly what we envisioned. We couldn't be happier with the results and would definitely work with Bradford again.",
    client: "James Patterson",
    project: "Master Bathroom Renovation",
    rating: 5,
    image: bathroomProject
  },
  {
    quote: "We've worked with several contractors, but Bradford stands out. Their commitment to quality and communication made our whole-home remodel a pleasant experience.\n\nThe project management was flawless, and they kept us informed every step of the way. The final result is beyond what we imagined, and we're thrilled with our new home.",
    client: "Emily & Robert Davis",
    project: "Whole Home Transformation",
    rating: 5,
    image: livingRoomProject
  },
];

export default function Remodel() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [hoveredCategoryIndex, setHoveredCategoryIndex] = useState<number | null>(null);
  const projectRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [projectRowProgress, setProjectRowProgress] = useState<number[]>(
    Array(featuredProjects.length).fill(0)
  );
  const [viewportWidth, setViewportWidth] = useState(0);
  const projectRowStuckRef = useRef<boolean[]>(
    Array(featuredProjects.length).fill(false)
  );
  const [categoriesScrollProgress, setCategoriesScrollProgress] = useState(0);
  const [categoriesMaxOffset, setCategoriesMaxOffset] = useState(0);
  const categoriesSectionRef = useRef<HTMLDivElement>(null);
  const categoriesGridRef = useRef<HTMLDivElement>(null);
  const categoriesContainerRef = useRef<HTMLDivElement>(null);

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

  // Mouse tracking for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Project scroll observer
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    
    projectRefs.current.forEach((el, index) => {
      if (el) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveProjectIndex(index);
            }
          },
          { threshold: 0.6 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  // Featured rows parallax progress
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;

    const computeRows = () => {
      const next: number[] = [];
      const nextStuck: boolean[] = [...projectRowStuckRef.current];
      const windowHeight = window.innerHeight;
      // Slow down further and meet closer to mid-viewport (slightly above center)
      const start = windowHeight * 2.1; // begin even further below for slower movement
      const end = windowHeight * 0.45;  // meet around 45% viewport height
      const range = start - end;
      projectRefs.current.forEach((el) => {
        if (!el) {
          next.push(0);
          return;
        }
        const rect = el.getBoundingClientRect();
        const raw = 1 - ((rect.top - end) / range);
        let p = Math.max(0, Math.min(1, raw));
        // Mark as met when progress is effectively complete, but don't force to 1
        const i = next.length;
        if (!nextStuck[i] && p >= 0.9995) {
          nextStuck[i] = true; // permanently met
        }
        next.push(p);
      });
      setProjectRowProgress(next);
      projectRowStuckRef.current = nextStuck;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeRows();
        ticking = false;
      });
    };

    const onResize = () => {
      setViewportWidth(window.innerWidth);
      computeRows();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    computeRows();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Track viewport width separately (no updates during scroll)
  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
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
      const maxOffset = Math.round(containerWidth * 0.5); // travel up to 50% of container width
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

  const categoriesSection = useFadeIn();
  const projectsSection = useFadeIn();
  const testimonialsSection = useFadeIn();

  const getCategoryBlurb = (title: string): string => {
    switch (title) {
      case "Kitchen Remodels":
        return "Custom cabinetry, chef-ready layouts, and everyday durability.";
      case "Bathroom Transformations":
        return "Spa finishes, warm lighting, and tilework that actually lines up.";
      case "Whole-Home Remodels":
        return "Open flow, smarter storage, and details that tie every room together.";
      case "Expansive Additions":
        return "Seamless elevations, matched materials, and new open spaces.";
      default:
        return "Thoughtful design, precise execution, and finishes that last.";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-end justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/remodel-hero.jpg)`,
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
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Transform</div>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">Your Home</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">From kitchens to additions—smarter layouts, better flow, lasting finishes.</p>
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
        <div ref={categoriesContainerRef} className="w-[80%] mx-auto">
          <div 
            ref={categoriesSection.ref}
            className={`mb-20 transition-all duration-1000 ${
              categoriesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-strong">
                <span className="block">Beautiful</span>
                <span className="inline-flex items-center gap-6">
                  Transformations
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="inline-block relative top-4 md:top-5">
                    <path d="M7 7L17 17M17 17H7M17 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              <div className="relative max-w-md text-right">
                <div className="absolute -top-8 -left-10 md:-top-10 md:-left-12 text-6xl font-bold text-text-strong/10">+</div>
                <div className="pt-2 pl-6">
                  <span className="block text-xl md:text-2xl text-text leading-tight">Proof of our commitment</span>
                  <span className="block text-xl md:text-2xl text-text leading-tight">to excellence.</span>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={categoriesGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-24 xl:gap-32 will-change-transform"
            style={{
              transform: `translateX(${(1 - categoriesScrollProgress) * categoriesMaxOffset}px)`
            }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group transition-all duration-700 ${
                  categoriesSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Number */}
                <div className="text-3xl font-bold text-accent-primary/30 mb-6">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Image */}
                <Link to="/gallery" className="block mb-6">
                  <div 
                    className="relative aspect-square overflow-hidden bg-bg-muted shadow-lg"
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
                <h3 className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-bold text-text-strong mb-3 whitespace-nowrap tracking-tight">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-base text-text leading-relaxed">
                  {getCategoryBlurb(category.title)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <Link 
              to="/gallery"
              className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity"
            >
              <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
              <span className="text-sm font-medium uppercase tracking-wide">Explore Gallery</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects - Diagonal Scroll Reveal */}
      <section className="py-20 text-white relative overflow-hidden" style={{ backgroundColor: '#1A120A' }}>
        {/* Animated grid background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(white 2px, transparent 2px),
              linear-gradient(90deg, white 2px, transparent 2px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.02}px)`
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={projectsSection.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              projectsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Transformations
            </h2>
            <p className="text-xl text-white/80">
              Real projects, real results
            </p>
          </div>

          <div className="space-y-16">
            {featuredProjects.map((project, index) => (
              <div
                key={index}
                ref={(el) => (projectRefs.current[index] = el)}
                className={`flex flex-col lg:flex-row gap-0 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Side - static reveal (no swipe, no fade) */}
                <div 
                  className={"flex-1 h-96 md:h-[500px] will-change-transform"}
                  style={{
                    transform: `translate3d(${(() => {
                      const p = projectRowProgress[index] ?? 0;
                      const vw = viewportWidth >= 1024 ? viewportWidth : 0;
                      const start = (index % 2 === 0) ? -vw : vw; // left side comes from left, right side from right
                      const stuck = projectRowStuckRef.current[index];
                      return stuck ? 0 : (1 - p) * start;
                    })()}px, 0, 0)`
                  }}
                >
                  <div className={`relative h-full overflow-hidden shadow-2xl ${index % 2 === 0 ? 'rounded-l-2xl' : 'rounded-r-2xl'}`}>
                    <img
                      src={project.after}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Content Side - static (no fade/translate classes) */}
                <div 
                  className={"flex-1 h-96 md:h-[500px] flex will-change-transform"}
                  style={{
                    transform: `translate3d(${(() => {
                      const p = projectRowProgress[index] ?? 0;
                      const vw = viewportWidth >= 1024 ? viewportWidth : 0;
                      const start = (index % 2 === 1) ? -vw : vw; // left side from left, right side from right
                      const stuck = projectRowStuckRef.current[index];
                      return stuck ? 0 : (1 - p) * start;
                    })()}px, 0, 0)`
                  }}
                >
                  <div className={`bg-white p-8 md:p-12 shadow-xl h-full w-full flex flex-col ${index % 2 === 0 ? 'rounded-r-2xl' : 'rounded-l-2xl'}`}>
                    <div className="text-sm font-bold text-accent-primary mb-2 uppercase tracking-wider">
                      {project.category}
                </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-text-strong mb-3">
                      {project.title}
                </h3>
                    <p className="text-text-strong/60 mb-6">{project.location}</p>
                    <p className="text-lg text-text leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Testimonial */}
                    <div className="border-l-4 border-accent-primary pl-6 mb-8">
                      <Quote size={24} className="text-accent-primary/30 mb-2" />
                      <p className="text-text italic mb-3">"{project.testimonial}"</p>
                      <p className="text-sm font-medium text-text-strong">— {project.client}</p>
                    </div>

                    <Link 
                      to={(project as any).href ?? "/gallery"}
                      className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity"
                    >
                      <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
                      <span className="text-sm font-medium uppercase tracking-wide">View Full Project</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - New Design */}
      <section className="py-20 text-black relative overflow-hidden" style={{ backgroundColor: '#FFF9F2' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={testimonialsSection.ref}
            className={`text-center mb-16 transition-all duration-1000 ${
              testimonialsSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              What Clients Say
            </h2>
          </div>

          {/* Three Column Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="relative group flex flex-col">
              {/* Background Image */}
              <div className="relative flex-1 min-h-[420px] overflow-hidden rounded-md">
                {/* Blurred Background Image */}
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('${encodeURI(testimonial.image)}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/70"></div>
                
                {/* Content - No blur applied */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                  {/* Badge Icon */}
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
                    <img 
                      src="/testimony-vector.png" 
                      alt="Testimony badge" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <p className="text-white text-lg leading-relaxed mb-4 mt-28">
                    "{testimonial.quote.split('\n').map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < testimonial.quote.split('\n').length - 1 && <br />}
                      </span>
                    ))}"
                  </p>
                </div>
              </div>
              
              {/* Client Info Below Card */}
              <div className="mt-4 text-center">
                <p className="font-serif text-black text-lg font-semibold">{testimonial.client}</p>
                <p className="text-black/70 text-sm">{testimonial.project}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Brand Hero */}
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

      {/* Add CSS for animations */}
      <style>{`
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

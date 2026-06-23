import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Wrench, 
  Paintbrush, 
  Home, 
  Hammer,
  Quote,
  Star
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { usePageMeta } from "@/hooks/usePageMeta";
const galleryImage1 = "/bestway-images/gallery-2.webp";
const galleryImage2 = "/bestway-images/gallery-5.webp";
const galleryImage3 = "/bestway-images/gallery-8.webp";

const featuredProjects = [
  {
    category: "Our Expertise",
    title: "Plumbing",
    location: "Utah",
    after: "/bestway-images/plumbing.webp",
    description: "Proper pool plumbing keeps everything running safely and efficiently. Our team designs custom layouts, installs high-quality piping, and seals every connection before your pool is ever filled.",
    highlights: [
      "Custom layouts for pumps, filters, heaters, and equipment",
      "Leak-proof joints with full pressure testing",
      "Code-compliant installs inspected before fill-up",
    ],
    testimonial: "Reliable, trouble-free performance for years to come.",
    client: "Bestway Utah",
    href: "/services/plumbing"
  },
  {
    category: "Our Expertise",
    title: "Excavation and Rebar",
    location: "Utah",
    after: "/bestway-images/excavation-and-rebar.webp",
    description: "Every great pool starts with the right dig and the right steel. We excavate to exact depth and dimensions, then install rebar to engineer specs and local building code.",
    highlights: [
      "Precision excavation with specialized equipment",
      "Rebar tied to spec for long-term structural strength",
      "Full compliance with Utah building codes",
    ],
    testimonial: "Critical first steps for a pool that lasts.",
    client: "Bestway Utah",
    href: "/services/excavation-and-rebar"
  },
];

const categories = [
  {
    icon: <Home size={40} />,
    title: "New Swimming Pools",
    slug: "new-swimming-pools",
    image: "/bestway-images/nice-pools/pools-1.png"
  },
  {
    icon: <Wrench size={40} />,
    title: "Pool Remodels",
    slug: "pool-remodels",
    image: "/bestway-images/nice-pools/pools-15.png"
  },
  {
    icon: <Hammer size={40} />,
    title: "Shotcrete",
    slug: "shotcrete",
    image: "/bestway-images/shotcrete.webp"
  },
  {
    icon: <Paintbrush size={40} />,
    title: "Tile",
    slug: "tile",
    image: "/bestway-images/tile.webp"
  }
];

const testimonials = [
  {
    quote: "When our aging pool started to show its cracks, we knew we needed to find a company we could trust to handle the repairs. Bestway Enterprise exceeded all of our expectations. They were professional, responsive, and their craftsmanship is impeccable. The new pool looks absolutely beautiful and we couldn't be happier.",
    client: "Michael and Lisa Johnson",
    project: "Pool Repair",
    rating: 5,
    image: galleryImage1
  },
  {
    quote: "Bestway Enterprise was an absolute pleasure to work with from start to finish on our pool remodeling project. Their team of experts guided us through the entire process, from the initial design to the final installation. The quality of their work is outstanding, and they completed the project on time and within our budget.",
    client: "Sarah and David Hernandez",
    project: "Pool Remodel",
    rating: 5,
    image: galleryImage2
  },
  {
    quote: "As a busy family, we were thrilled to find Bestway Enterprise who could take care of our pool from start to finish. From the initial design consultation to the final inspection, their team was attentive, efficient, and delivered outstanding results. They handled everything in-house, which saved us time and money.",
    client: "Martinez Family",
    project: "Pool Construction",
    rating: 5,
    image: galleryImage3
  },
];

export default function Services() {
  usePageMeta({
    title: "Pool Services Utah | Bestway Utah — Build, Repair & Remodel",
    description:
      "Full-service Utah pool builder offering new swimming pools, remodels, shotcrete, tile, plumbing, and excavation. 16+ years. In-house team. Free estimates.",
    path: "/services",
    image: "/bestway-images/nice-pools/pools-11.png",
    keywords:
      "Utah pool services, pool builder Utah, pool construction, pool remodel Utah, shotcrete Utah, pool tile Utah",
  });

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
      case "New Swimming Pools":
        return "Custom in-ground pools built from the ground up — designed to fit your yard and lifestyle.";
      case "Pool Remodels":
        return "Update finishes, layout, and features to transform your existing pool.";
      case "Shotcrete":
        return "Highly durable, flexible shotcrete molded into any shape or size for your pool.";
      case "Tile":
        return "Durable, colorfast tile with many options for a unique pool surface.";
      default:
        return "Contact us to elevate your pool project.";
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
            backgroundImage: `url(/bestway-images/nice-pools/pools-11.png)`,
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
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Our</div>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">Services</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">From the Ground Up Pool Constructions. We take pride in having a full team for all of our projects.</p>
            <Link to="/contact" onClick={() => {
              setTimeout(() => {
                const formElement = document.getElementById('contact-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}>
              <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                Free Consultation
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
                <span className="block">Pool</span>
                <span className="inline-flex items-center gap-6">
                  Services
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="inline-block relative top-4 md:top-5">
                    <path d="M7 7L17 17M17 17H7M17 17V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </h2>
              <div className="relative max-w-md text-right">
                <div className="absolute -top-8 -left-10 md:-top-10 md:-left-12 text-6xl font-bold text-text-strong/10">+</div>
                <div className="pt-2 pl-6">
                  <span className="block text-xl md:text-2xl text-text leading-tight">Plumbing &</span>
                  <span className="block text-xl md:text-2xl text-text leading-tight">excavation below.</span>
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
                <Link to={`/services/${category.slug}`} className="block mb-6">
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
                <h3 className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-bold text-text-strong mb-3 tracking-tight">
                  <Link to={`/services/${category.slug}`} className="hover:text-accent-primary transition-colors">
                    {category.title}
                  </Link>
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
              Our Expertise
            </h2>
            <p className="text-xl text-white/80">
              Comprehensive pool construction, repairs and remodeling
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
                  <div className={`bg-white p-8 md:p-10 shadow-xl h-full w-full flex flex-col overflow-hidden ${index % 2 === 0 ? 'rounded-r-2xl' : 'rounded-l-2xl'}`}>
                    <div className="text-sm font-bold text-accent-primary mb-2 uppercase tracking-wider">
                      {project.category}
                </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-text-strong mb-2">
                      {project.title}
                </h3>
                    <p className="text-text-strong/60 text-sm mb-4">{project.location}</p>
                    <p className="text-base text-text leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {"highlights" in project && project.highlights && (
                      <ul className="text-sm text-text space-y-2 mb-5 list-disc pl-5">
                        {project.highlights.map((item) => (
                          <li key={item} className="leading-snug">{item}</li>
                        ))}
                      </ul>
                    )}

                    <div className="border-l-4 border-accent-primary pl-4 mb-5">
                      <Quote size={20} className="text-accent-primary/30 mb-1" />
                      <p className="text-text italic text-sm mb-1">"{project.testimonial}"</p>
                      <p className="text-xs font-medium text-text-strong">— {project.client}</p>
                    </div>

                    <Link 
                      to={project.href}
                      className="flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity shrink-0 mt-auto"
                    >
                      <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
                      <span className="text-sm font-medium uppercase tracking-wide">Learn More</span>
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
              Testimonials from Satisfied Clients
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
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                    ))}
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
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl">Ready for Your</span>
                <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl italic mt-2">Dream Pool?</span>
              </h2>
            </div>

            {/* Right: Supporting copy */}
            <div className="lg:col-span-4">
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8">
                Experience comprehensive Pool Construction, Repairs and Remodeling services in Utah.
              </p>
              
              <Button asChild className="bg-white text-black hover:bg-white/90 rounded-full px-6 py-5 text-base md:text-lg font-medium">
                <Link to="/contact">Free Consultation</Link>
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

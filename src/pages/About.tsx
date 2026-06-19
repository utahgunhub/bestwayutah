import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ChefHat,
  Home,
  Star,
  MapPin,
  Pencil,
  LifeBuoy
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

const differenceItems = [
  {
    title: "Precision Craftsmanship",
    description: "Every detail matters. Our skilled craftsmen bring decades of experience to ensure flawless execution from start to finish.",
  },
  {
    title: "Client-First Focus",
    description: "Your vision drives everything we do. We listen, collaborate, and keep you informed every step of the way.",
  },
  {
    title: "Proven Process",
    description: "Our systematic approach eliminates surprises and ensures your project stays on schedule and within budget.",
  }
];

const bradfordMethod = [
  {
    icon: <ChefHat size={32} />,
    title: "Discovery & Consultation",
    subtitle: "Understanding your vision",
    description: "We start by listening. Your needs, dreams, and lifestyle guide our approach to creating the perfect space for your family."
  },
  {
    icon: <Pencil size={32} />,
    title: "Design & Architecture",
    subtitle: "Bringing plans to life",
    description: "Our design team translates your vision into detailed plans, combining aesthetic beauty with practical functionality."
  },
  {
    icon: <Home size={32} />,
    title: "Precision Construction",
    subtitle: "Expert execution at every turn",
    description: "Skilled craftsmen bring the plans to reality with meticulous attention to quality, timeline, and your daily comfort."
  },
  {
    icon: <Star size={32} />,
    title: "Final Walkthrough",
    subtitle: "Obsessed with the details",
    description: "We inspect every corner, ensuring perfection before you see it. Nothing is complete until it exceeds your expectations."
  },
  {
    icon: <LifeBuoy size={32} />,
    title: "Ongoing Support",
    subtitle: "Here for you, even after move-in",
    description: "Our relationship doesn't end at completion. We're always here to support you and ensure your satisfaction for years to come."
  }
];

const teamMembers = [
  {
    name: "Brad Robinson",
    title: "President",
    image: "/team-pics/brad.jpg"
  },
  {
    name: "Cody Shiver",
    title: "Chief Financial Officer",
    image: "/team-pics/cody.png"
  },
  {
    name: "Ryan MacDowell",
    title: "Director of Operations",
    image: "/team-pics/ryan-macdowell.jpg.webp"
  },
  {
    name: "Marlon Hurtado",
    title: "VP of Operations",
    image: "/team-pics/marlon.jpg.webp"
  },
  {
    name: "Justin Hill",
    title: "Pre-Construction Manager",
    image: "/team-pics/justin-hill.jpg"
  },
  {
    name: "Connor Lipham",
    title: "Project Manager",
    image: "/team-pics/connor-lipham.jpg.webp"
  },
  {
    name: "Will Cronic",
    title: "Project Manager",
    image: "/team-pics/will-chronic.png"
  },
  {
    name: "Kevin Nguyen",
    title: "Marketing Manager",
    image: "/team-pics/kevin-nguyen.jpg.webp"
  },
  {
    name: "Kelly Overcash",
    title: "Office Manager",
    image: "/team-pics/kelly-overcash.jpg"
  }
];

const serviceAreas = [
  {
    city: "Atlanta",
    state: "Georgia",
    description: "Serving the metro area and surrounding communities",
    image: "/home-gallery/home-gallery-1.png"
  },
  {
    city: "Charleston",
    state: "South Carolina",
    description: "Historic charm meets modern living",
    image: "/home-gallery/home-gallery-2.png"
  },
  {
    city: "Highlands",
    state: "North Carolina",
    description: "Mountain retreats and luxury escapes",
    image: "/home-gallery/home-gallery-3.png"
  }
];

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [showFixedIcon, setShowFixedIcon] = useState(false);
  const [iconTopPosition, setIconTopPosition] = useState(0);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const [teamParallax, setTeamParallax] = useState(0);

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
      
      // Calculate team parallax
      if (teamSectionRef.current) {
        const rect = teamSectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;
        
        // Align when section is centered/visible in viewport
        // Progress goes from 0 to 1 as section moves from bottom to middle of screen
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight * 0.5);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        setTeamParallax(clampedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate icon position along the timeline as user scrolls - smooth continuous movement
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const container = timelineContainerRef.current;
        if (!container) {
          ticking = false;
          return;
        }

        const rect = container.getBoundingClientRect();
        const containerTop = rect.top;
        const containerBottom = rect.bottom;
        const containerHeight = rect.height;
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        // Show icon when any part of timeline is on screen
        if (containerBottom < 0 || containerTop > viewportHeight) {
          setShowFixedIcon(false);
          ticking = false;
          return;
        }

        setShowFixedIcon(true);

        // Calculate smooth continuous position
        // Icon should be at viewportCenter and move through the timeline
        let iconTop = viewportCenter - containerTop;
        
        // Clamp to container bounds (stays at start/end when scrolling past)
        iconTop = Math.max(0, Math.min(containerHeight, iconTop));
        setIconTopPosition(iconTop);

        // Calculate which step we're on based on position
        const progress = iconTop / containerHeight;
        const stepCount = bradfordMethod.length;
        const stepIndex = Math.max(0, Math.min(stepCount - 1, Math.floor(progress * stepCount)));
        setActiveStepIndex(stepIndex);

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const differenceSection = useFadeIn();
  const methodSection = useFadeIn();
  const serviceAreasSection = useFadeIn();
  const whyBradford1 = useFadeIn(0.4);
  const whyBradford2 = useFadeIn(0.4);
  
  // Typewriter effect for closing quote
  const [typewriterText, setTypewriterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const fullText = "Choose Bradford for excellence, expertise, and a team dedicated to turning your dreams into reality.";
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTyping && typewriterText === '') {
          setIsTyping(true);
        }
      },
      { threshold: 0.5 }
    );

    if (typewriterRef.current) {
      observer.observe(typewriterRef.current);
    }

    return () => observer.disconnect();
  }, [isTyping, typewriterText]);

  useEffect(() => {
    if (isTyping && typewriterText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(fullText.slice(0, typewriterText.length + 1));
      }, 30); // Speed of typing (30ms per character)
      
      return () => clearTimeout(timeout);
    } else if (typewriterText.length === fullText.length) {
      setIsTyping(false);
    }
  }, [isTyping, typewriterText, fullText]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-end justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/fox-croft-photos/01-Foxcroft Rd NW-1.jpg')`,
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
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Meet</div>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">Bradford</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">Crafted by a team that treats your home like our own.</p>
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

      {/* Our Difference - Clean Layout */}
      <section id="difference" className="py-20" style={{backgroundColor: '#F5F1ED'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={differenceSection.ref}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start transition-all duration-1000 ${
              differenceSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-text-strong mb-2 leading-tight">
                What Sets Us Apart
              </h2>
              <p className="text-xl md:text-2xl text-text italic">
                Every detail matters
              </p>
            </div>
            <div>
              <p className="text-base text-text leading-relaxed">
                Our skilled craftsmen bring decades of experience to ensure flawless execution from start to finish. Your vision drives everything we do—we listen, collaborate, and keep you informed every step of the way. Our systematic approach eliminates surprises and ensures your project stays on schedule and within budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Bradford Method - Progressive Timeline */}
      <section className="py-20 relative overflow-hidden">
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
        <div className="absolute inset-0 bg-black/40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={methodSection.ref}
            className={`mb-12 md:pl-32 transition-all duration-1000 ${
              methodSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Bradford Method
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
              Our proven 5-step process ensures your project exceeds expectations
            </p>
          </div>

          <div ref={timelineContainerRef} className="relative">
            {/* Timeline line - desktop only */}
            <div className="hidden md:block absolute left-16 top-0 bottom-0 w-1 bg-white/40" />

            {/* Icon that moves smoothly along the timeline */}
            {showFixedIcon && (
              <div 
                className="hidden md:flex absolute left-16 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center shadow-2xl z-50"
                style={{
                  top: `${iconTopPosition}px`,
                  backgroundColor: '#f5f5f5',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  willChange: 'top'
                }}
              >
                <div className="text-black text-xl font-bold transition-all duration-300">
                  {activeStepIndex + 1}
                </div>
              </div>
            )}

            {bradfordMethod.map((step, index) => (
              <div
                key={index}
                className="method-step relative mb-8 last:mb-0 md:pl-32"
              >
                <div 
                  className={`bg-white p-8 shadow-md transition-all duration-700 hover:shadow-xl max-w-5xl ${
                    activeStepIndex >= index ? 'opacity-90' : 'opacity-50'
                  }`}
                  style={{
                    transform: activeStepIndex >= index ? 'scale(1)' : 'scale(0.95)'
                  }}
                >
                  <div className="mb-6 text-black">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-text-strong mb-4">
                    {step.title}
                  </h3>
                  <p className="text-text leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <section id="team" className="py-20" style={{backgroundColor: '#F5F1ED'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-strong mb-12 text-center">
              Get to Know Our Team
            </h2>
            
            <div 
              ref={teamSectionRef}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
            >
              {teamMembers.map((member, index) => {
                const offset = index % 2 === 0 ? -12 : 12;
                const currentOffset = offset * (1 - teamParallax);
                
                return (
                  <div
                    key={index}
                    className="cursor-pointer"
                    style={{
                      transform: `translateY(${currentOffset}px)`,
                      transition: 'transform 0.1s ease-out',
                      willChange: 'transform'
                    }}
                  >
                    <div className="overflow-hidden rounded-xl mb-4">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        style={{ aspectRatio: '3/4' }}
                      />
                    </div>
                    <h3 className="text-lg font-bold text-text-strong mb-1">{member.name}</h3>
                    <p className="text-sm text-text">{member.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Bradford - Alternating Layout */}
      <section className="pt-20 pb-10" style={{backgroundColor: 'rgb(234, 227, 215)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-strong mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              Why <span className="italic">Bradford?</span>
            </h2>
          </div>

          {/* First Row - Text Left, Image Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-4 items-center">
            {/* Left - Text Content */}
            <div 
              ref={whyBradford1.ref}
              className={`order-1 transition-all duration-1000 ease-out ${
                whyBradford1.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl text-text-strong mb-6 leading-tight" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                Dream Weavers &{' '}
                <span className="italic block mt-2">
                  Architects of Imagination
                </span>
              </h3>
              
              <p className="text-base md:text-lg text-text leading-relaxed mb-6">
                We are a team of dedicated professionals driven by a passion for excellence in crafting homes as unique as the people who live in them.
              </p>
              
              <p className="text-base md:text-lg text-text leading-relaxed">
                Our commitment to quality, innovation, and customer satisfaction sets us apart. We are partners in creating the homes you've always envisioned.
              </p>
            </div>

            {/* Right - Image */}
            <div className="order-2 mb-8 lg:mb-0">
              <div className="overflow-hidden rounded-xl shadow-lg h-[360px]">
                <img
                  src="/new-builds5.png"
                  alt="Dream Weavers & Architects of Imagination"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Second Row - Image Left, Text Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Image */}
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-xl shadow-lg h-[360px]">
                <img
                  src="/new-builds6.jpg"
                  alt="Your Concerns are our Concerns"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right - Text Content */}
            <div 
              ref={whyBradford2.ref}
              className={`order-1 lg:order-2 transition-all duration-1000 ease-out ${
                whyBradford2.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl text-text-strong mb-6 leading-tight" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                Your Concerns<br />
                <span className="italic">are our Concerns</span>
              </h3>
              
              <p className="text-base md:text-lg text-text leading-relaxed mb-6">
                We provide a First Class Experience, keeping you informed and connected throughout your project.
              </p>
              
              <p className="text-base md:text-lg text-text leading-relaxed">
                Communication is key. Your dedicated project manager and superintendent ensure quick response times from start to finish.
              </p>
            </div>
          </div>

          {/* Bottom Quote Section */}
          <div ref={typewriterRef} className="text-center max-w-4xl mx-auto mt-16">
            <p className="text-2xl md:text-3xl text-text-strong leading-relaxed italic min-h-[120px] flex items-center justify-center" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 300 }}>
              {typewriterText}
              {isTyping && <span className="inline-block w-1 h-8 bg-text-strong ml-1 animate-pulse"></span>}
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas - Map View */}
      <section className="py-20 relative overflow-hidden" style={{backgroundColor: '#1A120A'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-12">
            {/* Left: Copy */}
            <div 
              ref={serviceAreasSection.ref}
              className={`transition-all duration-1000 lg:col-span-5 ${
                serviceAreasSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 italic" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                Where We Build
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
                Atlanta, Georgia / Charleston, South Carolina / Surrounding Areas
              </p>
              <Link to="/contact" onClick={() => {
                setTimeout(() => {
                  const formElement = document.getElementById('contact-form');
                  if (formElement) {
                    formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}>
                <Button className="bg-white text-text-strong hover:bg-white/90 px-8 py-6 text-base rounded-full">
                  Start Your Journey
                </Button>
              </Link>
            </div>

            {/* Right: Map */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/map.png" 
                  alt="Service area map showing Atlanta, Charleston, and surrounding areas"
                  className="w-full h-auto"
                />
              </div>
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
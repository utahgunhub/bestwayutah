import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Home,
  Star,
  MapPin,
  Pencil,
  LifeBuoy
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

const bestwayMethod = [
  {
    icon: <MapPin size={32} />,
    title: "Finding the Best Location for the Pool",
    subtitle: "Optimal placement",
    description: "We help you place the pool in the best spot in your home to make the most of every space in your backyard."
  },
  {
    icon: <Pencil size={32} />,
    title: "Engineering and City Permits",
    subtitle: "Handled for you",
    description: "We handle the engineering and city permits for new pool constructions, ensuring full compliance with all local building codes."
  },
  {
    icon: <Home size={32} />,
    title: "Excavation and Plumbing",
    subtitle: "Foundation work",
    description: "Our experienced team uses specialized equipment for precise excavation, followed by meticulous plumbing installation to the highest standards."
  },
  {
    icon: <Star size={32} />,
    title: "Rebar Installation",
    subtitle: "Engineer's specifications",
    description: "Rebar installation always follows the engineer's specifications, providing essential structural reinforcement for the pool shell."
  },
  {
    icon: <LifeBuoy size={32} />,
    title: "Tile, Copping, Shotcrete & Plaster",
    subtitle: "Finishing excellence",
    description: "We are among the best in the state for shotcrete application and offer over 50 color and finish options for plastering."
  }
];

const teamMembers = [
  {
    name: "Construction Team",
    title: "Pool Construction Specialists",
    image: "/bestway-images/gallery-6.webp"
  },
  {
    name: "Excavation Crew",
    title: "Excavation and Rebar",
    image: "/bestway-images/excavation-and-rebar.webp"
  },
  {
    name: "Plumbing Team",
    title: "Plumbing Specialists",
    image: "/bestway-images/plumbing.webp"
  },
  {
    name: "Finishing Team",
    title: "Tile, Plaster & Copping",
    image: "/bestway-images/tile.webp"
  },
  {
    name: "Customer Service",
    title: "Client Relations",
    image: "/bestway-images/gallery-10.webp"
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
      
      if (teamSectionRef.current) {
        const rect = teamSectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const windowHeight = window.innerHeight;
        const scrollProgress = (windowHeight - sectionTop) / (windowHeight * 0.5);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        setTeamParallax(clampedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        if (containerBottom < 0 || containerTop > viewportHeight) {
          setShowFixedIcon(false);
          ticking = false;
          return;
        }

        setShowFixedIcon(true);

        let iconTop = viewportHeight / 2 - containerTop;
        iconTop = Math.max(0, Math.min(containerHeight, iconTop));
        setIconTopPosition(iconTop);

        const progress = iconTop / containerHeight;
        const stepCount = bestwayMethod.length;
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
  const whyBestway1 = useFadeIn(0.4);
  const whyBestway2 = useFadeIn(0.4);
  
  const [typewriterText, setTypewriterText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const fullText = "Choose Bestway Utah for excellence, expertise, and a team dedicated to turning your pool dreams into reality.";
  
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
      }, 30);
      
      return () => clearTimeout(timeout);
    } else if (typewriterText.length === fullText.length) {
      setIsTyping(false);
    }
  }, [isTyping, typewriterText, fullText]);

  return (
    <Layout>
      <section className="relative h-[90vh] md:h-screen flex items-end justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/bestway-images/nice-pools/pools-7.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-text-strong/40"></div>
        </div>

        <div className="absolute bottom-20 md:bottom-28 lg:bottom-32 left-0 right-0 z-10">
          <div className="w-[80%] mx-auto">
            <h1 className="text-white leading-tight mb-6" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">About</div>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">Us</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">We are expert professionals with over 16 years of experience in the industry.</p>
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
                Why Choose Us?
              </h2>
              <p className="text-xl md:text-2xl text-text italic">
                16+ years of excellence
              </p>
            </div>
            <div>
              <p className="text-base text-text leading-relaxed">
                Experience comprehensive Pool Construction, Repairs and Remodeling services in Utah. We take pride in having a full team for all of our projects. What does that mean? It means our customers don't have to wait for a 2nd company to come in and do the work. Our team works quickly, very cleanly, and by doing everything in-house, our customers will save a lot of money.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/bestway-images/shotcrete.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={methodSection.ref}
            className={`mb-12 md:pl-32 transition-all duration-1000 ${
              methodSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How Do We Do It?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
              Watch how we work — our proven process for pool construction, repairs and remodeling
            </p>
          </div>

          <div ref={timelineContainerRef} className="relative">
            <div className="hidden md:block absolute left-16 top-0 bottom-0 w-1 bg-white/40" />

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

            {bestwayMethod.map((step, index) => (
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

      <section id="team" className="py-20" style={{backgroundColor: '#F5F1ED'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-text-strong mb-12 text-center">
              Our Expert Team
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

      <section className="pt-20 pb-10" style={{backgroundColor: 'rgb(234, 227, 215)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-strong mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              Why <span className="italic">Bestway Utah?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-4 items-center">
            <div 
              ref={whyBestway1.ref}
              className={`order-1 transition-all duration-1000 ease-out ${
                whyBestway1.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl text-text-strong mb-6 leading-tight" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                Pool Construction, Repairs{' '}
                <span className="italic block mt-2">
                  and Remodeling Excellence
                </span>
              </h3>
              
              <p className="text-base md:text-lg text-text leading-relaxed mb-6">
                When it comes to transforming your living space, trust the experts at Bestway Utah and experience the difference that true reconstruction expertise can make.
              </p>
              
              <p className="text-base md:text-lg text-text leading-relaxed">
                Bestway Utah is a pool construction, repair, and remodeling company that offers multiple benefits in terms of expertise, service, warranty, efficiency, and customer satisfaction.
              </p>
            </div>

            <div className="order-2 mb-8 lg:mb-0">
              <div className="overflow-hidden rounded-xl shadow-lg h-[360px]">
                <img
                  src="/bestway-images/gallery-12.webp"
                  alt="Pool Construction Excellence"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-xl shadow-lg h-[360px]">
                <img
                  src="/bestway-images/plaster.webp"
                  alt="Customer Satisfaction"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div 
              ref={whyBestway2.ref}
              className={`order-1 lg:order-2 transition-all duration-1000 ease-out ${
                whyBestway2.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl text-text-strong mb-6 leading-tight" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                Trusted by More<br />
                <span className="italic">Than 250+ Clients</span>
              </h3>
              
              <p className="text-base md:text-lg text-text leading-relaxed mb-6">
                We help you place the pool in the best spot in your home to make the most of every space in your backyard.
              </p>
              
              <p className="text-base md:text-lg text-text leading-relaxed">
                Innovation and best practices, warranty and after-sales service, efficiency and cost savings — all delivered with customer convenience and satisfaction at the forefront.
              </p>
            </div>
          </div>

          <div ref={typewriterRef} className="text-center max-w-4xl mx-auto mt-16">
            <p className="text-2xl md:text-3xl text-text-strong leading-relaxed italic min-h-[120px] flex items-center justify-center" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 300 }}>
              {typewriterText}
              {isTyping && <span className="inline-block w-1 h-8 bg-text-strong ml-1 animate-pulse"></span>}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden" style={{backgroundColor: '#1A120A'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-12">
            <div 
              ref={serviceAreasSection.ref}
              className={`transition-all duration-1000 lg:col-span-5 ${
                serviceAreasSection.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 italic" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                Services In Your Locality
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
                Utah and surrounding areas
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
                  Contact Us
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/bestway-images/gallery-20.webp" 
                  alt="Bestway Utah service area in Utah"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

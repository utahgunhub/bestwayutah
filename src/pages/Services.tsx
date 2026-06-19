import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building, 
  Home, 
  Hammer, 
  Wrench
} from "lucide-react";
import { useEffect, useState } from "react";
// Using gallery images instead of assets
const heroKitchen = "/fox-croft-photos/05-Foxcroft Rd NW-5.jpg";
const bathroomProject = "/avondale/1224 Avondale Ave SE High Res_05.jpg";
const livingRoomProject = "/fox-croft-photos/12-Foxcroft Rd NW-12.jpg";

const newConstructionServices = [
  {
    icon: <Building size={32} />,
    title: "Custom Home Construction",
    description: "Build your dream home from the ground up with Bradford Custom Homes. We specialize in creating unique, high-quality custom homes tailored to your lifestyle and preferences. From architectural design to final finishes, we handle every aspect of construction with precision and care.",
    image: heroKitchen
  },
  {
    icon: <Home size={32} />,
    title: "Luxury Home Building", 
    description: "Experience the pinnacle of luxury living with our high-end custom home construction. We use premium materials, cutting-edge technology, and innovative design to create homes that exceed expectations. Every detail is crafted to perfection, from smart home systems to custom millwork.",
    image: bathroomProject
  },
  {
    icon: <Hammer size={32} />,
    title: "Spec Home Development",
    description: "Partner with Bradford for spec home development that delivers exceptional returns. Our expertise in market trends, quality construction, and efficient project management ensures your investment properties stand out in Atlanta's competitive real estate market.",
    image: livingRoomProject
  },
  {
    icon: <Wrench size={32} />,
    title: "Commercial Construction",
    description: "From office buildings to retail spaces, Bradford Custom Homes brings the same quality and attention to detail to commercial construction projects. We understand the unique requirements of commercial builds and deliver projects on time and within budget.",
    image: heroKitchen
  }
];

export default function Services() {
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
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-end justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/services-hero.png)`,
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
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">New</div>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">Construction</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">Kitchen, bath, and whole‑home transformations handled end‑to‑end.</p>
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

      {/* Services Grid */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong mb-4">
              New Construction Services
            </h2>
            <p className="text-xl text-text max-w-3xl mx-auto">
              From custom homes to commercial construction, we bring decades of experience 
              and craftsmanship to every new build project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newConstructionServices.map((service, index) => (
              <div key={index} className="bg-bg rounded-2xl p-6 gentle-shadow">
                <div className="mb-4 rounded-xl overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="mb-4 text-accent-primary">
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-text-strong mb-3">
                  {service.title}
                </h3>
                
                <p className="text-text mb-6 leading-relaxed">
                  {service.description}
                </p>

                <Button variant="secondary" size="sm" asChild>
                  <Link to="/gallery">View Projects</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg-alt">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-text-strong mb-6 leading-tight" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
            Ready to Build Your Dream Home?
          </h2>
          <p className="text-xl text-text mb-8">
            Let's discuss your new construction project and create a plan that brings your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <Link to="/contact">Start Your Build</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link to="/gallery">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
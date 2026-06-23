import { Menu, X, Phone, Mail } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFooterVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <nav className="absolute top-8 left-0 right-0 z-50 bg-transparent">
        <div className="w-[80%] mx-auto">
          <div className="flex justify-between items-start h-20">
            <Link to="/" className="hover:no-underline">
              <img 
                src="/bestway-images/best-way-logo-white.png" 
                alt="Bestway Utah" 
                className="h-10 md:h-16 w-auto"
              />
            </Link>

            <div className="hidden md:flex flex-col items-end space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-base font-medium transition-colors uppercase tracking-wide ${
                    location.pathname === item.href
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block text-base font-medium ${
                    location.pathname === item.href
                      ? "text-white"
                      : "text-white/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main>{children}</main>

      {!hideFooter && (
        <footer 
        ref={footerRef}
        className={`py-16 transition-all duration-1000 ${
          isFooterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} 
        style={{backgroundColor: location.pathname === '/' ? '#eae3d7' : '#F5F1ED'}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0">
            <div className="max-w-sm">
              <img 
                src="/bestway-images/bestway-logo.png" 
                alt="Bestway Utah" 
                className="h-24 md:h-32 w-auto mb-4"
              />
              <p className="text-sm text-text leading-relaxed">
                Specialists in Home Reconstruction Excellence. We are expert professionals with over 16 years of experience in the industry.
              </p>
            </div>

            <div className="lg:ml-12">
              <p className="text-sm font-semibold text-text-strong mb-3 uppercase tracking-wide">Quick Links</p>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-text-strong hover:text-accent-primary transition-colors">HOME</Link></li>
                <li><Link to="/about" className="text-text-strong hover:text-accent-primary transition-colors">ABOUT</Link></li>
                <li><Link to="/services" className="text-text-strong hover:text-accent-primary transition-colors">SERVICES</Link></li>
                <li><Link to="/gallery" className="text-text-strong hover:text-accent-primary transition-colors">GALLERY</Link></li>
                <li><Link to="/blog" className="text-text-strong hover:text-accent-primary transition-colors">BLOG</Link></li>
                <li><Link to="/contact" className="text-text-strong hover:text-accent-primary transition-colors">CONTACT</Link></li>
              </ul>
            </div>

            <div className="lg:ml-12">
              <p className="text-sm font-semibold text-text-strong mb-3 uppercase tracking-wide">Our Services</p>
              <ul className="space-y-2 text-sm mb-6">
                <li><Link to="/services/new-swimming-pools" className="text-text-strong hover:text-accent-primary transition-colors">NEW SWIMMING POOLS</Link></li>
                <li><Link to="/services/pool-remodels" className="text-text-strong hover:text-accent-primary transition-colors">POOL REMODELS</Link></li>
                <li><Link to="/services/shotcrete" className="text-text-strong hover:text-accent-primary transition-colors">SHOTCRETE</Link></li>
                <li><Link to="/services/tile" className="text-text-strong hover:text-accent-primary transition-colors">TILE</Link></li>
                <li><Link to="/services/plumbing" className="text-text-strong hover:text-accent-primary transition-colors">PLUMBING</Link></li>
                <li><Link to="/services/excavation-and-rebar" className="text-text-strong hover:text-accent-primary transition-colors">EXCAVATION AND REBAR</Link></li>
              </ul>
              <p className="text-sm font-semibold text-text-strong mb-2 uppercase tracking-wide">Contact Info</p>
              <ul className="space-y-1 text-sm text-text-strong">
                <li>2340 S Redwood Rd, West Valley City, UT 84119</li>
                <li>
                  <a href="mailto:Bestway.utah@gmail.com" className="hover:text-accent-primary transition-colors">
                    Bestway.utah@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+13852422256" className="hover:text-accent-primary transition-colors">
                    +1 (385) 242 22 56
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex justify-between items-center">
              <div className="flex space-x-6 text-sm">
                <span className="text-text-strong">© Bestway Utah</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <a href="mailto:Bestway.utah@gmail.com" aria-label="Email" className="text-text-strong hover:text-accent-primary transition-colors">
                  <Mail size={18} />
                </a>
                <a href="tel:+13852422256" aria-label="Phone" className="text-text-strong hover:text-accent-primary transition-colors">
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}

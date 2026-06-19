import { Menu, X, Phone, Mail, Instagram } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "New Construction", href: "/new-construction" },
  { name: "Remodel", href: "/remodel" },
  { name: "About", href: "/about" },
  { name: "Build Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export default function Layout({ children, hideFooter = false }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Footer animation
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
      {/* Navigation - Transparent overlay on hero */}
      <nav className="absolute top-8 left-0 right-0 z-50 bg-transparent">
        <div className="w-[80%] mx-auto">
          <div className="flex justify-between items-start h-20">
            {/* Logo */}
            <Link to="/" className="hover:no-underline">
              <img 
                src="/Bradford 1.png" 
                alt="Bradford" 
                className="h-10 md:h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation - Top Right Stacked */}
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

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
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

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
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
            {/* Logo */}
            <div>
              <img 
                src="/full-logo-black.png" 
                alt="Bradford Custom Homes & Remodeling" 
                className="h-24 md:h-32 lg:h-40 w-auto"
              />
            </div>

            {/* Services */}
            <div className="lg:ml-12">
              <ul className="space-y-2 text-sm">
                <li><Link to="/new-construction" className="text-text-strong hover:text-accent-primary transition-colors">NEW CONSTRUCTION</Link></li>
                <li><Link to="/remodel" className="text-text-strong hover:text-accent-primary transition-colors">REMODEL</Link></li>
                <li><Link to="/about" className="text-text-strong hover:text-accent-primary transition-colors">ABOUT</Link></li>
                <li><Link to="/gallery" className="text-text-strong hover:text-accent-primary transition-colors">BUILD GALLERY</Link></li>
                <li><Link to="/contact" className="text-text-strong hover:text-accent-primary transition-colors">CONTACT</Link></li>
                <li><Link to="/blog" className="text-text-strong hover:text-accent-primary transition-colors">BLOG</Link></li>
              </ul>
            </div>

            {/* Service Areas */}
            <div className="lg:ml-12">
              <ul className="space-y-2 text-sm">
                <li><Link to="/atlanta" className="text-text-strong hover:text-accent-primary transition-colors">ATLANTA, GEORGIA</Link></li>
                <li><Link to="/charleston" className="text-text-strong hover:text-accent-primary transition-colors">CHARLESTON, SOUTH CAROLINA</Link></li>
                <li><Link to="/highlands" className="text-text-strong hover:text-accent-primary transition-colors">HIGHLANDS, NORTH CAROLINA</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom legal links */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex justify-between items-center">
              <div className="flex space-x-6 text-sm">
                <span className="text-text-strong hover:text-accent-primary transition-colors">
                  TERMS
                </span>
                <span className="text-text-strong hover:text-accent-primary transition-colors">
                  PRIVACY POLICY
                </span>
              </div>
              
              {/* Social Media */}
              <div className="flex items-center space-x-4">
                {/* Instagram */}
                <a href="https://www.instagram.com/bradfordbuilt/#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-strong hover:text-accent-primary transition-colors">
                  <Instagram size={18} />
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/bradfordcustomhomesandremodeling" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-text-strong hover:text-accent-primary transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/bradford-custom-homes-remodeling/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-strong hover:text-accent-primary transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.5-2.7 5.1-2.7 5.5 0 6.5 3.6 6.5 8.3V24h-5V16.7c0-1.7 0-3.9-2.4-3.9-2.4 0-2.8 1.9-2.8 3.8V24h-5V8z"/>
                  </svg>
                </a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@bradfordbuilt" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-text-strong hover:text-accent-primary transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.9 2h3.1c.2 1.2.8 2.4 1.7 3.3 1 1 2.2 1.6 3.6 1.8v3.1c-1.5-.1-2.9-.6-4.2-1.3v6.7c0 3.8-3.1 6.9-6.9 6.9S3.3 19.4 3.3 15.6 6.4 8.7 10.2 8.7c.3 0 .6 0 .8.1v3.3c-.3-.1-.6-.1-.8-.1-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6V2z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/channel/UCcFnqmtZ-YXeDJY_qrGXIjQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-text-strong hover:text-accent-primary transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C19 3.3 12 3.3 12 3.3s-7 0-9.1.5C1.7 4.1.8 5 .5 6.2.1 8.3.1 12 .1 12s0 3.7.4 5.8c.3 1.2 1.2 2.1 2.4 2.4 2.1.5 9.1.5 9.1.5s7 0 9.1-.5c1.2-.3 2.1-1.2 2.4-2.4.4-2.1.4-5.8.4-5.8s0-3.7-.4-5.8zM9.7 15.6V8.4l6.1 3.6-6.1 3.6z"/>
                  </svg>
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
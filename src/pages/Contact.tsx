import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from '@emailjs/browser';
import { usePageMeta } from "@/hooks/usePageMeta";
import { getAllAreas } from "@/data/areaPages";

export default function Contact() {
  usePageMeta({
    title: "Contact Bestway Utah | Free Pool Construction Estimate",
    description:
      "Contact Bestway Utah for pool construction, repair, and remodeling. Serving Northern Utah, Salt Lake Valley, and Utah Valley. Free estimates.",
    path: "/contact",
    image: "/bestway-images/nice-pools/pools-18.png",
  });

  const serviceAreas = getAllAreas();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    hasLandOrOwnHome: '',
    hasArchitecturalPlans: '',
    workingWithDesigner: '',
    budgetRange: '',
    projectDescription: '',
    country: 'United States',
    address1: '',
    city: '',
    state: '',
    zip: '',
    howDidYouFindUs: '',
  });
  const [scrollY, setScrollY] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields: { key: keyof typeof formData; label: string }[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'projectType', label: 'Project Type' },
      { key: 'hasLandOrOwnHome', label: 'Land/Home Ownership' },
      { key: 'hasArchitecturalPlans', label: 'Architectural Plans' },
      { key: 'workingWithDesigner', label: 'Working with Interior Designer' },
      { key: 'budgetRange', label: 'Budget Range' },
      { key: 'projectDescription', label: 'Project Description' },
      { key: 'country', label: 'Country' },
      { key: 'address1', label: 'Address Line 1' },
      { key: 'city', label: 'City' },
      { key: 'state', label: 'State' },
      { key: 'zip', label: 'ZIP Code' },
      { key: 'howDidYouFindUs', label: 'How did you find us?' },
    ];
    const missing = requiredFields
      .filter(({ key }) => String(formData[key]).trim() === '')
      .map(({ label }) => label);
    if (missing.length > 0) {
      setErrors(missing);
      const formEl = document.getElementById('contact-form');
      if (formEl) {
        window.scrollTo({ top: formEl.offsetTop - 120, behavior: 'smooth' });
      }
      return;
    }
    setErrors([]);
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS configuration - hardcoded values
      const SERVICE_ID = 'service_4s5lsdc';
      const TEMPLATE_ID = 'template_nxdaupk';
      const PUBLIC_KEY = 'LHhhab8fiZXeSNaGT';

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        project_type: formData.projectType,
        has_land_or_home: formData.hasLandOrOwnHome,
        has_architectural_plans: formData.hasArchitecturalPlans,
        working_with_designer: formData.workingWithDesigner,
        budget_range: formData.budgetRange,
        project_description: formData.projectDescription,
        country: formData.country,
        address: formData.address1,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        how_found_us: formData.howDidYouFindUs,
      };

      // Send email using EmailJS
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        hasLandOrOwnHome: '',
        hasArchitecturalPlans: '',
        workingWithDesigner: '',
        budgetRange: '',
        projectDescription: '',
        country: 'United States',
        address1: '',
        city: '',
        state: '',
        zip: '',
        howDidYouFindUs: '',
      });
      
      // Scroll to top of form to show success message
      const formEl = document.getElementById('contact-form');
      if (formEl) {
        window.scrollTo({ top: formEl.offsetTop - 120, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen flex items-end justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/bestway-images/nice-pools/pools-18.png)`,
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
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Contact</div>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">Us</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">Experience comprehensive Pool Construction, Repairs and Remodeling services in Utah.</p>
            <button 
              onClick={() => {
                const formElement = document.getElementById('contact-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Contact Info (Left sticky) + Form (Right) */}
      <section className="py-20 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">
            {/* Left: Sticky info */}
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="space-y-8">
                {/* Logo */}
                <div>
                  <img 
                    src="/bestway-images/bestway-logo.png" 
                    alt="Bestway Utah" 
                    className="h-16 w-auto"
                  />
                </div>

                <div>
                  <p className="text-lg font-semibold text-text-strong mb-2">Address:</p>
                  <p className="whitespace-pre-line text-text-strong">{`2340 S Redwood Rd\nWest Valley City, UT 84119`}</p>
                </div>

                <div>
                  <p className="text-lg font-semibold text-text-strong mb-2">Email:</p>
                  <a href="mailto:Bestway.utah@gmail.com" className="text-text-strong hover:text-accent-primary transition-colors">
                    Bestway.utah@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-lg font-semibold text-text-strong mb-2">Contact Us:</p>
                  <a href="tel:+13852422256" className="text-text-strong hover:text-accent-primary transition-colors">
                    +1 (385) 242 22 56
                  </a>
                </div>

                <div>
                  <p className="text-lg font-semibold text-text-strong mb-3">Follow Us:</p>
                  <div className="flex gap-4 items-center">
                    <a href="mailto:Bestway.utah@gmail.com" className="text-text-strong hover:text-accent-primary transition-colors" aria-label="Email">
                      <Mail size={24} />
                    </a>
                    <a href="tel:+13852422256" className="text-text-strong hover:text-accent-primary transition-colors" aria-label="Phone">
                      <Phone size={24} />
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-lg font-semibold text-text-strong mb-3 flex items-center gap-2">
                    <MapPin size={20} />
                    Service Areas
                  </p>
                  <ul className="space-y-2">
                    {serviceAreas.map((area) => (
                      <li key={area.slug}>
                        <Link
                          to={`/areas/${area.slug}`}
                          className="text-sm text-text-strong hover:text-accent-primary transition-colors leading-snug block"
                        >
                          {area.regionLabel} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Right: Form */}
            <div id="contact-form" className="lg:pl-4">
              <h2 className="text-4xl font-bold text-text-strong mb-6">Tell Us About Your Vision</h2>

              {errors.length > 0 && (
                <div className="mb-6 rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                  Please complete the required fields: {errors.join(', ')}
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="mb-6 rounded-md border border-green-300 bg-green-50 p-4 text-sm text-green-800">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                  Sorry, there was an error sending your message. Please try again or contact us directly at +1 (385) 242 22 56.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0" />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0" />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0" />
                </div>

                {/* Project Type */}
                <div>
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                    <SelectTrigger className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus:ring-0">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pool-construction">Pool Construction</SelectItem>
                      <SelectItem value="pool-repair">Pool Repair</SelectItem>
                      <SelectItem value="pool-remodel">Pool Remodel</SelectItem>
                      <SelectItem value="excavation-rebar">Excavation and Rebar</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="shotcrete">Shotcrete</SelectItem>
                      <SelectItem value="tile-plaster">Tile / Plaster / Copping</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Land or Own Home */}
                <div>
                  <Label>Do you own the property where the pool work will be done?</Label>
                  <Select value={formData.hasLandOrOwnHome} onValueChange={(value) => handleInputChange('hasLandOrOwnHome', value)}>
                    <SelectTrigger className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus:ring-0">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Architectural Plans */}
                <div>
                  <Label>Do you have existing pool plans or designs?</Label>
                  <Select value={formData.hasArchitecturalPlans} onValueChange={(value) => handleInputChange('hasArchitecturalPlans', value)}>
                    <SelectTrigger className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus:ring-0">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Interior Designer */}
                <div>
                  <Label>Are you working with a designer or landscape architect?</Label>
                  <Select value={formData.workingWithDesigner} onValueChange={(value) => handleInputChange('workingWithDesigner', value)}>
                    <SelectTrigger className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus:ring-0">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Range */}
                <div>
                  <Label>What is your budget range?</Label>
                  <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
                    <SelectTrigger className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus:ring-0">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-25k">Under $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                      <SelectItem value="150k-plus">$150,000 +</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Project Description */}
                <div>
                  <Label htmlFor="projectDescription">Tell Us About Your Vision</Label>
                  <Textarea id="projectDescription" value={formData.projectDescription} onChange={(e) => handleInputChange('projectDescription', e.target.value)} className="mt-1 min-h-[140px] rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0" />
                </div>

                {/* Address */}
                <div className="space-y-4">
                  <div>
                    <Label>Address</Label>
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address1">Address Line 1</Label>
                  <Input id="address1" value={formData.address1} onChange={(e) => handleInputChange('address1', e.target.value)} className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                    <Input id="city" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                    <Input id="state" value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)} className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0" />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" value={formData.zip} onChange={(e) => handleInputChange('zip', e.target.value)} className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus-visible:ring-0" />
                    </div>
                  </div>
                </div>

                {/* How did you find us */}
                <div>
                  <Label>How Did You Find Us?</Label>
                  <Select value={formData.howDidYouFindUs} onValueChange={(value) => handleInputChange('howDidYouFindUs', value)}>
                    <SelectTrigger className="mt-1 rounded-none border-0 shadow-[0_4px_14px_rgba(0,0,0,0.06)] focus:ring-0">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="houzz">Houzz</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-white border border-gray-300 text-text-strong px-6 py-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
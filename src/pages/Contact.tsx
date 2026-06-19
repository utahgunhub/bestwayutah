import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import emailjs from '@emailjs/browser';

export default function Contact() {
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
            backgroundImage: `url(/contact-hero.png)`,
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
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Let's Build</div>
              <div className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic">Together</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 max-w-xl">Tell us about your home—we’ll outline scope, timeline, and next steps.</p>
            <button 
              onClick={() => {
                const formElement = document.getElementById('contact-form');
                if (formElement) {
                  formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Schedule Your Private Consultation
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
                    src="/full-logo-black.png" 
                    alt="Bradford Custom Homes & Remodeling" 
                    className="h-16 w-auto"
                  />
                </div>

                {/* Headquarters */}
                <div>
                  <p className="text-lg font-semibold text-text-strong mb-2">Headquarters:</p>
                  <p className="whitespace-pre-line text-text-strong">{`4405 New McEver Rd. Ste. 200\nAcworth, GA 30101`}</p>
                </div>

                {/* Telephone */}
                <div>
                  <p className="text-lg font-semibold text-text-strong mb-2">Telephone:</p>
                  <p className="text-text-strong">470.835.0595</p>
                </div>

                {/* Socials */}
                <div>
                  <p className="text-lg font-semibold text-text-strong mb-3">Socials:</p>
                  <div className="flex gap-4 items-center">
                    {/* Instagram */}
                    <a href="https://www.instagram.com/bradfordbuilt/#" target="_blank" rel="noopener noreferrer" className="text-text-strong hover:text-accent-primary transition-colors" aria-label="Instagram">
                      <Instagram size={24} />
                    </a>
                    {/* Facebook */}
                    <a href="https://www.facebook.com/bradfordcustomhomesandremodeling" target="_blank" rel="noopener noreferrer" className="text-text-strong hover:text-accent-primary transition-colors" aria-label="Facebook">
                      <Facebook size={24} />
                    </a>
                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/company/bradford-custom-homes-remodeling/" target="_blank" rel="noopener noreferrer" className="text-text-strong hover:text-accent-primary transition-colors" aria-label="LinkedIn">
                      <Linkedin size={24} />
                    </a>
                    {/* TikTok */}
                    <a href="https://www.tiktok.com/@bradfordbuilt" target="_blank" rel="noopener noreferrer" className="text-text-strong hover:text-accent-primary transition-colors" aria-label="TikTok">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12.9 2h3.1c.2 1.2.8 2.4 1.7 3.3 1 1 2.2 1.6 3.6 1.8v3.1c-1.5-.1-2.9-.6-4.2-1.3v6.7c0 3.8-3.1 6.9-6.9 6.9S3.3 19.4 3.3 15.6 6.4 8.7 10.2 8.7c.3 0 .6 0 .8.1v3.3c-.3-.1-.6-.1-.8-.1-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6V2z"/>
                      </svg>
                    </a>
                    {/* YouTube */}
                    <a href="https://www.youtube.com/channel/UCcFnqmtZ-YXeDJY_qrGXIjQ" target="_blank" rel="noopener noreferrer" className="text-text-strong hover:text-accent-primary transition-colors" aria-label="YouTube">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C19 3.3 12 3.3 12 3.3s-7 0-9.1.5C1.7 4.1.8 5 .5 6.2.1 8.3.1 12 .1 12s0 3.7.4 5.8c.3 1.2 1.2 2.1 2.4 2.4 2.1.5 9.1.5 9.1.5s7 0 9.1-.5c1.2-.3 2.1-1.2 2.4-2.4.4-2.1.4-5.8.4-5.8s0-3.7-.4-5.8zM9.7 15.6V8.4l6.1 3.6-6.1 3.6z"/>
                      </svg>
                    </a>
                  </div>
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
                  Sorry, there was an error sending your message. Please try again or contact us directly at 470.835.0595.
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
                      <SelectItem value="new-construction">New Construction</SelectItem>
                      <SelectItem value="kitchen-remodel">Kitchen Remodel</SelectItem>
                      <SelectItem value="bathroom-remodel">Bathroom Remodel</SelectItem>
                      <SelectItem value="whole-home-remodel">Whole-home Remodel</SelectItem>
                      <SelectItem value="addition">Addition</SelectItem>
                      <SelectItem value="exterior">Exterior</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Land or Own Home */}
                <div>
                  <Label>Do you have land to build on or own the home that you're remodeling?</Label>
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
                  <Label>Do you have architectural plans?</Label>
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
                  <Label>Are you working with an Interior Designer?</Label>
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
                      <SelectItem value="under-100k">Under $100,000</SelectItem>
                      <SelectItem value="100k-200k">$100,000 - $200,000</SelectItem>
                      <SelectItem value="200k-400k">$200,000 - $400,000</SelectItem>
                      <SelectItem value="400k-750k">$400,000 - $750,000</SelectItem>
                      <SelectItem value="750k-plus">$750,000 +</SelectItem>
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
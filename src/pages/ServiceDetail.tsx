import Layout from "@/components/Layout";
import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getServiceBySlug, getAllServices } from "@/data/servicePages";
import { ArrowLeft, CheckCircle2, Phone, Mail } from "lucide-react";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  usePageMeta(
    service
      ? {
          title: service.metaTitle,
          description: service.metaDescription,
          keywords: service.metaKeywords,
          path: `/services/${service.slug}`,
          image: service.heroImage,
        }
      : { title: "Service Not Found | Bestway Utah", description: "" }
  );

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const related = getAllServices().filter((s) => service.relatedSlugs.includes(s.slug));

  return (
    <Layout>
      <section className="relative h-[55vh] md:h-[65vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${service.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-text-strong/50" />
        </div>
        <div className="relative z-10 w-[80%] mx-auto pb-16 md:pb-24">
          <nav className="text-white text-sm mb-6 flex flex-wrap items-center gap-2">
            <Link to="/" className="text-white hover:text-white/80 transition-colors">Home</Link>
            <span className="text-white">/</span>
            <Link to="/services" className="text-white hover:text-white/80 transition-colors">Services</Link>
            <span className="text-white">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1
            className="text-white text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl"
            style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
          >
            {service.title}
            <span className="block text-2xl md:text-3xl italic mt-2 text-white/90">in Utah</span>
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F1ED" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <article className="lg:col-span-8">
              <p className="text-lg md:text-xl text-text leading-relaxed mb-10 border-l-4 border-accent-primary pl-6">
                {service.intro}
              </p>

              {service.sections.map((section) => (
                <div key={section.heading} className="mb-10">
                  <h2
                    className="text-2xl md:text-3xl text-text-strong mb-4 leading-tight"
                    style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
                  >
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-base text-text leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}

              <div className="mt-14">
                <h2
                  className="text-2xl md:text-3xl text-text-strong mb-6"
                  style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
                >
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {service.faqs.map((faq, i) => (
                    <AccordionItem key={faq.question} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-text-strong font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-text leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </article>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="bg-white p-6 md:p-8 shadow-lg rounded-sm">
                  <h3 className="text-xl font-bold text-text-strong mb-4">Free Estimate</h3>
                  <p className="text-sm text-text mb-6 leading-relaxed">
                    Ready to start your {service.title.toLowerCase()} project in Utah? Our in-house team is standing by.
                  </p>
                  <Button asChild className="w-full rounded-full mb-3">
                    <Link to="/contact">Get a Free Estimate</Link>
                  </Button>
                  <a
                    href="tel:+13852422256"
                    className="flex items-center justify-center gap-2 text-sm text-text-strong hover:text-accent-primary transition-colors py-2"
                  >
                    <Phone size={16} />
                    +1 (385) 242 22 56
                  </a>
                  <a
                    href="mailto:Bestway.utah@gmail.com"
                    className="flex items-center justify-center gap-2 text-sm text-text-strong hover:text-accent-primary transition-colors py-2"
                  >
                    <Mail size={16} />
                    Bestway.utah@gmail.com
                  </a>
                </div>

                <div className="overflow-hidden rounded-sm shadow-lg">
                  <img
                    src={service.cardImage}
                    alt={`${service.title} — Bestway Utah`}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="bg-bg-alt p-6 md:p-8" style={{ backgroundColor: "#eae3d7" }}>
                  <h3 className="text-lg font-bold text-text-strong mb-4">What You Get</h3>
                  <ul className="space-y-3">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-text leading-snug">
                        <CheckCircle2 size={18} className="text-accent-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {related.length > 0 && (
                  <div className="border border-border p-6">
                    <h3 className="text-lg font-bold text-text-strong mb-4">Related Services</h3>
                    <ul className="space-y-2">
                      {related.map((rel) => (
                        <li key={rel.slug}>
                          <Link
                            to={`/services/${rel.slug}`}
                            className="text-sm text-text-strong hover:text-accent-primary transition-colors"
                          >
                            {rel.title} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: "#1A120A" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl text-white mb-4 leading-tight"
            style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
          >
            Utah&apos;s Trusted Pool Builder
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Over 16 years building, repairing, and remodeling pools across Utah. One team handles everything — no subcontractors, no delays.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-black hover:bg-white/90 rounded-full px-8">
              <Link to="/contact">Free Consultation</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
              <Link to="/services">
                <ArrowLeft size={16} className="mr-2" />
                All Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import Layout from "@/components/Layout";
import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getAreaBySlug, getAllAreas } from "@/data/areaPages";
import { getAllServices } from "@/data/servicePages";
import { ArrowLeft, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";

export default function AreaDetail() {
  const { slug } = useParams<{ slug: string }>();
  const area = slug ? getAreaBySlug(slug) : undefined;

  usePageMeta(
    area
      ? {
          title: area.metaTitle,
          description: area.metaDescription,
          keywords: area.metaKeywords,
          path: `/areas/${area.slug}`,
          image: area.heroImage,
        }
      : { title: "Area Not Found | Bestway Utah", description: "" }
  );

  if (!area) {
    return <Navigate to="/contact" replace />;
  }

  const related = getAllAreas().filter((a) => area.relatedSlugs.includes(a.slug));
  const services = getAllServices().slice(0, 4);

  return (
    <Layout>
      <section className="relative h-[55vh] md:h-[65vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${area.heroImage})`,
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
            <Link to="/contact" className="text-white hover:text-white/80 transition-colors">Contact</Link>
            <span className="text-white">/</span>
            <span className="text-white">{area.regionLabel}</span>
          </nav>
          <h1
            className="text-white text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl"
            style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
          >
            {area.title}
          </h1>
          <p className="text-white/90 text-lg md:text-xl mt-3 max-w-2xl">{area.regionLabel}</p>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ backgroundColor: "#F5F1ED" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <article className="lg:col-span-8">
              <p className="text-lg md:text-xl text-text leading-relaxed mb-10 border-l-4 border-accent-primary pl-6">
                {area.intro}
              </p>

              {area.sections.map((section) => (
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
                  {area.faqs.map((faq, i) => (
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
                    Pool construction, repair, and remodeling in {area.regionLabel}. Call Bestway Utah today.
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
                    src={area.cardImage}
                    alt={`Pool builder — ${area.title}`}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="bg-bg-alt p-6 md:p-8" style={{ backgroundColor: "#eae3d7" }}>
                  <h3 className="text-lg font-bold text-text-strong mb-3 flex items-center gap-2">
                    <MapPin size={18} />
                    Cities We Serve
                  </h3>
                  <p className="text-sm text-text leading-relaxed mb-4">
                    {area.cities.join(", ")}
                  </p>
                  <ul className="space-y-3">
                    {area.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-text leading-snug">
                        <CheckCircle2 size={18} className="text-accent-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {related.length > 0 && (
                  <div className="border border-border p-6">
                    <h3 className="text-lg font-bold text-text-strong mb-4">Other Service Areas</h3>
                    <ul className="space-y-2">
                      {related.map((rel) => (
                        <li key={rel.slug}>
                          <Link
                            to={`/areas/${rel.slug}`}
                            className="text-sm text-text-strong hover:text-accent-primary transition-colors"
                          >
                            {rel.title} →
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border border-border p-6">
                  <h3 className="text-lg font-bold text-text-strong mb-4">Our Services</h3>
                  <ul className="space-y-2">
                    {services.map((svc) => (
                      <li key={svc.slug}>
                        <Link
                          to={`/services/${svc.slug}`}
                          className="text-sm text-text-strong hover:text-accent-primary transition-colors"
                        >
                          {svc.title} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
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
            Your Local Utah Pool Builder
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            16+ years serving homeowners across Northern Utah, the Salt Lake Valley, and Utah Valley with one in-house team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-black hover:bg-white/90 rounded-full px-8">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
              <Link to="/services">
                <ArrowLeft size={16} className="mr-2" />
                View Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

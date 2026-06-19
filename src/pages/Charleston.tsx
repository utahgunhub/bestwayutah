import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Charleston() {
  useEffect(() => {
    document.title = "Charleston Custom Homes & Remodeling | Bradford Remodels";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "High-end custom homes, remodeling, and coastal renovations in Charleston, SC. Kitchens, baths, historic restorations, additions, and whole-home projects in Mount Pleasant, Daniel Island, West Ashley, and Isle of Palms."
      );
    }
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-end justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/charleston-hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute bottom-16 md:bottom-24 left-0 right-0 z-10">
          <div className="w-[80%] mx-auto">
            <h1
              className="text-white leading-tight mb-4"
              style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
            >
              <span className="block text-4xl md:text-6xl lg:text-7xl">Charleston Custom Homes</span>
              <span className="block text-4xl md:text-6xl lg:text-7xl italic">& Remodeling</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Sensitive to Lowcountry architecture, resilient to coastal conditions, and crafted to endure.
            </p>
          </div>
        </div>
      </section>

      {/* Combined Overview + Custom Homes (single section, paragraph format) */}
      <section className="py-20 bg-bg">
        <div className="w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Elongated image left */}
            <div className="lg:col-span-5">
              <div className="relative h-72 md:h-96 lg:h-[520px] overflow-hidden shadow-2xl">
                <img 
                  src="/lowcountry-image.jpg" 
                  alt="Charleston custom home and remodeling" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Paragraph content right */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-text-strong mb-6">Built for the Lowcountry</h2>
              <p className="text-text text-lg leading-relaxed mb-5">
                From historic downtown residences to modern coastal homes, we deliver kitchens, baths, and whole‑home
                remodels that respect Charleston’s timeless character. We coordinate design, hurricane‑rated selections,
                and permitting while keeping the process smooth and predictable.
              </p>
              <p className="text-text leading-relaxed mb-5">
                Our capabilities include historic restorations, custom millwork, and elevation‑sensitive additions;
                coastal materials with impact‑rated windows and robust moisture control; luxury kitchens and baths with
                artisan tile craftsmanship and custom cabinetry; and whole‑home renovations with outdoor living and
                elevated decks.
              </p>
              <p className="text-text leading-relaxed mb-5">
                <span className="font-semibold text-text-strong">Neighborhoods we serve: </span>
                Casaque, Kiawah River, Kiawah Island, Seabrook Island Club, East Brook Village, West Brook Village, and The
                Preserve. Our team is experienced with the City of Charleston Board of Architectural Review (BAR) and
                regional coastal requirements.
              </p>
              <p className="text-text leading-relaxed mb-0">
                For new‑home builds, we tailor design to Charleston’s climate and architectural heritage—bringing a
                BAR‑aware process, impact‑rated assemblies, premium interiors with artisan details, and transparent budgets
                with clear schedules and on‑site supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      <section className="py-20 bg-bg">
        <div className="w-[80%] mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong mb-4">Experience Charleston Living</h2>
            <p className="text-text text-lg max-w-3xl">
              Take a visual journey through Charleston's architectural beauty and coastal charm. This video showcases 
              the unique character and timeless elegance that defines our Lowcountry projects.
            </p>
          </div>

          <div className="w-full aspect-video bg-black shadow-2xl overflow-hidden">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/SK8eaz4sbJg?si=skhixUU8fdmnaOIz" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Focus Neighborhoods section removed per request */}

      {/* Map Embed */}
      <section className="py-16 bg-bg">
        <div className="w-[80%] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-strong mb-6">Charleston Service Area</h2>
          <div className="w-full h-[300px] md:h-[450px] overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.860166575573!2d-79.9440679!3d32.795966799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe7b6bcb5220fd%3A0x40379f40547dce7a!2sBradford%20Custom%20Homes%20of%20Charleston!5e0!3m2!1sen!2sus!4v1760645868341!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-16" style={{ backgroundColor: "#1A120A" }}>
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
          <div className="lg:col-span-8">
            <h2
              className="text-white leading-tight"
              style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
            >
              <span className="block text-4xl md:text-5xl lg:text-6xl">Transform Your</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic">Charleston Home</span>
            </h2>
          </div>
          <div className="lg:col-span-4 text-white/80 text-lg">
            Design-forward, detail-driven, and tuned to Charleston's unique climate and codes.
          </div>
        </div>
        <div className="w-[80%] mx-auto mt-12 flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="bg-white text-black px-6 py-4 rounded-full font-medium hover:bg-white/90 transition"
          >
            Schedule Consultation
          </Link>
          <Link
            to="/gallery"
            className="bg-white text-black px-6 py-4 rounded-full font-medium hover:bg-white/90 transition"
          >
            Explore Gallery
          </Link>
        </div>
      </section>
    </Layout>
  );
}



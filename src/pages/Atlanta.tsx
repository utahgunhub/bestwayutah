import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Atlanta() {
  useEffect(() => {
    document.title = "Atlanta Home Remodeling & Custom Homes | Bradford Remodels";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Premium home remodeling and custom homes in Atlanta, GA. Kitchens, bathrooms, whole-home renovations, additions, and historic updates across Buckhead, Sandy Springs, Decatur, Alpharetta, and Marietta."
      );
    }
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-end justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/DSC08203.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute bottom-16 md:bottom-24 left-0 right-0 z-10">
          <div className="w-[80%] mx-auto">
            <h1
              className="text-white leading-tight mb-4"
              style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
            >
              <span className="block text-4xl md:text-6xl lg:text-7xl">Atlanta Home Remodeling</span>
              <span className="block text-4xl md:text-6xl lg:text-7xl italic">& Custom Homes</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Thoughtful design, precise execution, and finishes that last—crafted for Atlanta living.
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
                  src="/home-gallery/home-gallery-1.png" 
                  alt="Atlanta custom home and remodeling" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Paragraph content right */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-text-strong mb-6">Remodeling & Custom Homes in Atlanta</h2>
              <p className="text-text text-lg leading-relaxed mb-5">
                We specialize in premium kitchens, spa‑grade bathrooms, whole‑home transformations, and character‑preserving
                renovations for historic properties. From Buckhead estates to intown bungalows, our team coordinates design,
                permits, and construction with clear communication and craftsmanship you can feel.
              </p>
              <p className="text-text leading-relaxed mb-5">
                Capabilities include custom kitchens with integrated appliances and built‑ins; luxury bathrooms with wet
                rooms, steam, and heated floors; structural reconfiguration and thoughtfully integrated additions; and
                historic renovations that respect period details while improving performance.
              </p>
              <p className="text-text leading-relaxed mb-0">
                <span className="font-semibold text-text-strong">Areas we serve: </span>
                Buckhead, Sandy Springs, Decatur, Alpharetta, Brookhaven, Marietta, Roswell, and Virginia‑Highland. Familiar
                with City of Atlanta, Fulton, and DeKalb permitting, neighborhood overlays, and historical review where
                applicable.
              </p>
              <p className="text-text leading-relaxed mt-5">
                For new builds across metro Atlanta, we collaborate with leading architects to align design, engineering,
                and selections—delivering high‑performance envelopes, premium finishes, and clear budgeting with dedicated
                site management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects / Aspirational */}
      <section className="py-20 bg-bg">
        <div className="w-[80%] mx-auto">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">Recent & Aspirational Projects</h2>
            <Link to="/gallery" className="hidden md:inline-flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity">
              <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
              <span className="text-sm font-medium uppercase tracking-wide">Explore Gallery</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Project Radium", tag: "Loft Renovation - Completed 2024", image: "/131 Radium St NW Low Res_09.jpg" },
              { title: "Project Post Oak", tag: "Basement Renovation - Completed 2024", image: "/home-gallery/home-gallery-3.png" },
              { title: "Project Pharaoh", tag: "Kitchen Renovation - Completed 2024", image: "/pharoah.png" },
              { title: "Renaissance", tag: "Basement Renovation - Completed 2025", image: "/DSC08196.jpg" },
            ].map((card, i) => (
              <div key={i} className="group bg-white border shadow-sm overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="text-sm text-text-strong/60 mb-1">{card.tag}</div>
                  <h3 className="text-lg font-semibold text-text-strong">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods section removed per request */}

      {/* Map Embed */}
      <section className="py-16 bg-bg">
        <div className="w-[80%] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-strong mb-6">Atlanta Service Area</h2>
          <div className="w-full h-[300px] md:h-[450px] overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.3225894984203!2d-84.6367727!3d34.0612439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5472c7af2cbeb%3A0xb648b6e24417a084!2sBradford%20Custom%20Homes%20%26%20Remodeling!5e0!3m2!1sen!2sus!4v1760645781698!5m2!1sen!2sus"
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
              <span className="block text-4xl md:text-5xl lg:text-6xl">Ready to Elevate</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic">Your Atlanta Home?</span>
            </h2>
          </div>
          <div className="lg:col-span-4 text-white/80 text-lg">
            Thoughtful design guidance, transparent budgets, and a build experience that respects your time.
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



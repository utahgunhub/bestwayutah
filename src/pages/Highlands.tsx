import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Highlands() {
  useEffect(() => {
    document.title = "Highlands NC Custom Homes & Remodeling | Bradford Remodels";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Luxury mountain homes and remodeling in Highlands, North Carolina. Custom builds, kitchen and bath renovations, and whole-home transformations designed for mountain living."
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
            backgroundImage: `url(/new-construction-hero.jpg)`,
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
              <span className="block text-4xl md:text-6xl lg:text-7xl">Highlands Custom Homes</span>
              <span className="block text-4xl md:text-6xl lg:text-7xl italic">& Remodeling</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl">
              Crafted for mountain living with timeless design and enduring quality.
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
                  src="/home-gallery/home-gallery-2.png" 
                  alt="Highlands NC custom home and remodeling" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Paragraph content right */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-text-strong mb-6">Built for Mountain Living</h2>
              <p className="text-text text-lg leading-relaxed mb-5">
                From rustic mountain retreats to contemporary luxury homes, we deliver custom builds and remodels that 
                embrace Highlands' natural beauty. Our team coordinates design, permits, and construction with expertise 
                in mountain-specific challenges including elevation, weather, and seasonal access.
              </p>
              <p className="text-text leading-relaxed mb-5">
                Our capabilities include custom mountain homes with timber framing and stone accents; luxury kitchens 
                designed for entertaining with premium appliances and custom cabinetry; spa-inspired bathrooms with 
                heated floors and natural materials; whole-home renovations that respect mountain architecture; and 
                outdoor living spaces that maximize views and integrate seamlessly with the landscape.
              </p>
              <p className="text-text leading-relaxed mb-5">
                <span className="font-semibold text-text-strong">Areas we serve: </span>
                Highlands, Cashiers, Sapphire Valley, Lake Toxaway, and surrounding mountain communities. Our team 
                understands local building codes, mountain construction requirements, and works with trusted local 
                trades familiar with high-elevation building.
              </p>
              <p className="text-text leading-relaxed mb-0">
                For new construction in the Highlands area, we collaborate with architects who specialize in mountain 
                homes—delivering designs that maximize views, weather-resistant assemblies, premium finishes that 
                complement natural surroundings, and transparent project management adapted to mountain logistics.
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
              { title: "Mountain Modern", tag: "Highlands", image: "/home-gallery/home-gallery-2.png" },
              { title: "Timber Frame Estate", tag: "Cashiers", image: "/home-gallery/home-gallery-9.png" },
              { title: "Lakeside Retreat", tag: "Lake Toxaway", image: "/home-gallery/home-gallery-10.png" },
              { title: "Contemporary Mountain Home", tag: "Sapphire Valley", image: "/home-gallery/home-gallery-11.png" },
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

      {/* Map Embed */}
      <section className="py-16 bg-bg">
        <div className="w-[80%] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-strong mb-6">Highlands Service Area</h2>
          <div className="w-full h-[300px] md:h-[450px] overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52274.84863641586!2d-83.23651637832031!3d35.05271437158203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x885911b8c44e5ddd%3A0x4a11f54d8a079cf7!2sHighlands%2C%20NC%2028741!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
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
              <span className="block text-4xl md:text-5xl lg:text-6xl">Create Your</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic">Mountain Retreat</span>
            </h2>
          </div>
          <div className="lg:col-span-4 text-white/80 text-lg">
            Expert mountain construction with attention to detail and respect for the natural environment.
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


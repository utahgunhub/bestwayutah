import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useMemo, useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Home } from "lucide-react";

type FilterType = "all" | "pools" | "construction";

type ProjectImageProps = {
  src: string;
  alt: string;
  dialogAlt: string;
};

function ProjectImage({ src, alt, dialogAlt }: ProjectImageProps) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const imageEl = imgRef.current;
    if (!imageEl) return;

    const determineOrientation = () => {
      if (!imageEl.naturalWidth || !imageEl.naturalHeight) return;
      const ratio = imageEl.naturalHeight / imageEl.naturalWidth;
      setIsPortrait(ratio >= 1.15);
    };

    if (imageEl.complete) {
      determineOrientation();
    }

    imageEl.addEventListener("load", determineOrientation);

    return () => {
      imageEl.removeEventListener("load", determineOrientation);
    };
  }, [src]);

  useEffect(() => {
    if (!itemRef.current) return;
    itemRef.current.style.gridRowEnd = `span ${isPortrait ? 2 : 1}`;
  }, [isPortrait]);

  const imageHeightClasses = isPortrait
    ? "h-[504px] md:h-[664px] lg:h-[744px]"
    : "h-[240px] md:h-[320px] lg:h-[360px]";

  return (
    <div ref={itemRef} className="group overflow-hidden" style={{ gridRowEnd: "span 1" }}>
      <Dialog>
        <DialogTrigger asChild>
          <button className="block focus:outline-none w-full">
            <div className={`relative w-full ${imageHeightClasses}`}>
              <img 
                ref={imgRef}
                src={encodeURI(src)}
                alt={alt} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
                loading="lazy"
                decoding="async"
              />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-6xl p-0 bg-transparent border-none shadow-none sm:rounded-none">
          <img 
            src={encodeURI(src)}
            alt={dialogAlt} 
            className="w-full h-auto max-h-[90vh] object-contain" 
            loading="eager"
            decoding="async"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

const nicePoolImages = Array.from({ length: 31 }, (_, i) => `/bestway-images/nice-pools/pools-${i + 1}.png`);
const constructionImages = Array.from({ length: 30 }, (_, i) => `/bestway-images/gallery-${i + 1}.webp`);

const projects = [
  {
    id: "pools",
    name: "Pools",
    category: "pools" as const,
    location: "Utah",
    type: "Completed Projects",
    description: "Browse finished pools we've built across Utah — custom shapes, finishes, and layouts designed to fit each backyard.",
    link: "/services",
    images: nicePoolImages,
  },
  {
    id: "construction",
    name: "Construction",
    category: "construction" as const,
    location: "Utah",
    type: "Excavation, Rebar, Plumbing & Shotcrete",
    description: "Our full in-house team handles excavation and rebar, plumbing, shotcrete, tile, plaster, and copping — everything needed to build a pool that lasts.",
    link: "/services",
    images: constructionImages,
  },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <Layout>
      <section className="relative h-[60vh] flex items-end justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/bestway-images/nice-pools/pools-4.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-text-strong/40"></div>
        </div>

        <div className="absolute bottom-16 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-white leading-tight mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
              <div className="text-4xl md:text-5xl lg:text-6xl">Gallery</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl">Explore our pool and construction projects across Utah.</p>
          </div>
        </div>
      </section>

      <section className="bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex gap-6 mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveFilter("all")}
              className={`pb-4 font-medium text-lg transition-all ${
                activeFilter === "all"
                  ? "text-text-strong border-b-2 border-text-strong"
                  : "text-text hover:text-text-strong"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("pools")}
              className={`pb-4 font-medium text-lg transition-all ${
                activeFilter === "pools"
                  ? "text-text-strong border-b-2 border-text-strong"
                  : "text-text hover:text-text-strong"
              }`}
            >
              Pools
            </button>
            <button
              onClick={() => setActiveFilter("construction")}
              className={`pb-4 font-medium text-lg transition-all ${
                activeFilter === "construction"
                  ? "text-text-strong border-b-2 border-text-strong"
                  : "text-text hover:text-text-strong"
              }`}
            >
              Construction
            </button>
          </div>

          <div className="space-y-24">
            {filteredProjects.map((project) => (
              <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-3">
                  <div className="lg:sticky lg:top-24 bg-bg space-y-4">
                    <div>
                      <h2 className="text-2xl lg:text-3xl text-text-strong" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
                        {project.name}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 text-text">
                      <MapPin size={16} />
                      <span className="text-base">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home size={16} className="text-text" />
                      <span className="text-sm font-medium text-text">{project.type}</span>
                    </div>
                    <p className="text-base text-text leading-relaxed">
                      {project.description}
                    </p>
                    <Link 
                      to={project.link}
                      className="inline-block text-text-strong font-medium hover:underline"
                    >
                      View Services →
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-9">
                  <div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-[240px] md:auto-rows-[320px] lg:auto-rows-[360px] grid-flow-row-dense"
                    data-gallery-grid
                  >
                    {project.images.map((src, idx) => (
                      <ProjectImage 
                        key={idx}
                        src={src}
                        alt={`${project.name} ${idx + 1}`}
                        dialogAlt={`${project.name} ${idx + 1} large`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{backgroundColor: '#eae3d7'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl text-text-strong mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
            Ready to Start Your Project?
          </h3>
          <p className="text-lg md:text-xl text-text mb-8">
            Experience comprehensive Pool Construction, Repairs and Remodeling services in Utah. Contact us for a free consultation.
          </p>
          <Link to="/contact">
            <button className="bg-black text-white px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-black/90 transition-colors">
              Free Consultation
            </button>
          </Link>
        </div>
      </section>

    </Layout>
  );
}

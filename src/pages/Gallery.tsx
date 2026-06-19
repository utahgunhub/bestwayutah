import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useMemo, useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Home } from "lucide-react";

type FilterType = "all" | "new-builds" | "remodels";

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

// Project metadata with images
const projects = [
  {
    id: "fox-croft",
    name: "Fox Croft",
    category: "new-builds",
    location: "Atlanta, GA",
    type: "New Construction",
    description: "Custom new construction residence featuring indoor-outdoor living and a Neptune spa pool.",
    link: "/projects/fox-croft",
    images: Array.from({ length: 58 }, (_, i) => {
      const num = (i + 1).toString().padStart(2, '0');
      return `/fox-croft-photos/${num}-Foxcroft Rd NW-${i + 1}.jpg`;
    })
  },
  {
    id: "stone-creek",
    name: "Stone Creek Interior",
    category: "new-builds",
    location: "Woodstock, GA",
    type: "New Construction",
    description: "Luxury custom home on nearly two acres with chef's kitchen and terrace-level entertainment space.",
    link: "/projects/stone-creek",
    images: Array.from({ length: 12 }, (_, i) => {
      const num = (i + 1).toString().padStart(2, '0');
      return `/project-stone-creek/205 Stone Creek Ct High Res_${num}.jpg`;
    })
  },
  {
    id: "avondale",
    name: "Avondale Residence",
    category: "new-builds",
    location: "Atlanta, GA",
    type: "New Construction",
    description: "Modern luxury new build featuring spa-inspired master bath and custom built-ins throughout.",
    link: "/projects/avondale",
    images: Array.from({ length: 12 }, (_, i) => {
      const num = (i + 1).toString().padStart(2, '0');
      return `/avondale/1224 Avondale Ave SE High Res_${num}.jpg`;
    })
  },
  {
    id: "renaissance",
    name: "Renaissance",
    category: "remodels",
    location: "Atlanta, GA",
    type: "Basement Remodel",
    description: "Complete basement transformation featuring a custom bar, wellness spa with sauna and cold plunge.",
    link: "/projects/okun",
    images: Array.from({ length: 58 }, (_, i) => {
      const num = (i + 1).toString().padStart(2, '0');
      return `/okun-photos/${num}-okun-${i + 1}.jpg`;
    })
  },
  {
    id: "post-oak",
    name: "Post Oak Basement",
    category: "remodels",
    location: "Marietta, GA",
    type: "Basement Remodel",
    description: "Luxurious basement transformation with custom finishes and sophisticated entertaining spaces.",
    link: "/projects/post-oak-basement",
    images: Array.from({ length: 14 }, (_, i) => {
      const num = (i + 1).toString().padStart(2, '0');
      return `/anderson-basement/3624 Post Oak Tritt Rd High Res_${num}.jpg`;
    })
  },
  {
    id: "pharoah",
    name: "Pharoah Kitchen",
    category: "remodels",
    location: "Marietta, GA",
    type: "Kitchen Remodel",
    description: "Stunning kitchen transformation featuring custom cabinetry and premium appliances.",
    link: "/projects/pharoah-kitchen",
    images: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11].map(i => {
      const num = i.toString().padStart(2, '0');
      return `/pharoah-kitchen/103 American Pharoah Wy High Res_${num}.jpg`;
    })
  }
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Get filtered projects
  const filteredProjects = useMemo(() => {
    const list = activeFilter === "all"
      ? projects
      : projects.filter(p => p.category === activeFilter);

    return [...list].sort((a, b) => a.images.length - b.images.length);
  }, [activeFilter]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-end justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/gallery-hero.png)`,
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
              <div className="text-4xl md:text-5xl lg:text-6xl">Our</div>
              <div className="text-4xl md:text-5xl lg:text-6xl italic">Portfolio</div>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-xl">Explore our featured projects across Atlanta and beyond.</p>
          </div>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter Tabs */}
          <div className="flex gap-6 mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveFilter("all")}
              className={`pb-4 font-medium text-lg transition-all ${
                activeFilter === "all"
                  ? "text-text-strong border-b-2 border-text-strong"
                  : "text-text hover:text-text-strong"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveFilter("new-builds")}
              className={`pb-4 font-medium text-lg transition-all ${
                activeFilter === "new-builds"
                  ? "text-text-strong border-b-2 border-text-strong"
                  : "text-text hover:text-text-strong"
              }`}
            >
              New Builds
            </button>
            <button
              onClick={() => setActiveFilter("remodels")}
              className={`pb-4 font-medium text-lg transition-all ${
                activeFilter === "remodels"
                  ? "text-text-strong border-b-2 border-text-strong"
                  : "text-text hover:text-text-strong"
              }`}
            >
              Remodels
            </button>
          </div>

          <div className="space-y-24">
            {filteredProjects.map((project) => (
              <div key={project.id} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Sidebar - Project Info */}
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
                    {project.link !== "#" && (
                      <Link 
                        to={project.link}
                        className="inline-block text-text-strong font-medium hover:underline"
                      >
                        View Full Project →
                      </Link>
                    )}
                  </div>
                </div>

                {/* Right - Image Gallery by Project */}
                <div className="lg:col-span-9">
                  {/* Project Images - Masonry Grid */}
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

      {/* CTA Section */}
      <section className="py-24" style={{backgroundColor: '#eae3d7'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl text-text-strong mb-4" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
            Ready to Start Your Project?
          </h3>
          <p className="text-lg md:text-xl text-text mb-8">
            Let's discuss your vision and bring it to life. Schedule a private consultation with our team.
          </p>
          <Link to="/contact">
            <button className="bg-black text-white px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-black/90 transition-colors">
              Schedule Your Consultation
            </button>
          </Link>
        </div>
      </section>

    </Layout>
  );
}

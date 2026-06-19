import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function FoxCroft() {
  const images = useMemo(() => {
    const total = 58;
    const paths: string[] = [];
    for (let n = 1; n <= total; n++) {
      const two = String(n).padStart(2, '0');
      paths.push(`/fox-croft-photos/${two}-Foxcroft Rd NW-${n}.jpg`);
    }
    return paths;
  }, []);

  const encodedImages = useMemo(() => images.map((p) => encodeURI(p)), [images]);
  const videoSrc = useMemo(() => encodeURI('/fox-croft-photos/fox-croft-video-2.mp4'), []);

  // Masonry gallery uses per-image dialogs; no shared lightbox state needed

  return (
    <Layout>
      <Hero 
        title="Fox Croft"
        subtitle="Atlanta, Georgia"
        backgroundVideoSrc={videoSrc}
        hideCTA
      />

      {/* Back link */}
      <section className="bg-bg pt-6">
        <div className="w-[80%] mx-auto">
          <Link to="/new-construction" className="text-text hover:opacity-80">← Back to New Construction</Link>
        </div>
      </section>

      {/* Overview + Details */}
      <section className="bg-bg py-16">
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-normal text-text-strong mb-6" style={{ fontFamily: "'PP Editorial Old', serif" }}>
              A Modern Classic Built for Refined Indoor–Outdoor Living
            </h2>
            <div className="space-y-5 text-text leading-relaxed text-lg">
              <p>
                A ground‑up custom residence where proportion, light, and texture come together.
                The main living spaces open to the rear terrace and the Neptune spa pool, creating an effortless
                connection for everyday living and entertaining.
              </p>
              <p>
                Crafted with premium materials and quiet performance in mind, the home balances warmth and sophistication—
                from custom millwork and stone to thoughtful lighting and integrated systems.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div>
              <h3 className="text-xl font-semibold text-text-strong mb-3">Key Features</h3>
              <ul className="space-y-2 text-text">
                <li>• Neptune Spa Pool</li>
                <li>• Indoor‑Outdoor Great Room with large sliders</li>
                <li>• Chef’s kitchen with custom millwork</li>
                <li>• Luxury primary suite and spa bath</li>
                <li>• Energy‑efficient envelope and systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Image Band with Timeline Overlay */}
      <section className="bg-bg-alt pt-12">
        <div className="w-[80%] mx-auto">
          <div className="relative overflow-hidden">
            <AspectRatio ratio={16/7} className="min-h-[320px] sm:min-h-[380px] md:min-h-[460px]">
              <img src={encodedImages[2] ?? encodedImages[0]} alt="Terrace and pool" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </AspectRatio>

            {/* Overlay timeline content */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">Project Timeline</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { phase: 'Design', when: 'Jan – Mar 2024' },
                  { phase: 'Site & Foundation', when: 'Apr – May 2024' },
                  { phase: 'Framing & Systems', when: 'Jun – Sep 2024' },
                  { phase: 'Finishes & Completion', when: 'Oct 2024 – Jan 2025' },
                ].map((t, i) => (
                  <div key={i} className="text-white/90">
                    <div className="text-sm">{t.phase}</div>
                    <div className="text-lg font-semibold">{t.when}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Removed standalone video section; hero video is used instead */}

      {/* Removed separate timeline section in favor of overlay */}

      {/* Gallery - Masonry columns with per-image dialog (matches provided pattern) */}
      <section className="bg-bg-alt pt-4 pb-0">
        <div className="w-[80%] mx-auto columns-1 sm:columns-2 lg:columns-4 gap-4 [column-fill:_balance]">
          {encodedImages.map((src, idx) => (
            <Dialog key={idx}>
              <DialogTrigger asChild>
                <button className="break-inside-avoid mb-4 block focus:outline-none">
                  <img src={src} alt={`Fox Croft ${idx + 1}`} className="w-full h-auto" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none sm:rounded-none [&>button]:absolute [&>button]:right-4 [&>button]:top-4 [&>button]:bg-black/50 [&>button]:text-white [&>button]:rounded-full [&>button]:p-2 [&>button]:hover:bg-black/70">
                <img src={src} alt={`Fox Croft ${idx + 1} large`} className="w-full h-auto max-h-[85vh] object-contain" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* Removed shared lightbox; each image has its own dialog */}

      {/* CTA */}
      <section className="py-24 bg-bg-alt">
        <div className="w-[80%] mx-auto text-center">
          <h3 className="text-3xl md:text-4xl text-text-strong" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
            Interested in a home like this?
          </h3>
          <p className="mt-3 text-text">Private consultations by appointment.</p>
          <div className="mt-8">
            <Button asChild className="bg-black text-white hover:bg-black/90 rounded-full px-6 py-5 text-base md:text-lg font-medium">
              <Link to="/contact">Schedule Your Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}



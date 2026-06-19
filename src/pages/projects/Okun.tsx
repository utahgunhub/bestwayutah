import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function Okun() {
  const images = useMemo(() => {
    const total = 58;
    const paths: string[] = [];
    for (let n = 1; n <= total; n++) {
      const two = String(n).padStart(2, '0');
      paths.push(`/okun-photos/${two}-okun-${n}.jpg`);
    }
    return paths;
  }, []);

  const encodedImages = useMemo(() => images.map((p) => encodeURI(p)), [images]);
  const heroImage = encodedImages[42] ?? encodedImages[0];

  return (
    <Layout>
      <Hero 
        title="Renaissance"
        subtitle="Basement Remodel"
        backgroundImage={heroImage}
        hideCTA
      />

      {/* Back link */}
      <section className="bg-bg pt-6">
        <div className="w-[80%] mx-auto">
          <Link to="/remodel" className="text-text hover:opacity-80">← Back to Remodel</Link>
        </div>
      </section>

      {/* Overview + Details */}
      <section className="bg-bg py-16">
        <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl md:text-4xl font-normal text-text-strong mb-6" style={{ fontFamily: "'PP Editorial Old', serif" }}>
              A Luxurious Retreat for Wellness and Entertainment
            </h2>
            <div className="space-y-5 text-text leading-relaxed text-lg">
              <p>
                Renaissance is a complete basement transformation designed for both relaxation and entertainment.
                This space features a custom bar, spa with sauna and cold plunge, Cambria feature wall, and our signature
                C-shaped seating — a Bradford original.
              </p>
              <p>
                Thoughtfully designed lighting and finishes throughout create a luxurious retreat right at home.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text-strong mb-3">Key Features</h3>
              <ul className="space-y-2 text-text">
                <li>• Wellness Spa</li>
                <li>• Home Theater</li>
                <li>• Custom C‑Shaped Seating</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Image Band */}
      <section className="bg-bg-alt pt-12">
        <div className="w-[80%] mx-auto">
          <div className="relative overflow-hidden">
            <AspectRatio ratio={16/7} className="min-h-[320px] sm:min-h-[380px] md:min-h-[460px]">
              <img src={encodedImages[2] ?? encodedImages[0]} alt="Okun feature" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </AspectRatio>
            {/* Overlay timeline content (match Fox Croft design) */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">Project Timeline</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { phase: 'Design', when: 'Jan – Mar 2025' },
                  { phase: 'Site & Foundation', when: 'Apr – May 2025' },
                  { phase: 'Framing & Systems', when: 'Jun – Sep 2025' },
                  { phase: 'Finishes & Completion', when: 'Oct 2025 – Jan 2026' },
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

      {/* Gallery - Masonry columns with per-image dialog (matches provided pattern) */}
      <section className="bg-bg-alt pt-4 pb-0">
        <div className="w-[80%] mx-auto columns-1 sm:columns-2 lg:columns-4 gap-4 [column-fill:_balance]">
          {encodedImages.map((src, idx) => (
            <Dialog key={idx}>
              <DialogTrigger asChild>
                <button className="break-inside-avoid mb-4 block focus:outline-none">
                  <img src={src} alt={`Okun ${idx + 1}`} className="w-full h-auto" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none sm:rounded-none [&>button]:absolute [&>button]:right-4 [&>button]:top-4 [&>button]:bg-black/50 [&>button]:text-white [&>button]:rounded-full [&>button]:p-2 [&>button]:hover:bg-black/70">
                <img src={src} alt={`Okun ${idx + 1} large`} className="w-full h-auto max-h-[85vh] object-contain" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-bg-alt">
        <div className="w-[80%] mx-auto text-center">
          <h3 className="text-3xl md:text-4xl text-text-strong" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
            Considering a transformation like this?
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



import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useMemo } from "react";

export default function PostOakBasement() {
  const images = useMemo(() => {
    const total = 14;
    const paths: string[] = [];
    for (let n = 1; n <= total; n++) {
      const two = String(n).padStart(2, '0');
      paths.push(`/anderson-basement/3624 Post Oak Tritt Rd High Res_${two}.jpg`);
    }
    return paths;
  }, []);

  const encodedImages = useMemo(() => images.map((p) => encodeURI(p)), [images]);
  const heroImage = encodedImages[0];

  return (
    <Layout>
      <Hero 
        title="Post Oak Basement"
        subtitle="Marietta, Georgia"
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
              Entertaining Space With a Warm Finish
            </h2>
            <div className="space-y-5 text-text leading-relaxed text-lg">
              <p>
                For the Post Oak residence, we transformed an unfinished daylight basement into a refined entertaining level.
                The new plan layers a custom bar, lounge seating, and flexible dining so the family can host year-round.
              </p>
              <p>
                Natural light pours in through oversized windows, while warm woods, polished stone, and curated lighting
                add a tailored feel. Every zone remains connected, allowing the space to expand from intimate gatherings to
                full-house celebrations.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text-strong mb-3">Key Features</h3>
              <ul className="space-y-2 text-text">
                <li>• Custom bar with backlit shelving</li>
                <li>• Dual dining zones for flexible hosting</li>
                <li>• Cozy lounge anchored by a sculptural fireplace</li>
                <li>• Soft white oak floors throughout</li>
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
              <img src={encodedImages[3] ?? encodedImages[0]} alt="Post Oak feature" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            </AspectRatio>
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
              <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">Project Snapshot</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { phase: 'Design', when: 'Feb – Apr 2024' },
                  { phase: 'Build-Out', when: 'May – Aug 2024' },
                  { phase: 'Millwork & Finishes', when: 'Sep – Oct 2024' },
                  { phase: 'Styling & Reveal', when: 'Nov 2024' },
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

      {/* Gallery */}
      <section className="bg-bg-alt pt-4 pb-0">
        <div className="w-[80%] mx-auto columns-1 sm:columns-2 lg:columns-4 gap-4 [column-fill:_balance]">
          {encodedImages.map((src, idx) => (
            <Dialog key={idx}>
              <DialogTrigger asChild>
                <button className="break-inside-avoid mb-4 block focus:outline-none">
                  <img src={src} alt={`Post Oak Basement ${idx + 1}`} className="w-full h-auto" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl p-0 bg-transparent border-none shadow-none sm:rounded-none [&>button]:absolute [&>button]:right-4 [&>button]:top-4 [&>button]:bg-black/50 [&>button]:text-white [&>button]:rounded-full [&>button]:p-2 [&>button]:hover:bg-black/70">
                <img src={src} alt={`Post Oak Basement ${idx + 1} large`} className="w-full h-auto max-h-[85vh] object-contain" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-bg-alt">
        <div className="w-[80%] mx-auto text-center">
          <h3 className="text-3xl md:text-4xl text-text-strong" style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}>
            Ready to rethink your lower level?
          </h3>
          <p className="mt-3 text-text">Private consultations by appointment only.</p>
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


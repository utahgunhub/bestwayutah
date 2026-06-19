import Layout from "@/components/Layout";
import { useEffect } from "react";

export const meta = {
  slug: "/blog/bathroom-remodel-timeline-and-checklist",
  title: "Bathroom Remodel Timeline + Checklist",
  description:
    "Plan a bathroom remodel with realistic timelines and a step-by-step checklist. Understand phases, inspections, and how to prepare your home for a smooth project.",
  author: "Bradford Remodels",
  date: "2025-10-16",
  readTimeMinutes: 8,
  heroImage: "/about-hero.png",
};

export default function BathroomTimelineChecklist() {
  useEffect(() => {
    document.title = meta.title;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", meta.description);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[48vh] flex items-end justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${meta.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Title intentionally not displayed on hero */}
      </section>

      {/* Meta bar */}
      <section className="bg-bg">
        <div className="w-[80%] max-w-3xl mx-auto py-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-strong/70">
            <span>{new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>•</span>
            <span>{meta.readTimeMinutes} min read</span>
            <span>•</span>
            <span>By {meta.author}</span>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="py-6 md:pt-10 md:pb-20 bg-bg">
        <div className="w-[80%] max-w-3xl mx-auto prose prose-neutral md:prose-lg prose-headings:tracking-tight prose-headings:leading-tight prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed prose-ul:leading-relaxed prose-ol:leading-relaxed">
          <h1 className="mb-2">{meta.title}</h1>
          <p className="lead text-text/80">{meta.description}</p>
          <p>
            Remodeling a bathroom touches nearly every trade in a home—framing, plumbing, electrical, waterproofing,
            tile, glass, millwork, and painting. Because so many details converge in a compact space, planning and
            sequencing are the difference between a smooth project and frustrating delays. This guide outlines a clear
            timeline and checklist so you know what happens when, how to prepare, and how to keep decisions moving.
          </p>
          <h2>Phase 1: Design, Scope, and Selections</h2>
          <p>
            The first and most important phase is clarifying scope and making key selections. Expect 2–6 weeks depending
            on complexity and decision pace. During this time, we measure the space, document existing conditions, and
            align on layout—vanity size and placement, shower configuration, tub inclusion, storage, and lighting.
            Selections include tile (field, mosaic, thresholds), plumbing fixtures (valves, trim, drains), cabinetry,
            countertops, mirrors, lighting, and hardware. Early choices keep downstream work efficient and prevent change
            orders once rough‑in begins.
          </p>
          <h2>Phase 2: Permits and Ordering</h2>
          <p>
            With drawings and selections in hand, we submit for permits where required and order long‑lead materials.
            Lead times vary: custom vanities can run 6–10 weeks, specialty glass 2–3 weeks after tile is set, and
            plumbing fixtures 2–4 weeks depending on brand. We recommend not starting demolition until vanities and key
            fixtures are confirmed with ship dates to minimize downtime.
          </p>
          <h2>Phase 3: Demolition and Rough‑In</h2>
          <p>
            Demolition usually takes 1–3 days. Containment and protection are critical—expect dust barriers, floor
            protection, and daily cleanup. Rough‑in follows: framing adjustments for niches or benches, blocking for
            grab bars or glass hinges, plumbing supply and drain relocation, and electrical for lighting layers and
            receptacles. City inspections typically occur after plumbing and electrical rough‑in. Your project manager
            will coordinate access and documentation so approvals are timely.
          </p>
          <h2>Phase 4: Waterproofing and Tile</h2>
          <p>
            Bathrooms succeed or fail on waterproofing. We use proven, manufacturer‑approved systems for shower pans,
            walls, and niches, and we flood‑test pans before tile. Tile setting can take 1–3 weeks depending on scale and
            pattern complexity. Large format slabs and intricate mosaics require additional time for layout and cuts.
            Heated floors, if included, are installed and tested before tile.
          </p>
          <h2>Phase 5: Fixtures, Glass, and Finishes</h2>
          <p>
            Once tile cures, we set the vanity, tops, and plumbing trim. Mirrors, lighting, accessories, and specialty
            hardware are installed. Shower glass is templated after tile and typically returns within two to three weeks; 
            planning for this lead time avoids surprises near the end.
          </p>
          <h2>Phase 6: Punchlist and Turnover</h2>
          <p>
            Final paint touch‑ups, caulking, and adjustments bring the space together. We walk the bathroom with you, note
            any details, and complete a documented punchlist. You will receive care guidance for stone and grout along
            with product manuals and warranty information.
          </p>
          <h2>Checklist: How to Prepare</h2>
          <ul>
            <li>Confirm all selections and approve the final scope before demolition.</li>
            <li>Set a realistic contingency (5–10%) for unforeseen conditions in older homes.</li>
            <li>Arrange a temporary bath plan if this is your primary bathroom.</li>
            <li>Order long‑lead items early and verify rough‑in specs with the field team.</li>
            <li>Plan for glass lead time; expect a short gap between tile completion and glass install.</li>
          </ul>
          <h2>Typical Duration</h2>
          <p>
            For a hall or guest bath, on‑site work often runs 3–6 weeks once materials are on hand. Primary suites with
            larger showers, heated floors, custom vanities, and stone features typically take 6–10 weeks. With clear
            selections and coordinated deliveries, we keep momentum high and protect quality at every step.
          </p>
          <p>
            If you are planning a remodel in Atlanta or Charleston, our team can provide a focused consultation with
            budget ranges and a timeline tailored to your scope and home. We make the process transparent, predictable,
            and craftsmanship‑forward.
          </p>
        </div>
      </section>
    </Layout>
  );
}



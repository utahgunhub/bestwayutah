import Layout from "@/components/Layout";
import { useEffect } from "react";

export const meta = {
  slug: "/blog/custom-home-vs-remodel-which-is-right",
  title: "Custom Home vs. Remodel: Which Is Right For You?",
  description:
    "Compare building a custom home vs remodeling your existing property. Evaluate scope, costs, zoning, and timelines to choose the right path for your goals.",
  author: "Bradford Remodels",
  date: "2025-10-16",
  readTimeMinutes: 10,
  heroImage: "/new-construction-hero.png",
};

export default function CustomHomeVsRemodel() {
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
            Choosing between building a custom home and remodeling your current property is as much about priorities as
            it is about numbers. Both paths can produce stunning results, but each carries implications for budget,
            schedule, permitting, and daily life during the project. This guide presents a practical framework to help
            you evaluate options through the lenses of scope, site, timing, and long‑term ownership.
          </p>
          <h2>Start With Your Goals</h2>
          <p>
            Clarify the problems you are trying to solve. Do you need more bedrooms, a larger kitchen, or better indoor‑
            outdoor flow? Are you seeking energy performance, a quieter home, or universal design features? For some,
            the character of an older home is essential; for others, modern systems and open layouts are the priority.
            List your must‑haves and nice‑to‑haves; the right path becomes clearer when your goals are specific.
          </p>
          <h2>When Remodeling Makes the Most Sense</h2>
          <ul>
            <li>Your location is excellent and irreplaceable—schools, commute, community, or lot.</li>
            <li>The existing structure can support your goals without wholesale reconstruction.</li>
            <li>You want to preserve historic value or architectural character.</li>
            <li>Scope is concentrated: kitchens, baths, finishes, or targeted reconfiguration.</li>
          </ul>
          <p>
            Remodeling often provides the highest value when the building “bones” are strong and the work concentrates on
            key areas. Phased remodels can also limit disruption and spread investment over time. However, once you begin
            moving major load‑bearing walls, changing rooflines, or expanding the footprint significantly, the equation
            starts to look more like new construction.
          </p>
          <h2>When a Custom Build is the Better Path</h2>
          <ul>
            <li>Extensive structural changes or additions cause costs to converge with new build pricing.</li>
            <li>Zoning, flood, or elevation requirements make reusing the structure inefficient.</li>
            <li>Long‑term energy performance and maintenance goals are better served by a new envelope.</li>
            <li>You want a clean design slate for room relationships, light, and flow.</li>
          </ul>
          <p>
            New construction offers maximum control over layout, systems, and performance. If you are open to changing
            neighborhoods or rebuilding on your lot, a well‑designed custom home can deliver superior functionality and a
            predictable maintenance profile for decades.
          </p>
          <h2>Budget and Financing Considerations</h2>
          <p>
            Remodeling budgets are influenced by unknowns in existing structures—concealed conditions can require
            allowances and contingencies. New builds have fewer surprises but larger total budgets and different
            financing. Construction loans and draws operate differently than home equity‑backed remodels. Align with your
            lender early and build a realistic contingency either way.
          </p>
          <h2>Permitting, Reviews, and Historic Context</h2>
          <p>
            Historic districts in Atlanta and Charleston may require design reviews for exterior changes. Coastal zones
            add wind and moisture considerations that can affect both remodels and new builds. Early coordination with
            local authorities—and product choices that meet regional codes—avoids rework later.
          </p>
          <h2>Schedule and Lifestyle</h2>
          <p>
            On‑site time for a whole‑home remodel often spans several months and may require temporary housing depending
            on scope. New builds run longer overall but happen outside your current living space. Factor in decision time,
            product lead times, and inspections; projects run best when selections are made before the field team starts.
          </p>
          <h2>Decision Framework</h2>
          <ul>
            <li>Define goals and must‑haves clearly.</li>
            <li>Assess structural feasibility and site constraints with a builder.</li>
            <li>Model realistic budgets and contingencies for both paths.</li>
            <li>Consider energy, maintenance, and long‑term ownership costs.</li>
          </ul>
          <p>
            There is no single right answer—only the one that best aligns with your property and priorities. We are happy
            to review options and provide transparent budgets for both routes so you can decide confidently.
          </p>
        </div>
      </section>
    </Layout>
  );
}



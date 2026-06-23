import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";

export const meta = {
  slug: "/blog/utah-pool-construction-cost-guide-2026",
  title: "What Does a New Pool Cost in Utah in 2026?",
  description:
    "Utah pool construction cost guide for 2026: budget ranges, what drives pricing across the Wasatch Front, and how to plan a custom in-ground pool with confidence.",
  author: "Bestway Utah",
  date: "2026-06-15",
  readTimeMinutes: 7,
  heroImage: "/bestway-images/nice-pools/pools-3.png",
};

export default function UtahPoolConstructionCostGuide2026() {
  usePageMeta({
    title: `${meta.title} | Bestway Utah Blog`,
    description: meta.description,
    path: meta.slug,
    image: meta.heroImage,
    keywords:
      "Utah pool cost, pool construction cost Utah, new pool price Salt Lake Valley, Utah County pool builder, inground pool cost 2026",
  });

  return (
    <Layout>
      <section className="relative h-[40vh] md:h-[48vh] flex items-end justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${meta.heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
        </div>
      </section>

      <section className="bg-bg">
        <div className="w-[80%] max-w-3xl mx-auto py-6">
          <nav className="text-sm text-text-strong/70 mb-4">
            <Link to="/blog" className="hover:text-accent-primary transition-colors">← Back to Blog</Link>
          </nav>
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-strong/70">
            <span>{new Date(meta.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
            <span>•</span>
            <span>{meta.readTimeMinutes} min read</span>
            <span>•</span>
            <span>By {meta.author}</span>
          </div>
        </div>
      </section>

      <section className="py-6 md:pt-10 md:pb-20 bg-bg">
        <div className="w-[80%] max-w-3xl mx-auto prose prose-neutral md:prose-lg prose-headings:tracking-tight prose-headings:leading-tight prose-h2:mt-10 prose-h2:mb-4 prose-p:leading-relaxed prose-ul:leading-relaxed">
          <h1 className="mb-2">{meta.title}</h1>
          <p className="lead text-text/80">{meta.description}</p>
          <p>
            If you are researching a new swimming pool in Utah, you have probably seen quotes that range from mid five figures
            to well into six figures — sometimes for what looks like a similar backyard project. That spread is real, and it
            reflects differences in size, shape, soil conditions, finishes, and how completely a contractor handles the work
            in-house. At Bestway Utah, we have spent more than 16 years building pools across the Salt Lake Valley, Utah
            County, and Davis County, and this guide explains what actually drives cost in 2026 so you can budget with
            realistic expectations.
          </p>
          <h2>Typical Budget Ranges in Utah</h2>
          <p>
            Most custom in-ground pools in Utah fall into three general tiers. A smaller geometric pool with standard plaster,
            basic decking, and efficient equipment often starts in the $55,000–$75,000 range before major landscape or patio
            upgrades. Mid-range projects — freeform shapes, upgraded tile lines, variable-speed equipment, heaters, and
            integrated spas — commonly land between $80,000 and $120,000 depending on access, slope, and finish selections.
            Premium builds with extensive shotcrete shaping, large-format tile, automation, fire features, and coordinated
            hardscape frequently exceed $130,000 and can move higher when engineering, retaining walls, or long equipment
            runs are required.
          </p>
          <p>
            These ranges assume a licensed Utah pool builder handles excavation, rebar, shotcrete, plumbing, and finishes with
            their own crews. Projects stitched together from multiple subcontractors often look cheaper on paper but cost more
            in change orders, delays, and rework when one trade blames another.
          </p>
          <h2>What Actually Drives Pool Cost in Utah</h2>
          <ul>
            <li><strong>Site and soil:</strong> Rocky bench lots in Draper, sloped yards in Utah County, and heavy clay along the Wasatch Front add excavation time, hauling, and engineering.</li>
            <li><strong>Pool size and depth:</strong> More shotcrete, rebar, tile, and plaster directly increase material and labor.</li>
            <li><strong>Interior finish:</strong> Standard white plaster is the most economical; pebble, quartz, and glass bead finishes add cost but improve durability in Utah&apos;s high-UV environment.</li>
            <li><strong>Equipment pad:</strong> Heaters, salt systems, automation, and variable-speed pumps improve comfort and efficiency but add upfront investment.</li>
            <li><strong>Permits and engineering:</strong> Cities across the Salt Lake metro require permits, barrier compliance, and inspections — non-negotiable costs that protect your investment.</li>
            <li><strong>Decking and coping:</strong> Concrete, pavers, and natural stone around the pool often represent a significant line item separate from the shell itself.</li>
          </ul>
          <h2>Utah Climate Considerations That Affect Price</h2>
          <p>
            Utah&apos;s hot, dry summers increase evaporation and chemical demand, which is why properly sized filtration and
            circulation matter from day one — undersized equipment leads to expensive upgrades later. Winters bring
            freeze-thaw cycles that punish poorly insulated plumbing and thin shell details. Building correctly the first
            time, with attention to rebar coverage, plumbing depth, and equipment freeze protection, prevents repair bills
            that dwarf the savings from cutting corners upfront.
          </p>
          <h2>How to Get an Accurate Quote</h2>
          <p>
            The most useful estimates come from a site visit, not a phone call. A qualified Utah pool builder should review
            access for excavation equipment, utility locations, slope, and setback lines before committing to a number. Ask
            what is included — permits, engineering, cleanup, and warranty — and whether one company owns the full process
            from dig to fill.
          </p>
          <p>
            Ready to talk numbers for your backyard? <Link to="/contact">Contact Bestway Utah</Link> for a free consultation
            or explore our <Link to="/services/new-swimming-pools">new swimming pool services</Link> to see how we build
            across Northern Utah, the Salt Lake Valley, and Utah Valley.
          </p>
        </div>
      </section>
    </Layout>
  );
}

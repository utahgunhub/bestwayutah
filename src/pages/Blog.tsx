import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { usePageMeta } from "@/hooks/usePageMeta";
import { meta as costGuideMeta } from "./blog/UtahPoolConstructionCostGuide2026";
import { meta as maintenanceMeta } from "./blog/UtahPoolMaintenanceSeasonalGuide";

const posts = [maintenanceMeta, costGuideMeta].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function Blog() {
  usePageMeta({
    title: "Utah Pool Blog | Bestway Utah — Tips, Costs & Maintenance",
    description:
      "Pool construction, maintenance, and remodeling insights for Utah homeowners. Expert guides from Bestway Utah across the Wasatch Front.",
    path: "/blog",
    image: "/bestway-images/nice-pools/pools-10.png",
    keywords: "Utah pool blog, pool tips Utah, pool construction guide, pool maintenance Salt Lake Valley",
  });

  return (
    <Layout>
      <section className="relative h-[45vh] md:h-[50vh] flex items-end justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/bestway-images/nice-pools/pools-10.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="absolute bottom-12 md:bottom-16 left-0 right-0 z-10">
          <div className="w-[80%] mx-auto">
            <h1
              className="text-white leading-tight"
              style={{ fontFamily: "'PP Editorial Old', serif", fontWeight: 400 }}
            >
              <span className="block text-4xl md:text-5xl lg:text-6xl">Utah Pool</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic">Insights & Guides</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mt-4 max-w-xl">
              Tips on construction, maintenance, and remodeling from Utah&apos;s trusted pool builder.
            </p>
          </div>
        </div>
      </section>

      <section className="pt-16 pb-28 bg-bg">
        <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={post.slug}
              className="group bg-white border shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img
                  src={post.heroImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-sm text-text-strong/70 mb-2">
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  <span className="mx-2">•</span>
                  {post.readTimeMinutes} min read
                </div>
                <h2 className="text-xl font-bold text-text-strong mb-2 group-hover:text-accent-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-text mb-6">{post.description}</p>
                <div className="mt-auto inline-flex items-center gap-3 text-text-strong group-hover:opacity-80 transition-opacity">
                  <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
                  <span className="text-sm font-medium uppercase tracking-wide">Read Article</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}

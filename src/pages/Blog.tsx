import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { meta as kitchenMeta } from "./blog/KitchenRemodelCosts2025";
import { meta as bathMeta } from "./blog/BathroomTimelineChecklist";
import { meta as chooseMeta } from "./blog/CustomHomeVsRemodel";

const posts = [kitchenMeta, bathMeta, chooseMeta];

export default function Blog() {
  useEffect(() => {
    document.title = "Bradford Remodels Blog | Remodeling & Custom Home Insights";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Remodeling and custom home insights for Atlanta, GA and Charleston, SC. Costs, timelines, planning tips, and expert guidance from Bradford Remodels."
      );
    }
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[45vh] md:h-[50vh] flex items-end justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(/featured-projects-bg.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
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
              <span className="block text-4xl md:text-5xl lg:text-6xl">Insights for Better</span>
              <span className="block text-4xl md:text-5xl lg:text-6xl italic">Builds & Remodels</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="pt-16 pb-28 bg-bg">
        <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white border shadow-sm flex flex-col">
              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-sm text-text-strong/70 mb-2">
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  <span className="mx-2">•</span>
                  {post.readTimeMinutes} min read
                </div>
                <h2 className="text-xl font-bold text-text-strong mb-2">{post.title}</h2>
                <p className="text-text mb-6">{post.description}</p>
                <div className="mt-auto">
                  <Link
                    to={post.slug}
                    className="inline-flex items-center gap-3 text-text-strong hover:opacity-80 transition-opacity"
                  >
                    <div className="w-4 h-4 border-2 border-text-strong bg-transparent"></div>
                    <span className="text-sm font-medium uppercase tracking-wide">Read Article</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}



import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import NewConstruction from "./pages/NewConstruction";
import Remodel from "./pages/Remodel";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Atlanta from "./pages/Atlanta";
import Charleston from "./pages/Charleston";
import Highlands from "./pages/Highlands";
import ScrollToTop from "@/components/ScrollToTop";
import Blog from "./pages/Blog";
import CustomHomePlans from "./pages/CustomHomePlans";
import FoxCroft from "./pages/projects/FoxCroft";
import StoneCreek from "./pages/projects/StoneCreek";
import Avondale from "./pages/projects/Avondale";
import Okun from "./pages/projects/Okun";
import AndersonBasement from "./pages/projects/AndersonBasement";
import PharoahKitchen from "./pages/projects/PharoahKitchen";
import PostOakBasement from "./pages/projects/PostOakBasement";
import KitchenRemodelCosts2025 from "./pages/blog/KitchenRemodelCosts2025";
import BathroomTimelineChecklist from "./pages/blog/BathroomTimelineChecklist";
import CustomHomeVsRemodel from "./pages/blog/CustomHomeVsRemodel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/new-construction" element={<NewConstruction />} />
          <Route path="/remodel" element={<Remodel />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customhomeplans" element={<CustomHomePlans />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/kitchen-remodel-costs-2025-atlanta-charleston" element={<KitchenRemodelCosts2025 />} />
          <Route path="/blog/bathroom-remodel-timeline-and-checklist" element={<BathroomTimelineChecklist />} />
          <Route path="/blog/custom-home-vs-remodel-which-is-right" element={<CustomHomeVsRemodel />} />
          <Route path="/atlanta" element={<Atlanta />} />
          <Route path="/charleston" element={<Charleston />} />
          <Route path="/highlands" element={<Highlands />} />
          <Route path="/projects/fox-croft" element={<FoxCroft />} />
          <Route path="/projects/stone-creek" element={<StoneCreek />} />
          <Route path="/projects/avondale" element={<Avondale />} />
          <Route path="/projects/okun" element={<Okun />} />
          <Route path="/projects/anderson-basement" element={<AndersonBasement />} />
          <Route path="/projects/post-oak-basement" element={<PostOakBasement />} />
          <Route path="/projects/pharoah-kitchen" element={<PharoahKitchen />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import AreaDetail from "./pages/AreaDetail";
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
import UtahPoolConstructionCostGuide2026 from "./pages/blog/UtahPoolConstructionCostGuide2026";
import UtahPoolMaintenanceSeasonalGuide from "./pages/blog/UtahPoolMaintenanceSeasonalGuide";

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
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/remodel" element={<Navigate to="/services" replace />} />
          <Route path="/new-construction" element={<Navigate to="/services" replace />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/areas/:slug" element={<AreaDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customhomeplans" element={<CustomHomePlans />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/utah-pool-construction-cost-guide-2026" element={<UtahPoolConstructionCostGuide2026 />} />
          <Route path="/blog/utah-pool-maintenance-seasonal-guide" element={<UtahPoolMaintenanceSeasonalGuide />} />
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

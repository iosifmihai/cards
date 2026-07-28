import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AgeGate } from "@/components/layout/AgeGate";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { ToastViewport } from "@/components/ui/ToastViewport";

const Home = lazy(() => import("@/pages/Home"));
const SlowBurn = lazy(() => import("@/pages/SlowBurn"));
const NoLimits = lazy(() => import("@/pages/NoLimits"));
const Bundle = lazy(() => import("@/pages/Bundle"));
const HowToPlayPage = lazy(() => import("@/pages/HowToPlayPage"));
const FAQPage = lazy(() => import("@/pages/FAQPage"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const OrderConfirmation = lazy(() => import("@/pages/OrderConfirmation"));
const Terms = lazy(() => import("@/pages/Terms"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Cookies = lazy(() => import("@/pages/Cookies"));
const ReturnPolicy = lazy(() => import("@/pages/ReturnPolicy"));
const ShippingPolicy = lazy(() => import("@/pages/ShippingPolicy"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:font-sans focus:text-sm focus:font-semibold focus:text-ink"
      >
        Sari la conținut
      </a>
      <AgeGate />
      <Header />
      <ScrollToTop />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/slow-burn" element={<SlowBurn />} />
            <Route path="/no-limits" element={<NoLimits />} />
            <Route path="/bundle" element={<Bundle />} />
            <Route path="/cum-se-joaca" element={<HowToPlayPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/despre" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cos" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/comanda-confirmata" element={<OrderConfirmation />} />
            <Route path="/termeni-si-conditii" element={<Terms />} />
            <Route path="/confidentialitate" element={<Privacy />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/retur" element={<ReturnPolicy />} />
            <Route path="/livrare" element={<ShippingPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <ToastViewport />
    </div>
  );
}

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-8 w-8 animate-pulse rounded-full border border-bone/20" />
    </div>
  );
}

export default App;

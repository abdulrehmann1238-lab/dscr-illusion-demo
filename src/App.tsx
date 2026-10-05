import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Loader } from './components/features/Loader';
import { BookCallModal } from './components/overlays/BookCallModal';
import { HandoffPanel } from './components/features/HandoffPanel';
import { CookieModal } from './components/overlays/CookieModal';
import { ToastContainer } from './components/overlays/ToastContainer';

// Pages
import { Home } from './pages/Home';
import { Financing } from './pages/Financing';
import { Learn } from './pages/Learn';
import { Speaking } from './pages/Speaking';
import { Advisory } from './pages/Advisory';
import { About } from './pages/About';
import { Legal } from './pages/Legal';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

const MainApp: React.FC = () => {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-cream-50 text-ink-900 selection:bg-gold-100 selection:text-navy-900">
      {/* 0-1.6s Entry Experience per PRD Section 9 */}
      <Loader onComplete={() => setLoaderComplete(true)} />

      {/* Primary Fixed / Sticky Header */}
      <Header />

      {/* Scroll Position Reset */}
      <ScrollToTop />

      {/* Main Routed Content */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/financing" element={<Financing />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/speaking" element={<Speaking />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal />} />
          <Route path="/disclosures" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer with Designed Mortgage Compliance Disclosures */}
      <Footer />

      {/* Global Overlays & Modals */}
      <BookCallModal />
      <HandoffPanel />
      <CookieModal />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

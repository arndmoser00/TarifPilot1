import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ComparisonProvider } from './context/ComparisonContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CompareBarAndModal } from './components/CompareBarAndModal';
import { HomePage } from './pages/HomePage';
import { ComparisonPage } from './pages/ComparisonPage';
import { ProvidersListPage } from './pages/ProvidersListPage';
import { ProviderDetailPage } from './pages/ProviderDetailPage';
import { OfferDetailPage } from './pages/OfferDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { AffiliateDisclosurePage } from './pages/AffiliateDisclosurePage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ComparisonProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vergleich" element={<ComparisonPage />} />
              <Route path="/mobilfunk" element={<ComparisonPage presetCategory="mobile" />} />
              <Route path="/sim-only" element={<ComparisonPage presetCategory="sim-only" />} />
              <Route path="/internet" element={<ComparisonPage presetCategory="broadband" />} />
              <Route path="/unlimited" element={<ComparisonPage presetCategory="unlimited" />} />
              <Route path="/anbieter" element={<ProvidersListPage />} />
              <Route path="/anbieter/:slug" element={<ProviderDetailPage />} />
              <Route path="/tarif/:slug" element={<OfferDetailPage />} />
              <Route path="/ueber-uns" element={<AboutPage />} />
              <Route path="/impressum" element={<AboutPage />} />
              <Route path="/kontakt" element={<ContactPage />} />
              <Route path="/datenschutz" element={<PrivacyPage />} />
              <Route path="/agb" element={<TermsPage />} />
              <Route path="/affiliate-hinweis" element={<AffiliateDisclosurePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <CompareBarAndModal />
        </div>
      </HashRouter>
    </ComparisonProvider>
  );
};

export default App;

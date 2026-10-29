import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollManager from './components/layout/ScrollManager';
import MobileBookingBar from './components/layout/MobileBookingBar';
import ScrollProgress from './components/layout/ScrollProgress';
import HomePage from './pages/HomePage';

// Interior pages load on demand to keep the first page fast
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DebtSolutionsPage = lazy(() => import('./pages/DebtSolutionsPage'));
const BusinessFundingPage = lazy(() => import('./pages/BusinessFundingPage'));
const FinancialStrategiesPage = lazy(() => import('./pages/FinancialStrategiesPage'));
const CorporateLifeInsurancePage = lazy(() => import('./pages/CorporateLifeInsurancePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.TermsPage })));
const DisclosuresPage = lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.DisclosuresPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollManager />
      <ScrollProgress />
      <Header />
      <main id="main" className="flex-1">
        <Suspense fallback={<div className="min-h-screen" />}>
          {/* Keyed on the path so each page fades in when navigating */}
          <div key={pathname} className="animate-page">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/debt-solutions" element={<DebtSolutionsPage />} />
              <Route path="/business-funding" element={<BusinessFundingPage />} />
              <Route path="/financial-strategies" element={<FinancialStrategiesPage />} />
              <Route path="/financial-strategies/corporate-life-insurance" element={<CorporateLifeInsurancePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/disclosures" element={<DisclosuresPage />} />
              {/* Fallback for retired URLs when visited inside the app; vercel.json issues permanent redirects for direct visits */}
              <Route path="/business-growth" element={<Navigate to="/business-funding" replace />} />
              <Route path="/tax-strategy" element={<Navigate to="/financial-strategies#corporate-tax" replace />} />
              <Route path="/corporate-restructuring" element={<Navigate to="/financial-strategies#corporate-tax" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </Suspense>
      </main>
      <Footer />
      <MobileBookingBar />
    </div>
  );
}

export default App;

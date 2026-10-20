import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CreditRepairPage from './pages/CreditRepairPage';
import FinalExpensePage from './pages/FinalExpensePage';
import IncomeReplacementPage from './pages/IncomeReplacementPage';
import DisabilityInsurancePage from './pages/DisabilityInsurancePage';
import TermLifeInsurancePage from './pages/TermLifeInsurancePage';
import WholeLifeInsurancePage from './pages/WholeLifeInsurancePage';
import UniversalLifeInsurancePage from './pages/UniversalLifeInsurancePage';
import { FileText } from 'lucide-react';

function App() {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const location = useLocation();

  const openLeadCaptureWithService = (service?: string) => {
    setSelectedService(service);
    setShowLeadCapture(true);
  };

  const closeLeadCapture = () => {
    setShowLeadCapture(false);
    setSelectedService(undefined);
  };

  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 overflow-x-hidden">
      {/* Navigation - Now shows on ALL pages */}
      <Navigation 
        currentSection={currentSection} 
        onOpenLeadCapture={() => openLeadCaptureWithService()} 
      />

      {/* Quote Button - Only on homepage */}
      {isHomePage && (
        <button
          onClick={() => setShowQuoteForm(true)}
          className="fixed top-24 right-4 z-40 bg-gradient-to-r from-gray-700 to-green-600 text-white px-4 sm:px-6 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
        >
          <FileText className="w-5 h-5" />
          <span className="hidden sm:inline">Get a Quote</span>
          <span className="sm:hidden">Quote</span>
        </button>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage
                onOpenLeadCapture={openLeadCaptureWithService}
                showLeadCapture={showLeadCapture}
                closeLeadCapture={closeLeadCapture}
                selectedService={selectedService}
                showQuoteForm={showQuoteForm}
                setShowQuoteForm={setShowQuoteForm}
              />
              <Footer />
            </>
          }
        />
        <Route 
          path="/credit-repair" 
          element={
            <>
              <CreditRepairPage />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/final-expense" 
          element={
            <>
              <FinalExpensePage />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/income-replacement-insurance" 
          element={
            <>
              <IncomeReplacementPage />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/disability-insurance" 
          element={
            <>
              <DisabilityInsurancePage />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/term-life-insurance" 
          element={
            <>
              <TermLifeInsurancePage />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/whole-life-insurance" 
          element={
            <>
              <WholeLifeInsurancePage />
              <Footer />
            </>
          } 
        />
        <Route 
          path="/universal-life-insurance" 
          element={
            <>
              <UniversalLifeInsurancePage />
              <Footer />
            </>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
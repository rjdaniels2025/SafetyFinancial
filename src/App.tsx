import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import { services } from './data/services';

function App() {
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

  const openLeadCaptureWithService = (service?: string) => {
    setSelectedService(service);
    setShowLeadCapture(true);
  };

  const closeLeadCapture = () => {
    setShowLeadCapture(false);
    setSelectedService(undefined);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation onOpenLeadCapture={() => openLeadCaptureWithService()} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onOpenLeadCapture={openLeadCaptureWithService}
              showLeadCapture={showLeadCapture}
              closeLeadCapture={closeLeadCapture}
              selectedService={selectedService}
            />
          }
        />
        {services.map((service) => (
          <Route key={service.slug} path={service.path} element={<ServicePage service={service} />} />
        ))}
        {/* Legacy URLs from the previous site */}
        <Route path="/credit-repair" element={<Navigate to="/credit-building" replace />} />
        <Route path="/business-funding" element={<Navigate to="/business-growth" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;

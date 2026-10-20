import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import LeadCaptureModal from '../components/LeadCaptureModal';
import About from '../components/About';
import Contact from '../components/Contact';

interface HomePageProps {
  onOpenLeadCapture: (service?: string) => void;
  showLeadCapture: boolean;
  closeLeadCapture: () => void;
  selectedService?: string;
}

export default function HomePage({
  onOpenLeadCapture,
  showLeadCapture,
  closeLeadCapture,
  selectedService,
}: HomePageProps) {
  const location = useLocation();

  useEffect(() => {
    document.title = 'We Win Consultancy Group | Debt & Tax Solutions';
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash]);

  return (
    <>
      <Hero onOpenLeadCapture={() => onOpenLeadCapture()} />
      <Services onOpenLeadCapture={onOpenLeadCapture} />
      <About />
      <Contact />
      {showLeadCapture && <LeadCaptureModal onClose={closeLeadCapture} preSelectedService={selectedService} />}
    </>
  );
}

import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import LeadCaptureModal from '../components/LeadCaptureModal';
import CreditRepairCTA from '../components/CreditRepairCTA';
import QuoteFormModal from '../components/QuoteFormModal';
import FinalExpenseLeadModal from '../components/FinalExpenseLeadModal';
import Credibility from '../components/Credibility';
import InsuranceProducts from '../components/InsuranceProducts';
import About from '../components/About';
import Contact from '../components/Contact';

interface HomePageProps {
  onOpenLeadCapture: (service?: string) => void;
  showLeadCapture: boolean;
  closeLeadCapture: () => void;
  selectedService?: string;
  showQuoteForm: boolean;
  setShowQuoteForm: (show: boolean) => void;
}

export default function HomePage({
  onOpenLeadCapture,
  showLeadCapture,
  closeLeadCapture,
  selectedService,
  showQuoteForm,
  setShowQuoteForm,
}: HomePageProps) {
  const [currentSection, setCurrentSection] = useState('home');
  const [showFinalExpenseQuote, setShowFinalExpenseQuote] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'credit-repair', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Hero onOpenLeadCapture={() => onOpenLeadCapture()} />
      <Credibility />
      <InsuranceProducts
        onOpenQuote={() => setShowQuoteForm(true)}
        onOpenFinalExpenseQuote={() => setShowFinalExpenseQuote(true)}
      />
      <CreditRepairCTA />
      <About />
      <Contact />
      {showLeadCapture && <LeadCaptureModal onClose={closeLeadCapture} preSelectedService={selectedService} />}
      {showQuoteForm && <QuoteFormModal onClose={() => setShowQuoteForm(false)} />}
      {showFinalExpenseQuote && <FinalExpenseLeadModal onClose={() => setShowFinalExpenseQuote(false)} />}
    </>
  );
}

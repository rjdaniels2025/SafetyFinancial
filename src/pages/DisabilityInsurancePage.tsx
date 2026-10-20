import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Shield,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Heart,
  TrendingUp,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import QuoteFormModal from '../components/QuoteFormModal';

export default function DisabilityInsurancePage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            if (!isNaN(index)) {
              setVisibleCards((prev) => [...new Set([...prev, index])]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.benefit-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: DollarSign,
      title: 'Monthly Income Protection',
      description: 'Receive regular monthly payments to replace your lost income during disability.',
    },
    {
      icon: Clock,
      title: 'Short & Long-Term Coverage',
      description: 'Protection for temporary disabilities (weeks to months) and long-term conditions (years).',
    },
    {
      icon: Briefcase,
      title: 'For Self-Employed',
      description: 'Essential coverage for entrepreneurs and freelancers without employer benefits.',
    },
    {
      icon: Users,
      title: 'Supplement Employer Plans',
      description: 'Add personal coverage to fill gaps in your workplace disability insurance.',
    },
    {
      icon: Shield,
      title: 'Comprehensive Protection',
      description: 'Coverage for accidents, illnesses, and medical conditions that prevent work.',
    },
    {
      icon: Heart,
      title: 'Focus on Recovery',
      description: 'Reduce financial stress so you can concentrate on getting better.',
    },
  ];

  const whoItsFor = [
    {
      title: 'Entrepreneurs & Business Owners',
      description: 'Protect your income when you have no employer safety net.',
    },
    {
      title: 'Self-Employed Professionals',
      description: 'Freelancers, consultants, and contractors who depend on their ability to work.',
    },
    {
      title: 'High-Income Earners',
      description: 'Professionals who need to protect their specialized earning capacity.',
    },
    {
      title: 'Employees',
      description: 'Workers who want more protection than their employer plan provides.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navigation />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div>
              <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Briefcase className="w-4 h-4 mr-2" />
                Essential Income Protection
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Disability Insurance
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Protect your income when you are unable to work due to injury or illness. Designed for entrepreneurs, self-employed professionals, and employees who need financial security.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="bg-gradient-to-r from-gray-700 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get Your Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What Is Disability Insurance?</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Disability Insurance provides financial protection by replacing a portion of your income if you become unable to work due to illness, injury, or medical condition. It ensures you can:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Pay your mortgage, rent, and household bills</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Maintain your standard of living</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Avoid depleting your savings</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Focus on recovery without financial stress</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive protection when you need it most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  data-index={index}
                  className={`benefit-card bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 ${
                    visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Needs Disability Insurance?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              If you depend on your income, you need protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {whoItsFor.map((item, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Choose Your Plan</h3>
                    <p className="text-gray-600 text-sm">
                      Select how much of your income to replace and how long you want coverage to last.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">If You Become Disabled</h3>
                    <p className="text-gray-600 text-sm">
                      If you cannot work due to illness or injury, file a claim with medical documentation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Receive Monthly Payments</h3>
                    <p className="text-gray-600 text-sm">
                      After your waiting period, receive monthly income replacement until you can return to work.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 mt-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <TrendingUp className="w-12 h-12 text-yellow-500 mr-4" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Common Use Cases
                    </h2>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Accidents & Injuries</h3>
                        <p className="text-gray-600">
                          Car accidents, workplace injuries, or sports-related injuries that prevent work.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Serious Illness</h3>
                        <p className="text-gray-600">
                          Cancer, heart disease, stroke, or other conditions requiring extended recovery.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Mental Health</h3>
                        <p className="text-gray-600">
                          Depression, anxiety, or burnout that impacts your ability to perform your job.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    Ready to Get Protected?
                  </h3>
                  <p className="text-white/90 mb-6 text-center">
                    Pricing varies based on age, health, occupation, and coverage. Book a consultation for personalized recommendations.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="bg-white/10 rounded-xl p-4">
                      <Users className="w-6 h-6 mb-2" />
                      <div className="font-semibold">Personalized Plans</div>
                      <div className="text-sm text-white/80">Coverage designed for your situation</div>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                      <Shield className="w-6 h-6 mb-2" />
                      <div className="font-semibold">Expert Advice</div>
                      <div className="text-sm text-white/80">We guide you to the right solution</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="w-full bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <span>Book Your Free Consultation</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-center text-xs text-white/70 mt-4">
                    No obligation • Expert guidance • Custom solutions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {showQuoteForm && <QuoteFormModal onClose={() => setShowQuoteForm(false)} />}
    </div>
  );
}
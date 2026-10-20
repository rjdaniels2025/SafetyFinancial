import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Shield,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import QuoteFormModal from '../components/QuoteFormModal';

export default function IncomeReplacementPage() {
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
      title: 'Protect Your Cash Flow',
      description: 'Maintain your lifestyle and cover personal expenses even when you cannot work.',
    },
    {
      icon: Briefcase,
      title: 'Business Continuity',
      description: 'Keep your business running by covering overhead costs during your recovery.',
    },
    {
      icon: TrendingUp,
      title: 'Tax-Efficient Benefits',
      description: 'Structured properly, benefits can be tax-free, maximizing your coverage value.',
    },
    {
      icon: Shield,
      title: 'Replace Up to 85% of Income',
      description: 'Coverage designed to replace the majority of your pre-disability earnings.',
    },
    {
      icon: Clock,
      title: 'Short & Long-Term Options',
      description: 'Choose coverage that starts after 30, 60, or 90 days and lasts until recovery.',
    },
    {
      icon: Users,
      title: 'Peace of Mind',
      description: 'Focus on recovery knowing your family and business are protected.',
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
                <Award className="w-4 h-4 mr-2" />
                For Business Owners & Professionals
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Income Replacement Insurance
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Protect your income and lifestyle if you cannot work due to illness or injury. Essential coverage for business owners to maintain cash flow and ensure business continuity.
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
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What Is Income Replacement Insurance?</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Income Replacement Insurance (also called Disability Income Insurance) provides monthly benefits if you are unable to work due to illness or injury. It replaces a portion of your income so you can:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Pay your mortgage, bills, and personal expenses</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Cover business overhead and payroll</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Maintain your lifestyle during recovery</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Avoid depleting savings or retirement funds</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Benefits for Business Owners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protect what you've built and ensure financial stability when you need it most.
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Choose Your Coverage</h3>
                  <p className="text-gray-600 text-sm">
                    Select the amount of monthly income you want replaced and the waiting period before benefits begin (30, 60, or 90 days).
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">If You Cannot Work</h3>
                  <p className="text-gray-600 text-sm">
                    If illness or injury prevents you from working, file a claim with medical documentation.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Receive Monthly Benefits</h3>
                  <p className="text-gray-600 text-sm">
                    After your waiting period, receive tax-efficient monthly payments until you can return to work or the benefit period ends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 mt-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Award className="w-12 h-12 text-yellow-500 mr-4" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Real-World Protection
                  </h2>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">For Entrepreneurs</h3>
                      <p className="text-gray-600">
                        Keep paying yourself and your team even when you cannot work.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">For Professionals</h3>
                      <p className="text-gray-600">
                        Protect your high income and specialized career with own-occupation coverage.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Tax Efficiency</h3>
                      <p className="text-gray-600">
                        When structured properly, benefits are tax-free, giving you more value.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  Ready to Protect Your Income?
                </h3>
                <p className="text-white/90 mb-6 text-center">
                  Pricing varies based on age, health, and coverage amount. Book a consultation to get personalized recommendations.
                </p>
                <div className="space-y-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <Users className="w-6 h-6 mb-2" />
                    <div className="font-semibold">Customized Plans</div>
                    <div className="text-sm text-white/80">Tailored to your income and needs</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <Shield className="w-6 h-6 mb-2" />
                    <div className="font-semibold">Expert Guidance</div>
                    <div className="text-sm text-white/80">We help you choose the right coverage</div>
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
                  No obligation • Expert advice • Custom solutions
                </p>
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
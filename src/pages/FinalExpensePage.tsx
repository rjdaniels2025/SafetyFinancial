import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Shield,
  CheckCircle,
  Clock,
  Award,
  Users,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  FileText,
  HandHeart,
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FinalExpenseLeadModal from '../components/FinalExpenseLeadModal';

export default function FinalExpensePage() {
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
      icon: HandHeart,
      title: 'No Medical Exam Required',
      description: 'Simplified approval process with no medical exams or blood tests needed.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Premiums',
      description: 'Low monthly payments designed to fit your budget, with rates that never increase.',
    },
    {
      icon: Shield,
      title: 'Guaranteed Acceptance',
      description: 'Coverage available for ages 50-85, regardless of health conditions.',
    },
    {
      icon: Clock,
      title: 'Fast Approval',
      description: 'Get approved in minutes with simple application and instant decision.',
    },
    {
      icon: Heart,
      title: 'Peace of Mind',
      description: 'Protect your loved ones from financial burden during difficult times.',
    },
    {
      icon: FileText,
      title: 'Flexible Coverage',
      description: 'Choose coverage amounts from $5,000 to $50,000 based on your needs.',
    },
  ];

  const coverageOptions = [
    {
      amount: '$10,000',
      features: ['Burial & funeral costs', 'Outstanding medical bills', 'Basic final expenses'],
    },
    {
      amount: '$20,000',
      features: ['Complete funeral services', 'All medical expenses', 'Estate settlement costs'],
      popular: true,
    },
    {
      amount: '$30,000',
      features: ['Premium funeral arrangements', 'All debts & expenses', 'Legacy for loved ones'],
    },
  ];

  const coveredExpenses = [
    'Funeral and burial services',
    'Cremation costs',
    'Memorial services',
    'Outstanding medical bills',
    'Credit card debt',
    'Legal and estate fees',
    'Travel expenses for family',
    'Grief counseling',
  ];

  const statistics = [
    { number: '$10,000+', label: 'Average Funeral Cost' },
    { number: '50-85', label: 'Coverage Age Range' },
    { number: '24hrs', label: 'Approval Time' },
    { number: '100%', label: 'Guaranteed Coverage' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 overflow-x-hidden">
      <Navigation currentSection="final-expense" onOpenLeadCapture={() => navigate('/')} />

      <button
        onClick={() => navigate('/')}
        className="fixed top-24 left-4 z-40 bg-white text-gray-700 px-4 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 border border-gray-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Back to Home</span>
      </button>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-2xl shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="inline-block mb-4">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium border border-green-200">
                Protect Your Legacy
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Final Expense{' '}
              <span className="bg-gradient-to-r from-gray-700 to-green-600 bg-clip-text text-transparent">
                Life Insurance
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ensure your loved ones aren't burdened with funeral and final expense costs. Affordable coverage designed for seniors aged 50-85, with no medical exam required.
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Choose Final Expense Insurance?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={index}
                    data-index={index}
                    className={`benefit-card bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-500 transform ${
                      visibleCards.includes(index)
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-12 opacity-0'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 lg:p-12 mb-16 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Coverage Amount</h2>
              <p className="text-white/90 text-lg">
                Select the coverage that best fits your needs and budget
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {coverageOptions.map((option, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm border-2 ${
                    option.popular ? 'border-yellow-400' : 'border-white/20'
                  } rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 relative`}
                >
                  {option.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">{option.amount}</div>
                    <div className="text-white/80">Coverage Amount</div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="text-lg font-semibold text-white/90">Pricing varies based on age, health, and coverage</div>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowQuoteForm(true)}
                    className="w-full bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Book Consultation
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white border border-gray-200 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-8 h-8 text-green-600 mr-3" />
                What Final Expenses Are Covered?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coveredExpenses.map((expense, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{expense}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-green-50 border border-gray-200 rounded-3xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-8 h-8 text-green-600 mr-3" />
                Simple 3-Step Process
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Answer Simple Questions</h3>
                    <p className="text-gray-600 text-sm">
                      Complete our quick application with basic health and personal information
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Get Instant Approval</h3>
                    <p className="text-gray-600 text-sm">
                      Receive your decision immediately with no waiting period
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Coverage Starts Today</h3>
                    <p className="text-gray-600 text-sm">
                      Your policy begins immediately with first premium payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <Award className="w-12 h-12 text-yellow-500 mr-4" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Guaranteed Coverage for Everyone
                  </h2>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">No Medical Exam</h3>
                      <p className="text-gray-600">
                        Skip the doctor visits and lab tests. Simple health questions only.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Pre-Existing Conditions OK</h3>
                      <p className="text-gray-600">
                        Coverage available regardless of most health conditions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Fixed Premiums</h3>
                      <p className="text-gray-600">
                        Your rate never increases, guaranteed for life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">
                  Ready to Protect Your Family?
                </h3>
                <p className="text-white/90 mb-6 text-center">
                  Get your personalized quote in less than 60 seconds
                </p>
                <div className="space-y-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4">
                    <Users className="w-6 h-6 mb-2" />
                    <div className="font-semibold">Ages 50-85 Welcome</div>
                    <div className="text-sm text-white/80">Coverage available for seniors</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <Shield className="w-6 h-6 mb-2" />
                    <div className="font-semibold">No Surprises</div>
                    <div className="text-sm text-white/80">Clear terms, no hidden fees</div>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="w-full bg-white text-green-700 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Get Your Free Quote</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-center text-xs text-white/70 mt-4">
                  No obligation • Takes 60 seconds • Instant results
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {showQuoteForm && <FinalExpenseLeadModal onClose={() => setShowQuoteForm(false)} />}
    </div>
  );
}
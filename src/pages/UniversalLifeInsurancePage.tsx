import { TrendingUp, CheckCircle, ArrowRight, DollarSign, PieChart, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import QuoteFormModal from '../components/QuoteFormModal';

export default function UniversalLifeInsurancePage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const benefits = [
    {
      icon: Zap,
      title: 'Maximum Flexibility',
      description: 'Adjust your premiums and coverage as your life circumstances change.',
    },
    {
      icon: PieChart,
      title: 'Investment Component',
      description: 'Choose from multiple investment funds to grow your cash value faster.',
    },
    {
      icon: DollarSign,
      title: 'Tax Advantages',
      description: 'Tax-deferred growth and potential tax-free withdrawals for retirement.',
    },
  ];

  const features = [
    'Flexible premium payments - pay more or less as needed',
    'Adjustable death benefit amounts',
    'Multiple investment fund options',
    'Tax-advantaged wealth accumulation',
    'Access cash value through loans or withdrawals',
    'Permanent coverage that lasts your lifetime',
    'Potential for higher returns than whole life',
    'Estate planning and business succession benefits',
  ];

  const investmentOptions = [
    {
      title: 'Conservative Funds',
      description: 'Lower risk, stable growth focused on capital preservation. Ideal for those prioritizing stability.',
      risk: 'Low',
    },
    {
      title: 'Balanced Funds',
      description: 'Mix of stocks and bonds providing moderate growth with managed risk. Popular middle-ground choice.',
      risk: 'Medium',
    },
    {
      title: 'Growth Funds',
      description: 'Higher potential returns with equity-focused investments. For those comfortable with market fluctuations.',
      risk: 'Higher',
    },
  ];

  const idealFor = [
    {
      title: 'High-Income Earners',
      description: 'Maximize tax-advantaged savings beyond RRSP and TFSA limits while maintaining life insurance protection.',
    },
    {
      title: 'Business Owners',
      description: 'Build corporate-owned life insurance for key person coverage, buy-sell agreements, and executive benefits.',
    },
    {
      title: 'Estate Planning',
      description: 'Create a tax-efficient estate with flexible death benefits and investment growth for your beneficiaries.',
    },
    {
      title: 'Retirement Planning',
      description: 'Supplement retirement income with tax-efficient withdrawals while maintaining death benefit protection.',
    },
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Flexible Investment Protection
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Universal Life Insurance
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Permanent life insurance with investment flexibility. Combine protection with wealth-building potential and tax advantages.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowQuoteForm(true)}
                  className="bg-gradient-to-r from-gray-700 to-green-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get Your Free Quote</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="space-y-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                          <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features & Benefits</h2>
            <p className="text-xl text-gray-600">The best of insurance and investment in one package</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 bg-gray-50 p-6 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Fund Options</h2>
            <p className="text-xl text-gray-600">Choose your preferred risk and growth level</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {investmentOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {option.risk} Risk
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{option.title}</h3>
                <p className="text-gray-600 leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Should Consider Universal Life?</h2>
            <p className="text-xl text-gray-600">Perfect for strategic wealth building and protection</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {idealFor.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Universal Life Works</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Allocation</h3>
                  <p className="text-gray-600">Your premiums are split between insurance costs and investment funds you select.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cash Value Growth</h3>
                  <p className="text-gray-600">Investment portion grows tax-deferred based on fund performance you choose.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Access</h3>
                  <p className="text-gray-600">Borrow or withdraw from cash value while maintaining death benefit protection.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Death Benefit</h3>
                  <p className="text-gray-600">Your beneficiaries receive tax-free death benefit regardless of cash value withdrawals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-3xl p-12 text-white">
            <TrendingUp className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Grow Your Wealth While Protecting Your Future</h2>
            <p className="text-xl mb-8 opacity-90">
              Get a personalized universal life insurance quote. Flexible protection with investment potential.
            </p>
            <button
              onClick={() => setShowQuoteForm(true)}
              className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Your Free Quote Now
            </button>
          </div>
        </div>
      </section>

      {showQuoteForm && <QuoteFormModal onClose={() => setShowQuoteForm(false)} />}
    </div>
  );
}
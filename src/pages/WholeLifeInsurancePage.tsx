import { Users, CheckCircle, ArrowRight, TrendingUp, Shield, Coins } from 'lucide-react';
import { useState, useEffect } from 'react';
import QuoteFormModal from '../components/QuoteFormModal';

export default function WholeLifeInsurancePage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const benefits = [
    {
      icon: Shield,
      title: 'Lifetime Coverage',
      description: 'Guaranteed coverage that lasts your entire life, no matter how long you live.',
    },
    {
      icon: Coins,
      title: 'Cash Value Growth',
      description: 'Builds cash value over time that you can borrow against or withdraw for any purpose.',
    },
    {
      icon: TrendingUp,
      title: 'Fixed Premiums',
      description: 'Your premium stays the same for life - never increases as you age.',
    },
  ];

  const features = [
    'Permanent coverage guaranteed for life',
    'Cash value grows tax-deferred',
    'Borrow against cash value at competitive rates',
    'Dividends may be paid (with participating policies)',
    'Use cash value for retirement income',
    'Fixed premiums that never increase',
    'No expiry date - coverage lasts forever',
    'Estate planning and wealth transfer benefits',
  ];

  const cashValueUses = [
    {
      title: 'Supplement Retirement Income',
      description: 'Access your cash value to supplement your retirement without tax penalties.',
    },
    {
      title: 'Emergency Fund',
      description: 'Borrow against your cash value for unexpected expenses or opportunities.',
    },
    {
      title: 'Pay Premiums',
      description: 'Use accumulated cash value to pay future premiums if needed.',
    },
    {
      title: 'Leave a Legacy',
      description: 'Pass on both the death benefit and remaining cash value to your beneficiaries.',
    },
  ];

  const comparison = [
    {
      aspect: 'Coverage Duration',
      wholeLife: 'Lifetime - never expires',
      termLife: 'Fixed term (10-30 years)',
    },
    {
      aspect: 'Premiums',
      wholeLife: 'Fixed for life',
      termLife: 'Increase with age at renewal',
    },
    {
      aspect: 'Cash Value',
      wholeLife: 'Builds cash value',
      termLife: 'No cash value',
    },
    {
      aspect: 'Cost',
      wholeLife: 'Higher premiums',
      termLife: 'Lower initial premiums',
    },
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Permanent Protection
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Whole Life Insurance
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Lifetime protection with guaranteed cash value growth. Build wealth while protecting your family's future.
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
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
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
            <p className="text-xl text-gray-600">Comprehensive protection with built-in savings</p>
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

      {/* Cash Value Uses */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How You Can Use Your Cash Value</h2>
            <p className="text-xl text-gray-600">Flexible access to your policy's accumulated value</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {cashValueUses.map((use, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{use.title}</h3>
                <p className="text-gray-600 leading-relaxed">{use.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Whole Life vs Term Life</h2>
            <p className="text-xl text-gray-600">Understanding the key differences</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-700 to-green-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Feature</th>
                  <th className="px-6 py-4 text-left">Whole Life</th>
                  <th className="px-6 py-4 text-left">Term Life</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.aspect}</td>
                    <td className="px-6 py-4 text-gray-700">{item.wholeLife}</td>
                    <td className="px-6 py-4 text-gray-700">{item.termLife}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
            <Users className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Build Wealth While Protecting Your Family</h2>
            <p className="text-xl mb-8 opacity-90">
              Get a personalized whole life insurance quote today. Lifetime coverage starts here.
            </p>
            <button
              onClick={() => setShowQuoteForm(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
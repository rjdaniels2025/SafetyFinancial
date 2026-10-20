import { Shield, CheckCircle, ArrowRight, DollarSign, Users, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import QuoteFormModal from '../components/QuoteFormModal';

export default function TermLifeInsurancePage() {
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const benefits = [
    {
      icon: DollarSign,
      title: 'Affordable Coverage',
      description: 'Lower premiums compared to permanent insurance, making it accessible for families on any budget.',
    },
    {
      icon: Users,
      title: 'Family Protection',
      description: 'Ensures your loved ones are financially secure if something happens to you during the term.',
    },
    {
      icon: Calendar,
      title: 'Flexible Terms',
      description: 'Choose coverage periods from 10 to 30 years to match your specific needs and life stage.',
    },
  ];

  const features = [
    'Coverage amounts from $100,000 to $5 million',
    'Terms available: 10, 15, 20, 25, or 30 years',
    'Couples save 10% when applying together',
    'Free $10,000 child coverage with qualifying policies',
    'Convert to permanent insurance without medical exam',
    'Fast approval process - often within 48 hours',
  ];

  const whoNeedsIt = [
    {
      title: 'Young Families',
      description: 'Protect your growing family during crucial years when mortgage and childcare costs are highest.',
    },
    {
      title: 'New Homeowners',
      description: 'Ensure your mortgage is covered if something happens, so your family can stay in their home.',
    },
    {
      title: 'Business Owners',
      description: 'Protect your business partners and key employees with affordable, targeted coverage.',
    },
    {
      title: 'Parents',
      description: 'Guarantee funds for your children\'s education and future financial security.',
    },
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Affordable Protection
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Term Life Insurance
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Straightforward, affordable coverage for a specific period. Protect your family's future during the years they need it most.
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
                        <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center flex-shrink-0">
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-xl text-gray-600">Comprehensive protection with valuable benefits</p>
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

      {/* Who Needs It Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Who Needs Term Life Insurance?</h2>
            <p className="text-xl text-gray-600">Perfect protection for various life situations</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {whoNeedsIt.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-12 text-white">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Family?</h2>
            <p className="text-xl mb-8 opacity-90">
              Get a personalized quote in minutes. No obligation, no hassle.
            </p>
            <button
              onClick={() => setShowQuoteForm(true)}
              className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
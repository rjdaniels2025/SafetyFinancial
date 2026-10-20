import { Shield, Users, TrendingUp, ArrowRight, Award, Heart, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface InsuranceProductsProps {
  onOpenQuote: () => void;
  onOpenFinalExpenseQuote: () => void;
}

export default function InsuranceProducts({ onOpenQuote, onOpenFinalExpenseQuote }: InsuranceProductsProps) {
  const navigate = useNavigate();

  const products = [
    {
      id: 'term-life',
      icon: Shield,
      title: 'Term Life Insurance',
      description:
        'Provides flexible, short-term coverage for the number of years you choose. If you pass away during your term, your loved ones receive a death benefit.',
      benefits: [
        'Coverage options up to $5 million and up to 30 years',
        'Couples save 10% in their first year when applying together',
        '$10,000 in free life insurance for each child',
      ],
      buttonText: 'Explore Term Life Insurance',
      link: '/term-life-insurance',
      isPage: true,
      gradient: 'from-green-600 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
    },
    {
      id: 'income-replacement',
      icon: Award,
      title: 'Income Replacement Insurance',
      description:
        'Protects your income if you cannot work due to illness or injury. Essential for business owners to maintain cash flow, cover personal expenses, and ensure business continuity.',
      benefits: [
        'Replace up to 85% of your income during recovery',
        'Cover personal and business expenses during disability',
        'Tax-efficient benefits for business owners',
      ],
      buttonText: 'Explore Income Replacement Insurance',
      link: '/income-replacement-insurance',
      isPage: true,
      gradient: 'from-green-600 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
    },
    {
      id: 'disability',
      icon: Briefcase,
      title: 'Disability Insurance',
      description:
        'Provides income protection when you are unable to work due to injury or illness. Designed for entrepreneurs, self-employed professionals, and employees who need financial security.',
      benefits: [
        'Monthly income replacement during disability',
        'Coverage for both short-term and long-term disabilities',
        'Protection for self-employed and business owners',
      ],
      buttonText: 'Explore Disability Insurance',
      link: '/disability-insurance',
      isPage: true,
      gradient: 'from-green-600 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
    },
    {
      id: 'whole-life',
      icon: Users,
      title: 'Whole Life Insurance',
      description:
        'Permanent coverage that lasts your entire lifetime, building cash value over time that you can borrow against or withdraw.',
      benefits: [
        'Guaranteed coverage for your entire life',
        'Builds cash value that grows tax-deferred',
        'Fixed premiums that never increase',
      ],
      buttonText: 'Explore Whole Life Insurance',
      link: '/whole-life-insurance',
      isPage: true,
      gradient: 'from-green-600 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
    },
    {
      id: 'universal-life',
      icon: TrendingUp,
      title: 'Universal Life Insurance',
      description:
        'Combines permanent life insurance protection with a tax-advantaged investment component, offering flexibility and growth potential.',
      benefits: [
        'Flexible premium payments and coverage amounts',
        'Investment component with multiple fund options',
        'Tax-advantaged wealth accumulation',
      ],
      buttonText: 'Explore Universal Life Insurance',
      link: '/universal-life-insurance',
      isPage: true,
      gradient: 'from-green-600 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
    },
    {
      id: 'final-expense',
      icon: Heart,
      title: 'Final Expense Insurance',
      description:
        'Affordable coverage designed for seniors aged 50-85 to cover funeral, burial, and final expenses. No medical exam required with guaranteed acceptance.',
      benefits: [
        'Coverage from $5,000 to $50,000',
        'No medical exam or blood tests needed',
        'Guaranteed acceptance ages 50-85',
      ],
      buttonText: 'Explore Final Expense Insurance',
      link: '/final-expense',
      isPage: true,
      gradient: 'from-green-600 to-green-700',
      bgGradient: 'from-green-50 to-green-100',
    },
  ];

  return (
    <section id="life-insurance" className="py-20 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-3 rounded-2xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Life Insurance Coverage Options
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the right protection for your family's future. Our comprehensive life insurance solutions are designed to meet your unique needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className={`bg-gradient-to-br ${product.bgGradient} p-8`}>
                  <div className={`w-16 h-16 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <div className="p-8">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Key Benefits
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${product.gradient} mt-2 flex-shrink-0`}></div>
                        <span className="text-gray-700 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={product.id === 'final-expense' ? onOpenFinalExpenseQuote : onOpenQuote}
                      className={`flex-1 bg-gradient-to-r ${product.gradient} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2`}
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => product.isPage ? navigate(product.link) : window.location.href = product.link}
                      className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-br from-gray-50 to-green-50 p-8 rounded-3xl border border-gray-200">
            <p className="text-lg text-gray-700 mb-4 font-medium">
              Not sure which coverage is right for you?
            </p>
            <button
              onClick={onOpenQuote}
              className="bg-gradient-to-r from-gray-700 to-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Get Personalized Recommendations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
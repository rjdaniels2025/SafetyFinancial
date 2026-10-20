import { TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreditRepairCTA() {
  const navigate = useNavigate();

  return (
    <section
      id="credit-repair"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-green-500 to-blue-500 p-3 rounded-2xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="inline-block mb-4">
            <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
              Transform Your Financial Future
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Professional{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Credit Counselling
            </span>{' '}
            Referral
          </h2>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Connect with trusted credit professionals who can help you rebuild your credit and
            improve your financial situation. We'll match you with the right expert for your needs.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">Free</div>
              <div className="text-gray-400 text-sm">Initial Consultation</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">Trusted</div>
              <div className="text-gray-400 text-sm">Professional Partners</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">Fast</div>
              <div className="text-gray-400 text-sm">Referral Process</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10 text-left">
            {[
              'Free initial assessment',
              'Matched with credit experts',
              'Personalized debt solutions',
              'Confidential and professional',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/credit-repair')}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group mx-auto"
          >
            <span>Get Your Credit Counselling Referral</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-gray-400 text-sm mt-4">
            Fill out a simple form and connect with a trusted credit professional
          </p>
        </div>
      </div>
    </section>
  );
}

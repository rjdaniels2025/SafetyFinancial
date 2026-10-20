import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { services } from '../data/services';

interface HeroProps {
  onOpenLeadCapture: () => void;
}

export default function Hero({ onOpenLeadCapture }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-amber-400/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <div className="inline-block mb-6">
              <span className="bg-white/10 border border-white/15 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">
                Tax · Debt · Restructuring · Growth
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]">
              Strategic financial planning that helps you{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">
                win.
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              WeWin Consulting Group helps Canadian business owners and individuals unlock tax
              incentives like SR&amp;ED, take control of debt, restructure for stability and grow with
              the right strategy and capital — all with one coordinated plan.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-10">
              {[
                'SR&ED and government tax incentives',
                'Debt management and credit rebuilding',
                'Corporate restructuring support',
                'Grants, financing and growth strategy',
              ].map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-center space-x-3"
                  style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s both` }}
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-200">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4">
              <button
                onClick={onOpenLeadCapture}
                className="whitespace-nowrap bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-emerald-600/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span>Book a Free Strategy Call</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToServices}
                className="whitespace-nowrap border border-white/25 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Explore Services
              </button>
            </div>
          </div>

          <div
            className={`relative transform transition-all duration-1000 delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-amber-300 rounded-3xl rotate-3 opacity-20" />
            <div className="relative bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-slate-400">Your Plan</div>
                  <div className="text-xl font-semibold">Financial Optimization</div>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full">
                  One strategy
                </span>
              </div>
              <div className="space-y-3">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.slug}
                      to={service.path}
                      className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-colors"
                    >
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold">{service.name}</div>
                        <div className="text-sm text-slate-400 truncate">{service.tagline}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

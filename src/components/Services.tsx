import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Home } from 'lucide-react';
import { services } from '../data/services';

interface ServicesProps {
  onOpenLeadCapture: (service?: string) => void;
}

export default function Services({ onOpenLeadCapture }: ServicesProps) {
  return (
    <>
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-14">
            <p className="text-emerald-600 font-semibold uppercase tracking-widest text-sm mb-3">What we do</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Four pillars. One plan to optimize your finances.
            </h2>
            <p className="text-xl text-slate-600">
              Taxes, debt, business structure and growth are connected. We look at all of them together so
              every move you make strengthens the others.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const featured = index < 2;
              return (
                <Link
                  key={service.slug}
                  to={service.path}
                  className={`group relative overflow-hidden rounded-3xl p-8 sm:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    featured
                      ? 'bg-slate-950 text-white'
                      : 'bg-slate-50 text-slate-900 border border-slate-200'
                  }`}
                >
                  {featured && (
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
                  )}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      {featured && (
                        <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold">
                          Core focus
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3">{service.name}</h3>
                    <p className={`leading-relaxed mb-6 ${featured ? 'text-slate-300' : 'text-slate-600'}`}>
                      {service.summary}
                    </p>
                    <ul className="space-y-2 mb-8">
                      {service.offerings.slice(0, 4).map((o) => (
                        <li
                          key={o.title}
                          className={`text-sm flex items-center gap-2 ${featured ? 'text-slate-200' : 'text-slate-700'}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          {o.title}
                        </li>
                      ))}
                    </ul>
                    <span
                      className={`inline-flex items-center gap-2 font-semibold ${
                        featured ? 'text-emerald-300' : 'text-emerald-700'
                      }`}
                    >
                      Learn more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Who we serve</h2>
            <p className="text-lg text-slate-600">
              Whether you run a company or run a household, the fundamentals of winning financially are the same.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                icon: Briefcase,
                title: 'Business Owners',
                service: 'Business Growth & Strategy',
                points: [
                  'Claim SR&ED credits and government incentives',
                  'Restructure corporate debt and improve cash flow',
                  'Coordinated access to tax lawyers, business lawyers and CPAs',
                  'Grants, financing referrals and growth strategy',
                ],
              },
              {
                icon: Home,
                title: 'Individuals & Families',
                service: 'Debt Solutions & Financial Wellness',
                points: [
                  'A personalized debt-management strategy',
                  'Budgeting guidance and a full financial assessment',
                  'Credit profile reviews and a plan to rebuild',
                  'Referrals to the right debt-relief providers',
                ],
              },
            ].map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.title} className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{group.title}</h3>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {group.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-slate-700">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => onOpenLeadCapture(group.service)}
                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Get started <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-lg text-slate-600">A simple, transparent process from first call to financial confidence.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Free Strategy Call', description: 'We learn about your goals, income, debts and business.' },
              { title: 'Financial Snapshot', description: 'We review taxes, debt, structure and growth to find the biggest wins.' },
              { title: 'Your Game Plan', description: 'A clear, prioritized plan with partners lined up where needed.' },
              { title: 'Win & Grow', description: 'We execute together and check in as your results build.' },
            ].map((step, index) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-950 text-amber-300 text-xl font-bold flex items-center justify-center mb-5 shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-3xl bg-gradient-to-r from-emerald-600 to-slate-900 p-10 sm:p-14 text-center text-white">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to start winning with your money?</h3>
            <p className="text-lg text-emerald-50/90 mb-8 max-w-2xl mx-auto">
              Book a free, no-pressure strategy call and leave with clear next steps — whether we work together or not.
            </p>
            <button
              onClick={() => onOpenLeadCapture()}
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all"
            >
              Book My Free Strategy Call
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

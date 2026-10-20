import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronDown, Users } from 'lucide-react';
import InquiryForm from '../components/InquiryForm';
import { services, type ServiceContent } from '../data/services';

interface ServicePageProps {
  service: ServiceContent;
}

export default function ServicePage({ service }: ServicePageProps) {
  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== service.slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = `${service.name} | We Win Consultancy Group`;
  }, [service]);

  const scrollToForm = () =>
    document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-amber-400/40 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-sm text-emerald-300 mb-6">
              <Icon className="w-4 h-4" />
              {service.name}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {service.heroTitle}{' '}
              <span className="bg-gradient-to-r from-emerald-300 to-amber-300 bg-clip-text text-transparent">
                {service.heroHighlight}
              </span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">{service.heroText}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToForm}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 rounded-full font-semibold shadow-xl shadow-emerald-600/30 hover:scale-105 transition-transform flex items-center justify-center gap-2"
              >
                Get My Free Review <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/#services"
                className="border border-white/25 px-8 py-4 rounded-full font-semibold text-center hover:bg-white/10 transition-colors"
              >
                All Services
              </Link>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8">
            <p className="text-sm uppercase tracking-widest text-emerald-300 mb-6">What you walk away with</p>
            <ul className="space-y-5">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  <span className="text-slate-100 text-lg">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How we help</h2>
            <p className="text-lg text-slate-600">{service.summary}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.offerings.map((offering, index) => (
              <div
                key={offering.title}
                className="group rounded-2xl border border-slate-200 p-7 hover:border-emerald-500 hover:shadow-xl transition-all"
              >
                <div className="text-sm font-mono text-emerald-600 mb-3">0{index + 1}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{offering.title}</h3>
                <p className="text-slate-600 leading-relaxed">{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Users className="w-7 h-7 text-emerald-600" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Who this is for</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {service.audiences.map((audience) => (
              <div key={audience.title} className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{audience.title}</h3>
                <p className="text-slate-600 leading-relaxed">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-12 text-center">Our process</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-bold flex items-center justify-center mb-4 shadow-lg">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + Form */}
      <section id="get-started" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-8">Common questions</h2>
            <div className="space-y-3">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group bg-white/5 border border-white/10 rounded-2xl p-5">
                  <summary className="flex justify-between items-center cursor-pointer list-none text-white font-medium">
                    {faq.question}
                    <ChevronDown className="w-5 h-5 text-emerald-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" />
                  </summary>
                  <p className="text-slate-300 mt-3 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{service.formTitle}</h2>
            <p className="text-slate-300 mb-8">Takes under a minute. A strategist will follow up personally.</p>
            <InquiryForm
              dark
              formType={service.name}
              options={service.formOptions}
              optionsLabel={service.formOptionsLabel}
            />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Pair it with</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {related.map((s) => {
              const RelatedIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  to={s.path}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-5 hover:border-emerald-500 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <RelatedIcon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    <div className="text-sm text-slate-500">{s.tagline}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

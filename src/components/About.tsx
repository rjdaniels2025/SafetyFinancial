import { Target, Handshake, Eye, Layers } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Layers,
      title: 'The Whole Picture',
      description: 'Tax, debt, structure and growth planned together — not in silos.',
    },
    {
      icon: Eye,
      title: 'Total Transparency',
      description: 'Plain-language advice, clear options and no hidden agendas.',
    },
    {
      icon: Handshake,
      title: 'Trusted Network',
      description: 'Qualified CPAs, tax and business lawyers, and financing partners we bring in when needed.',
    },
    {
      icon: Target,
      title: 'Results Focused',
      description: 'Every recommendation is tied to a measurable goal you care about.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-x-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-emerald-600 font-semibold uppercase tracking-widest text-sm mb-3">About us</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Built so our clients{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-slate-900 bg-clip-text text-transparent">win</span>.
          </h2>
          <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
            <p>
              We Win Consultancy Group is a Canadian tax, debt and business solutions firm focused on one
              thing: helping business owners and individuals keep more of their money and put it to work.
            </p>
            <p>
              Most financial problems are connected. Unclaimed incentives and poor tax planning drain cash
              flow, cash-flow problems create debt, and debt blocks the capital you need to grow. We break
              that cycle with strategic planning that tackles every piece together.
            </p>
            <p>
              When you need specialized help — CPAs, tax lawyers, business lawyers, debt-relief providers or
              financing partners — we coordinate qualified professionals from our network, so you always
              have the right expert on your side.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className={`bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-xl transition-shadow ${
                  index % 2 === 1 ? 'sm:mt-8' : ''
                }`}
              >
                <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-amber-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Handshake, Lock, MessageSquareText, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { ConsultationBand, ProcessSteps, SectionHeader } from '../components/ui/Sections';
import { ArcPattern } from '../components/illustrations/Illustrations';
import { coreServices } from '../data/services';
import { site } from '../config/site';
import usePageMeta from '../hooks/usePageMeta';

const assurances = [
  { icon: Lock, title: 'Confidential consultations' },
  { icon: Users, title: 'Individuals, families & corporations' },
  { icon: Handshake, title: 'Coordinated with licensed professionals' },
  { icon: MessageSquareText, title: 'Clear options, no pressure' },
];

const audiences = [
  { title: 'Individuals & families', text: 'Guidance on debt, credit and protecting the people and obligations that matter most.' },
  { title: 'Entrepreneurs', text: 'Clarity on financing options and the financial foundations of a growing business.' },
  { title: 'Business owners', text: 'Funding, corporate financial strategy and continuity planning for established companies.' },
  { title: 'Incorporated professionals', text: 'Coordinated corporate and personal planning, from tax considerations to retirement.' },
];

const specialized = [
  { title: 'Credit analysis & debt resolution', to: '/debt-solutions' },
  { title: 'Grants & business incentives', to: '/business-funding#grants' },
  { title: 'Corporate tax-planning coordination', to: '/financial-strategies#corporate-tax' },
  { title: 'Corporate-owned life insurance', to: '/financial-strategies/corporate-life-insurance' },
  { title: 'Life, critical illness & disability protection', to: '/financial-strategies#personal-protection' },
  { title: 'Individual Pension Plans (IPPs)', to: '/financial-strategies#wealth-retirement' },
  { title: 'Retirement & wealth planning', to: '/financial-strategies#wealth-retirement' },
  { title: 'Succession & continuity planning', to: '/financial-strategies#corporate-protection' },
];

const process = [
  { title: 'Consultation', text: 'A confidential conversation about your situation, priorities and what you hope to achieve.' },
  { title: 'Review', text: 'With your consent, we gather the relevant information and review your circumstances in detail.' },
  { title: 'Options', text: 'We explain the options that may be available to you, in plain language, including their trade-offs.' },
  { title: 'Plan & coordination', text: 'We agree on next steps and, where needed, coordinate with qualified and licensed professionals.' },
  { title: 'Follow-up', text: 'We review progress with you and adjust the approach as your circumstances change.' },
  { title: 'Long-term support', text: 'As goals evolve, we help you revisit your strategy across debt, funding and planning.' },
];

export default function HomePage() {
  usePageMeta(`${site.name} | Financial Clarity. Strategic Solutions.`, site.description, '/');

  return (
    <>
      {/* Hero */}
      <section className="pb-14 pt-28 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-44">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow">Debt · Funding · Financial Strategy</p>
              <h1 className="h-display mt-5 sm:mt-6">
                Financial Clarity.
                <br />
                Strategic Solutions.
                <br />
                <span className="text-brass-dark">Stronger Futures.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="lead mt-6 max-w-xl sm:mt-7">
                WeWin Consulting Group helps individuals, families, entrepreneurs, and corporations navigate financial
                challenges, explore funding opportunities, and develop tailored financial strategies for the future.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                <Button to="/contact" arrow className="py-3.5 sm:py-3">
                  Book a Consultation
                </Button>
                <Button to="/#solutions" variant="secondary" className="py-3.5 sm:py-3">
                  Explore Our Solutions
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="hidden lg:col-span-5 lg:block">
            {site.images.hero ? (
              <img
                src={site.images.hero}
                alt=""
                className="aspect-[4/5] w-full rounded-xl object-cover shadow-lift"
                fetchPriority="high"
              />
            ) : (
              <div className="relative overflow-hidden rounded-xl bg-ink p-6 sm:p-8 text-paper shadow-lift">
                <ArcPattern className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80" />
                <p className="relative text-xs font-semibold uppercase tracking-eyebrow text-brass-light">How we can help</p>
                <ul className="relative mt-6 divide-y divide-paper/10 border-y border-paper/10">
                  {coreServices.map((service, i) => (
                    <li key={service.slug}>
                      <Link to={service.path} className="group flex items-start gap-5 py-5">
                        <span className="font-serif text-2xl font-semibold text-brass">{String(i + 1).padStart(2, '0')}</span>
                        <span className="flex-1">
                          <span className="block font-serif text-lg font-semibold leading-snug">{service.title}</span>
                          <span className="mt-1 block text-sm text-paper/60">{service.tagline}</span>
                        </span>
                        <ArrowRight
                          className="mt-1.5 h-4 w-4 flex-shrink-0 text-paper/40 transition-all group-hover:translate-x-1 group-hover:text-brass-light"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="relative mt-6 flex items-center gap-2 text-sm text-paper/60">
                  <Lock className="h-4 w-4 text-brass-light" aria-hidden="true" />
                  Confidential, no-obligation consultations
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Assurances */}
      <section aria-label="Our commitments" className="border-y border-line bg-white">
        <div className="container-page">
          <ul className="grid grid-cols-2 gap-px bg-line lg:-mx-6 lg:grid-cols-4">
            {assurances.map((a) => {
              const Icon = a.icon;
              return (
                <li key={a.title} className="flex flex-col gap-2.5 bg-white py-5 pr-3 odd:pl-0 even:pl-4 sm:flex-row sm:items-center sm:gap-3 lg:px-6 lg:py-6 lg:odd:pl-6 lg:even:pl-6">
                  <Icon className="h-5 w-5 flex-shrink-0 text-brass-dark" aria-hidden="true" />
                  <span className="text-[13px] font-medium leading-snug text-ink sm:text-sm">{a.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Core services */}
      <section id="solutions" className="scroll-mt-24 border-t border-line bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Our solutions" title="Three areas of focus. One coordinated approach.">
            Whether you are facing an immediate financial challenge, pursuing a business opportunity or planning for the
            long term, our work is organized around three core disciplines.
          </SectionHeader>

          <div className="mt-10 sm:mt-14 grid gap-6 lg:grid-cols-3">
            {coreServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.slug} delay={i * 100}>
                  <Link
                    to={service.path}
                    className="group flex h-full flex-col rounded-xl border border-line bg-paper p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-ink/25 hover:bg-white hover:shadow-lift"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-ink text-brass-light">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold leading-snug">{service.title}</h3>
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{service.summary}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-brass-dark">
                      {service.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="About WeWin" title="Strategic thinking for complex financial decisions." />
          </div>
          <Reveal className="lg:col-span-7" delay={100}>
            <p className="text-lg leading-relaxed text-ink/80">
              We work with individuals, families, entrepreneurs and corporations to help them navigate financial challenges,
              evaluate potential opportunities and make informed decisions about their future. Our approach combines
              practical financial consulting, debt solutions, funding guidance and broader corporate and personal financial
              strategies.
            </p>
            <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {audiences.map((a) => (
                <div key={a.title} className="bg-paper p-6">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
                </div>
              ))}
            </div>
            <Button to="/about" variant="ghost" arrow className="mt-8">
              More about our approach
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="How we work" title="A structured, transparent consulting process.">
            Every engagement begins with understanding. We focus on clarity and informed decisions, never pressure.
          </SectionHeader>
          <Reveal className="mt-10 sm:mt-14">
            <ProcessSteps steps={process} />
          </Reveal>
        </div>
      </section>

      {/* Specialized solutions */}
      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Specialized solutions" title="Depth where it matters.">
              Within each core area, we offer specialized consulting and coordinate with qualified professionals for
              regulated advice and products.
            </SectionHeader>
          </div>
          <Reveal className="lg:col-span-7" delay={100}>
            <ul className="divide-y divide-line border-y border-line">
              {specialized.map((s) => (
                <li key={s.title}>
                  <Link
                    to={s.to}
                    className="group flex items-center justify-between gap-4 py-4 text-[15px] font-medium text-ink transition-colors hover:text-brass-dark"
                  >
                    {s.title}
                    <ArrowUpRight
                      className="h-4 w-4 flex-shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass-dark"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <ConsultationBand />
    </>
  );
}

import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Handshake, Lock, MessageSquareText, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { ConsultationBand, ProcessSteps, SectionHeader } from '../components/ui/Sections';
import { ArcPattern } from '../components/illustrations/Illustrations';
import HeroBackdrop from '../components/motion/HeroBackdrop';
import { WMark } from '../components/ui/Logo';
import { coreServices } from '../data/services';
import { site } from '../config/site';
import usePageMeta from '../hooks/usePageMeta';
import { trackSpotlight } from '../hooks/spotlight';

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
  { title: 'Corporate restructuring', to: '/financial-strategies#corporate-restructuring' },
  { title: 'Holding companies & corporate structure', to: '/financial-strategies/corporate-structure' },
  { title: 'Estate freezes', to: '/financial-strategies/estate-freeze' },
  { title: 'Family trusts', to: '/financial-strategies/family-trusts' },
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

const INTRO_KEY = 'wewin-intro-seen';

/** True on the first homepage view of a browsing session, so the logo intro plays once per visit. */
function useHeroIntro() {
  const [intro] = useState(() => {
    try {
      if (sessionStorage.getItem(INTRO_KEY)) return false;
    } catch {
      // Storage can be unavailable (private browsing); the intro then simply plays
    }
    return window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  });
  useEffect(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1');
    } catch {
      // Ignore: see above
    }
  }, []);
  return intro;
}

export default function HomePage() {
  usePageMeta(`${site.name} | Financial Clarity. Strategic Solutions.`, site.description, '/');
  const intro = useHeroIntro();
  // While the logo draws itself in, the rest of the hero waits for it; on later visits it appears straight away
  const t = (ms: number) => (intro ? ms + 900 : ms);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-ink pb-16 pt-28 text-paper sm:pb-24 sm:pt-36 lg:flex lg:min-h-[min(100svh,980px)] lg:items-center lg:pb-28 lg:pt-36">
        <HeroBackdrop />
        <div className="container-page relative grid w-full items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <WMark draw={intro} className="h-12 w-auto sm:h-[60px]" />
            <h1 className="h-display mt-8 text-paper sm:mt-10">
              <span className="line">
                <span style={{ animationDelay: `${t(120)}ms` }}>Financial Clarity.</span>
              </span>
              <span className="line">
                <span style={{ animationDelay: `${t(240)}ms` }}>Strategic Solutions.</span>
              </span>
              <span className="line">
                <span style={{ animationDelay: `${t(360)}ms` }}>
                  Stronger Futures.
                </span>
              </span>
            </h1>
            <Reveal delay={t(480)}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/75 sm:mt-7">
                WeWin Consulting Group helps individuals, families, entrepreneurs, and corporations navigate financial
                challenges, explore funding opportunities, and develop tailored financial strategies for the future.
              </p>
            </Reveal>
            <Reveal delay={t(600)}>
              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
                <Button to="/contact" variant="light" arrow className="py-3.5 sm:py-3">
                  Book a Consultation
                </Button>
                <Button to="/#solutions" variant="outlineLight" className="py-3.5 sm:py-3">
                  Explore Our Solutions
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal variant="right" delay={t(300)} className="hidden lg:col-span-5 lg:block">
            {site.images.hero ? (
              <img
                src={site.images.hero}
                alt=""
                className="aspect-[4/5] w-full rounded-3xl object-cover shadow-float"
                fetchPriority="high"
              />
            ) : (
              <div
                onPointerMove={trackSpotlight}
                className="spotlight relative overflow-hidden rounded-3xl border border-paper/10 bg-[#0d2c1d]/70 p-8 text-paper shadow-float"
                style={{ '--spot': 'rgba(211, 217, 214, 0.10)' } as CSSProperties}
              >
                <ArcPattern spin className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80" />
                <p className="relative flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow text-accent-light">
                  <span className="h-px w-6 bg-accent-light/70" aria-hidden="true" />
                  How we can help
                </p>
                <ul className="relative mt-6 divide-y divide-paper/10 border-y border-paper/10">
                  {coreServices.map((service, i) => (
                    <li key={service.slug} style={{ animation: `reveal-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${t(650) + i * 130}ms both` }}>
                      <Link to={service.path} className="group relative -mx-3 flex items-start gap-5 rounded-2xl px-3 py-5 transition-colors duration-300 hover:bg-paper/[0.04]">
                        <span className="font-serif text-2xl font-semibold text-accent-light/80 transition-transform duration-500 ease-brand group-hover:-translate-y-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1">
                          <span className="block font-serif text-lg font-semibold leading-snug">{service.title}</span>
                          <span className="mt-1 block text-sm text-paper/60 transition-colors group-hover:text-paper/80">{service.tagline}</span>
                        </span>
                        <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-paper/15 transition-all duration-300 ease-brand group-hover:border-accent-light group-hover:bg-accent-light">
                          <ArrowRight className="h-3.5 w-3.5 text-paper/60 transition-colors group-hover:text-ink" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="relative mt-6 flex items-center gap-2 text-sm text-paper/60">
                  <Lock className="h-4 w-4 text-accent-light" aria-hidden="true" />
                  Confidential, no-obligation consultations
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Assurances */}
      <section aria-label="Our commitments" className="relative border-y border-line bg-white">
        <div className="container-page">
          <ul className="grid grid-cols-2 gap-px bg-line lg:-mx-6 lg:grid-cols-4">
            {assurances.map((a, i) => {
              const Icon = a.icon;
              return (
                <Reveal
                  as="li"
                  key={a.title}
                  variant="fade"
                  delay={i * 90}
                  className="group flex flex-col gap-2.5 bg-white py-5 pr-3 odd:pl-0 even:pl-4 sm:flex-row sm:items-center sm:gap-3 lg:px-6 lg:py-6 lg:odd:pl-6 lg:even:pl-6"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-50 transition-colors duration-300 group-hover:bg-accent/15">
                    <Icon className="h-[18px] w-[18px] text-accent-dark" aria-hidden="true" />
                  </span>
                  <span className="text-[13px] font-medium leading-snug text-ink sm:text-sm">{a.title}</span>
                </Reveal>
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
                <Reveal key={service.slug} delay={i * 120} variant="scale" className="h-full">
                  <Link
                    to={service.path}
                    onPointerMove={trackSpotlight}
                    className="spotlight group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper p-6 transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:border-accent/40 hover:bg-white hover:shadow-float sm:p-8"
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-dark via-accent to-accent-light transition-transform duration-700 ease-brand group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-accent-light transition-all duration-500 ease-brand group-hover:rotate-[-6deg] group-hover:bg-accent group-hover:text-ink">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="font-serif text-sm font-semibold text-ink/30 transition-colors group-hover:text-accent-dark">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-6 text-2xl font-semibold leading-snug">{service.title}</h3>
                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{service.summary}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-accent-dark">
                      {service.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1.5" aria-hidden="true" />
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
            <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {audiences.map((a, i) => (
                <Reveal key={a.title} variant="fade" delay={i * 90} className="group bg-paper p-6 transition-colors duration-500 hover:bg-white">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a.text}</p>
                </Reveal>
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
          <div className="mt-10 sm:mt-14">
            <ProcessSteps steps={process} />
          </div>
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
          <div className="lg:col-span-7">
            <ul className="isolate divide-y divide-line border-y border-line">
              {specialized.map((s, i) => (
                <Reveal as="li" key={s.title} variant="left" delay={i * 60}>
                  <Link
                    to={s.to}
                    className="group relative flex items-center justify-between gap-4 overflow-hidden py-4 text-[15px] font-medium text-ink transition-colors hover:text-accent-dark"
                  >
                    <span
                      className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-accent-50 to-transparent transition-transform duration-500 ease-brand group-hover:scale-x-100"
                      aria-hidden="true"
                    />
                    <span className="transition-transform duration-500 ease-brand group-hover:translate-x-2">{s.title}</span>
                    <ArrowUpRight
                      className="h-4 w-4 flex-shrink-0 text-muted transition-transform duration-300 ease-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-dark"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ConsultationBand />
    </>
  );
}

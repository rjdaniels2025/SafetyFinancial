import Reveal from '../components/ui/Reveal';
import { ConsultationBand, PageHero, SectionHeader, TopicList } from '../components/ui/Sections';
import { ConsultationIllustration } from '../components/illustrations/Illustrations';
import { team } from '../data/team';
import { site } from '../config/site';
import usePageMeta from '../hooks/usePageMeta';

const principles = [
  { title: 'Understanding first', text: 'We take time to understand each client’s circumstances before discussing any option.' },
  { title: 'Clarity over complexity', text: 'We explain options and trade-offs in plain language so decisions are informed.' },
  { title: 'Discretion', text: 'Financial matters are personal. We handle every conversation and document with care.' },
  { title: 'Coordinated expertise', text: 'Where specialized or regulated advice is needed, we work alongside qualified professionals.' },
];

const clients = [
  'Individuals and families',
  'Entrepreneurs and self-employed professionals',
  'Owners of established businesses',
  'Incorporated professionals',
  'Corporations planning for continuity and succession',
];

const professionals = ['Accountants and CPAs', 'Tax and business lawyers', 'Licensed insurance advisors', 'Lenders and financing professionals', 'Licensed insolvency trustees', 'Grant writers and program specialists'];

export default function AboutPage() {
  usePageMeta(
    'About Us',
    'WeWin Consulting Group works with individuals, families, entrepreneurs and corporations to navigate financial challenges, evaluate opportunities and make informed decisions.',
    '/about'
  );

  return (
    <>
      <PageHero eyebrow="About WeWin Consulting Group" title="Strategic Thinking for Complex Financial Decisions." />

      <section className="bg-white py-20 sm:py-28">
        <div className="container-page grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="space-y-5 text-lg leading-relaxed text-ink/80 lg:col-span-7">
            <p>
              WeWin Consulting Group works with individuals, families, entrepreneurs, and corporations to help them navigate
              financial challenges, evaluate potential opportunities, and make informed decisions about their future.
            </p>
            <p>
              Our approach combines practical financial consulting, debt solutions, funding guidance, and broader corporate and
              personal financial strategies. We focus on understanding each client's circumstances, clarifying available
              options, and helping them identify appropriate next steps.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            {site.images.about ? (
              <img src={site.images.about} alt="" className="w-full rounded-xl object-cover shadow-lift" loading="lazy" />
            ) : (
              <ConsultationIllustration className="w-full rounded-xl" />
            )}
          </Reveal>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Our approach" title="How we work with clients" />
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p) => (
              <div key={p.title} className="bg-white p-7">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="h-section">Who we work with</h2>
            <div className="mt-8">
              <TopicList items={clients} columns={2} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="h-section">Professionals we coordinate with</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              We provide consulting, education and referrals. Regulated advice and services are delivered by appropriately
              qualified and licensed professionals, such as:
            </p>
            <div className="mt-6">
              <TopicList items={professionals} columns={2} />
            </div>
          </Reveal>
        </div>
      </section>

      {team.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="container-page">
            <SectionHeader eyebrow="Our team" title="The people behind WeWin" />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <Reveal key={m.name} className="rounded-xl border border-line bg-white p-7">
                  {m.photo && <img src={m.photo} alt={m.name} className="mb-5 aspect-square w-24 rounded-full object-cover" loading="lazy" />}
                  <h3 className="text-xl font-semibold">{m.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brass-dark">
                    {m.role}
                    {m.credentials && `, ${m.credentials}`}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.bio}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <ConsultationBand />
    </>
  );
}

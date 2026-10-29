import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SectionTabs from '../components/ui/SectionTabs';
import { ConsultationBand, Notice, PageHero, TopicList } from '../components/ui/Sections';
import { strategySections } from '../data/services';
import usePageMeta from '../hooks/usePageMeta';

const contactFor = (service: string) => `/contact?service=${encodeURIComponent(service)}`;

function StrategySection({
  id,
  index,
  title,
  description,
  topics,
  children,
  tone,
  cta,
}: {
  id: string;
  index: number;
  title: string;
  description: string;
  topics: string[];
  children?: ReactNode;
  tone: 'white' | 'paper';
  cta: { label: string; service: string };
}) {
  return (
    <section id={id} className={`scroll-mt-[125px] border-t border-line lg:scroll-mt-[141px] py-14 sm:py-20 lg:py-28 ${tone === 'white' ? 'bg-white' : 'bg-paper'}`}>
      <div className="container-page grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-serif text-4xl font-semibold text-brass sm:text-5xl">{String.fromCharCode(64 + index)}</p>
            <h2 className="h-section mt-4">{title}</h2>
            <p className="lead mt-4">{description}</p>
            <Button to={contactFor(cta.service)} variant="ghost" arrow className="mt-6 sm:mt-8">
              {cta.label}
            </Button>
          </Reveal>
        </div>
        <Reveal className="space-y-8 lg:col-span-7" delay={100}>
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-muted">Areas of focus</h3>
            <div className="mt-5">
              <TopicList items={topics} />
            </div>
          </div>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

function Explainer({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 sm:p-7">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink/80">{children}</div>
    </div>
  );
}

export default function FinancialStrategiesPage() {
  usePageMeta(
    'Corporate & Personal Financial Strategies',
    'Corporate financial and tax-planning coordination, corporate and personal protection, retirement planning, IPPs and long-term wealth strategies for individuals, families and corporations.',
    '/financial-strategies'
  );

  return (
    <>
      <PageHero
        eyebrow="Corporate & Personal Financial Strategies"
        title="Integrated planning for your business, your family and your future."
        actions={
          <Button to={contactFor('Corporate Financial & Tax Strategies')} variant="light" arrow>
            Book a Consultation
          </Button>
        }
      >
        Integrated financial planning for individuals, families, entrepreneurs, and corporations, covering corporate
        financial strategies, tax-planning coordination, financial protection, retirement planning, and long-term wealth
        objectives.
      </PageHero>

      <SectionTabs label="Financial strategies sections" sections={strategySections} />

      <StrategySection
        id="corporate-tax"
        index={1}
        tone="paper"
        title="Corporate Financial & Tax Strategies"
        description="Explore corporate financial structures and long-term planning strategies designed around your business objectives, ownership structure, and future priorities."
        cta={{ label: 'Discuss corporate strategy', service: 'Corporate Financial & Tax Strategies' }}
        topics={[
          'Corporate tax-planning coordination',
          'Corporate wealth strategies',
          'Corporate financial structuring',
          'Estate and succession planning',
          'Corporate-owned life insurance strategies',
          'Capital Dividend Account (CDA) coordination',
          'Shareholder and key person protection',
          'Business continuity planning',
          'Coordination with accountants, CPAs and corporate tax lawyers',
        ]}
      >
        <Notice>
          Our consulting is not a substitute for individualized tax or legal advice. Tax calculations, elections and
          specialized advice are provided by appropriately qualified professionals, such as CPAs and tax lawyers, with whom we
          coordinate.
        </Notice>
      </StrategySection>

      <StrategySection
        id="corporate-protection"
        index={2}
        tone="white"
        title="Corporate Protection & Legacy Planning"
        description="Strategic planning for business continuity, shareholder protection, corporate insurance structures, and long-term succession objectives."
        cta={{ label: 'Discuss corporate protection', service: 'Corporate Protection & Corporate Life Insurance' }}
        topics={[
          'Corporate-owned life insurance (COLI)',
          'Corporate term life insurance',
          'Corporate permanent life insurance, including participating whole life and universal life where suitable',
          'Key person protection',
          'Shareholder protection and buy-sell funding considerations',
          'Corporate estate liquidity planning',
          'Business continuity and succession planning',
          'Insurance reviews for corporations and incorporated professionals',
        ]}
      >
        <p className="text-[15px] leading-relaxed text-ink/80">
          Corporate-owned insurance may serve different purposes depending on the corporation, the insured person, the policy
          and the intended strategy — from protecting the business against the loss of a key person to funding a shareholder
          buy-sell agreement or providing estate liquidity.
        </p>
        <Link
          to="/financial-strategies/corporate-life-insurance"
          className="group flex items-center justify-between gap-6 rounded-2xl bg-ink p-6 text-paper sm:p-7 transition-colors hover:bg-ink-800"
        >
          <span>
            <span className="block text-xs font-semibold uppercase tracking-eyebrow text-brass-light">In depth</span>
            <span className="mt-2 block font-serif text-2xl font-semibold">Corporate Life Insurance</span>
            <span className="mt-2 block text-sm text-paper/70">
              Corporate-owned vs. personally owned policies, common purposes and Capital Dividend Account considerations.
            </span>
          </span>
          <ArrowRight className="h-6 w-6 flex-shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </StrategySection>

      <StrategySection
        id="personal-protection"
        index={3}
        tone="paper"
        title="Personal Financial Protection"
        description="Explore financial protection options designed to help individuals and families prepare for unexpected events, protect important obligations, and plan for long-term security."
        cta={{ label: 'Discuss personal protection', service: 'Personal Financial Protection' }}
        topics={[
          'Personal life insurance',
          'Critical illness protection',
          'Disability and income protection',
          'Family financial security',
          'Mortgage and debt protection considerations',
          'Insurance reviews',
          'Long-term personal financial planning',
        ]}
      >
        <div className="grid gap-4">
          <Explainer title="Life insurance">
            <p>Can provide a lump sum, generally tax-free, to beneficiaries to replace income, cover debts or fund final expenses.</p>
          </Explainer>
          <Explainer title="Critical illness">
            <p>May pay a lump sum on diagnosis of a covered serious illness, as defined in the policy.</p>
          </Explainer>
          <Explainer title="Disability">
            <p>May replace part of your income if illness or injury prevents you from working, subject to policy terms.</p>
          </Explainer>
        </div>
        <Notice>
          All insurance recommendations, sales and arrangements are completed by appropriately licensed professionals and
          remain subject to underwriting, policy terms, exclusions and eligibility.
        </Notice>
      </StrategySection>

      <StrategySection
        id="wealth-retirement"
        index={4}
        tone="white"
        title="Wealth, Retirement & Financial Architecture"
        description="Explore retirement, wealth-planning, and financial architecture concepts designed to support longer-term personal and corporate objectives."
        cta={{ label: 'Discuss long-term planning', service: 'Wealth, Retirement & Financial Architecture' }}
        topics={[
          'Individual Financial Architecture (IFA)',
          'Individual Pension Plans (IPPs)',
          'Infinite banking concepts',
          'Participating whole life insurance strategies',
          'Retirement planning',
          'Corporate and personal financial coordination',
          'Long-term wealth and estate planning',
        ]}
      >
        <div className="space-y-4">
          {/* TODO: replace with WeWin's confirmed IFA definition and scope once finalized. */}
          <Explainer title="Individual Financial Architecture (IFA)">
            <p>
              IFA looks at how the elements of an individual's financial life — personal and, where applicable, corporate —
              fit together. We discuss our IFA approach, its scope and whether it suits your circumstances during a
              consultation. No specific outcome is implied or guaranteed.
            </p>
          </Explainer>

          <Explainer title="Individual Pension Plans (IPPs)">
            <p>
              An IPP is a defined benefit registered pension plan, typically sponsored by an incorporated business for an
              owner-manager or eligible employees. For some individuals it may allow greater retirement savings than an RRSP,
              and contributions are generally deductible to the corporation.
            </p>
            <p>
              Whether an IPP is relevant depends on factors such as age, employment income history (salary rather than
              dividends), plan design and actuarial requirements. IPPs involve registration, periodic actuarial valuations,
              ongoing administration and funding obligations.
            </p>
          </Explainer>

          <Explainer title="Infinite banking">
            <p>
              Infinite banking is a concept in which the cash value of a participating whole life insurance policy is used
              as a source of liquidity — for example, through policy loans or by using the policy as collateral for a
              third-party loan.
            </p>
            <p className="font-medium text-ink">Important considerations:</p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>It typically requires substantial, sustained premium funding over many years.</li>
              <li>Cash values build gradually; early-year values may be low.</li>
              <li>Dividends and many policy values are not guaranteed.</li>
              <li>Policy loans accrue interest and reduce the cash value and death benefit while outstanding.</li>
              <li>If loans exceed available cash value, the policy may lapse, which can have tax consequences.</li>
              <li>It is not risk-free and is not a universally suitable alternative to conventional banking or investing.</li>
            </ul>
          </Explainer>
        </div>
        <Notice>
          Any regulated investment or insurance activity is handled by appropriately authorized professionals. IPPs,
          participating whole life strategies and tax-planning approaches require individualized review by qualified
          professionals, including actuaries, accountants and licensed advisors where applicable.
        </Notice>
      </StrategySection>

      <ConsultationBand title="Build a strategy around your priorities." />
    </>
  );
}

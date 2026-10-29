import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { ConsultationBand, Notice, PageHero, SectionHeader } from '../components/ui/Sections';
import usePageMeta from '../hooks/usePageMeta';

const contactLink = `/contact?service=${encodeURIComponent('Corporate Protection & Corporate Life Insurance')}`;

const comparison = [
  {
    label: 'Policy owner',
    corporate: 'The corporation',
    personal: 'The individual',
  },
  {
    label: 'Who pays premiums',
    corporate: 'The corporation, generally with after-tax corporate dollars',
    personal: 'The individual, generally with personal after-tax dollars',
  },
  {
    label: 'Beneficiary',
    corporate: 'Usually the corporation',
    personal: 'Usually family members or an estate',
  },
  {
    label: 'Common purposes',
    corporate: 'Key person protection, buy-sell funding, corporate estate liquidity, corporate wealth strategies',
    personal: 'Family income replacement, personal debts, estate planning',
  },
  {
    label: 'Key considerations',
    corporate: 'Corporate structure, shareholder agreements, Capital Dividend Account, creditor exposure',
    personal: 'Personal cash flow, family needs, estate objectives',
  },
];

const purposes = [
  {
    title: 'Key person protection',
    text: 'Helps a business manage the financial impact of losing an owner or employee whose contribution is critical.',
  },
  {
    title: 'Shareholder & buy-sell funding',
    text: 'Can provide funds to help surviving shareholders purchase a deceased shareholder’s interest under a buy-sell agreement.',
  },
  {
    title: 'Corporate estate liquidity',
    text: 'May provide liquidity to help address taxes and obligations arising on the death of a shareholder.',
  },
  {
    title: 'Corporate wealth strategies',
    text: 'Permanent policies, such as participating whole life or universal life, are sometimes used within broader corporate planning.',
  },
];

const policyTypes = [
  { title: 'Term life', text: 'Coverage for a defined period. Generally lower initial premiums, with no cash value.' },
  {
    title: 'Participating whole life',
    text: 'Permanent coverage with guaranteed elements and potential policyholder dividends, which are not guaranteed.',
  },
  {
    title: 'Universal life',
    text: 'Permanent coverage with flexible premiums and an investment component whose returns are not guaranteed.',
  },
];

export default function CorporateLifeInsurancePage() {
  usePageMeta(
    'Corporate Life Insurance',
    'How corporate-owned life insurance differs from personally owned coverage, its common purposes for Canadian corporations, and Capital Dividend Account considerations.',
    '/financial-strategies/corporate-life-insurance'
  );

  return (
    <>
      <PageHero
        eyebrow="Corporate Protection & Legacy Planning"
        title="Corporate Life Insurance"
        actions={
          <>
            <Button to={contactLink} variant="light" arrow>
              Book a Consultation
            </Button>
            <Button to="/financial-strategies#corporate-protection" variant="outlineLight">
              Back to Financial Strategies
            </Button>
          </>
        }
      >
        For business owners and incorporated professionals, life insurance owned by the corporation can play a role in
        business continuity, shareholder protection and long-term planning. Whether it is appropriate depends on your
        corporation, the insured person, the policy and the strategy you intend to pursue.
      </PageHero>

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="The basics" title="Corporate-owned vs. personally owned policies" />
          {/* Phones: one block per row, comparing both ownership types */}
          <div className="mt-8 space-y-4 md:hidden">
            {comparison.map((row) => (
              <div key={row.label} className="rounded-2xl border border-line bg-paper p-5">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-brass-dark">{row.label}</h3>
                <dl className="mt-3 space-y-3 text-[15px] leading-relaxed">
                  <div>
                    <dt className="font-semibold text-ink">Corporate-owned</dt>
                    <dd className="text-ink/80">{row.corporate}</dd>
                  </div>
                  <div className="border-t border-line pt-3">
                    <dt className="font-semibold text-ink">Personally owned</dt>
                    <dd className="text-ink/80">{row.personal}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          <Reveal className="mt-12 hidden overflow-hidden rounded-2xl border border-line md:block">
            <table className="w-full border-collapse text-left text-[15px]">
              <thead>
                <tr className="bg-ink text-paper">
                  <th scope="col" className="w-1/4 p-5 font-semibold" />
                  <th scope="col" className="p-5 font-serif text-lg font-semibold">Corporate-owned</th>
                  <th scope="col" className="p-5 font-serif text-lg font-semibold">Personally owned</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.label} className={i % 2 ? 'bg-paper' : 'bg-white'}>
                    <th scope="row" className="p-5 align-top font-semibold text-ink">{row.label}</th>
                    <td className="p-5 align-top text-ink/80">{row.corporate}</td>
                    <td className="p-5 align-top text-ink/80">{row.personal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Purposes" title="How corporations use life insurance" />
          <div className="mt-8 sm:mt-12 grid gap-6 sm:grid-cols-2">
            {purposes.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="rounded-2xl border border-line bg-white p-6 sm:p-7">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </div>

          <h3 className="mt-16 text-2xl font-semibold">Policy types</h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {policyTypes.map((p) => (
              <div key={p.title} className="border-t-2 border-brass pt-5">
                <h4 className="text-lg font-semibold">{p.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Tax considerations" title="The Capital Dividend Account (CDA)" />
          </div>
          <Reveal className="space-y-5 text-[16px] leading-relaxed text-ink/80 lg:col-span-7" delay={100}>
            <p>
              When a private corporation receives a life insurance death benefit as the beneficiary, the amount of the
              proceeds in excess of the policy's adjusted cost basis (ACB) is generally added to the corporation's Capital
              Dividend Account. Balances in the CDA may be paid to Canadian-resident shareholders as capital dividends, which
              can be received tax-free when the required election is properly filed.
            </p>
            <p>
              <strong className="font-semibold text-ink">The entire death benefit does not automatically qualify.</strong> The
              credit depends on the policy's ACB at the time of death, which changes over the life of the policy, and the
              outcome depends on the corporate structure, ownership, timing and filing requirements.
            </p>
            <p>
              CDA planning should be reviewed with your accountant or tax advisor. We coordinate with your professional advisors
              so your insurance strategy and corporate tax planning work together.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page max-w-4xl">
          <Notice title="Please note">
            <ul className="mt-2 list-disc space-y-1.5 pl-5">
              <li>Policy guarantees, premiums, cash values, dividends and benefits vary by product and insurer.</li>
              <li>Non-guaranteed elements, such as dividends and investment returns, may be higher or lower than illustrated.</li>
              <li>We do not guarantee tax savings, tax-free distributions, investment returns or future policy performance.</li>
              <li>
                Coverage is subject to underwriting, eligibility and policy terms. Individualized recommendations and all
                regulated insurance activity are provided by appropriately licensed professionals.
              </li>
              <li>Corporate insurance and CDA treatment require individualized review with qualified tax and legal advisors.</li>
            </ul>
          </Notice>
          <Link
            to="/financial-strategies#corporate-protection"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-brass-dark"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Corporate Protection & Legacy Planning
          </Link>
        </div>
      </section>

      <ConsultationBand title="Explore whether corporate coverage fits your plans." />
    </>
  );
}

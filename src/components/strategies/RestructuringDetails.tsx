import { Link } from 'react-router-dom';
import { Calculator, FileSignature, Gavel, Landmark, type LucideIcon } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { Notice } from '../ui/Sections';
import StructureStory from './StructureStory';

const team: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Calculator,
    title: 'CPAs',
    text: 'Model the tax impact of each option, prepare the financial statements and filings, and keep the structure compliant year to year.',
  },
  {
    icon: FileSignature,
    title: 'Corporate lawyers',
    text: 'Incorporate holding companies, draft share structures, reorganizations and shareholder agreements, and document intercompany arrangements.',
  },
  {
    icon: Landmark,
    title: 'Tax lawyers',
    text: 'Advise on complex reorganizations, trusts and estate freezes, and represent you if questions arise with the Canada Revenue Agency.',
  },
  {
    icon: Gavel,
    title: 'Litigation lawyers',
    text: 'Advise on existing or potential disputes and creditor claims, so restructuring decisions account for litigation risk.',
  },
];

const concepts: { title: string; body: string; links: { to: string; label: string }[] }[] = [
  {
    title: 'Holding & operating companies',
    body: 'Separating a holding company from the operating company lets surplus profits move up to the holding company — generally as tax-free inter-corporate dividends, subject to specific rules — where they sit apart from the day-to-day risks of running the business. The holding company can invest, hold property or lend funds back to the operating company on a properly secured basis.',
    links: [{ to: '/financial-strategies/corporate-structure', label: 'How corporate structure works' }],
  },
  {
    title: 'Family trusts',
    body: 'A discretionary family trust can own shares for the benefit of family members, supporting succession and estate planning and, in some cases, allowing more than one family member to use their lifetime capital gains exemption on a future sale of qualifying shares. Trusts are subject to the tax on split income (TOSI) rules, annual reporting requirements and a deemed disposition of their assets every 21 years.',
    links: [{ to: '/financial-strategies/family-trusts', label: 'How family trusts work' }],
  },
  {
    title: 'Estate freezes',
    body: "An estate freeze exchanges the owner's common shares for fixed-value preferred shares, locking in today's value for tax purposes. Future growth accrues to new common shares held by the next generation or a family trust, which can limit — and help you plan for — the tax payable on death. A freeze is often paired with corporate-owned life insurance to fund that frozen tax liability.",
    links: [
      { to: '/financial-strategies/estate-freeze', label: 'How estate freezes work' },
      { to: '/financial-strategies/corporate-life-insurance', label: 'Corporate life insurance' },
    ],
  },
  {
    title: 'Corporate debt restructuring',
    body: 'Reorganizing how and where debt sits across your companies — consolidating or refinancing, properly documenting and securing shareholder and intercompany loans, and aligning repayment with cash flow — can improve stability and help protect key assets. Where a formal insolvency process may be appropriate, a licensed insolvency trustee is involved.',
    links: [],
  },
];

/** Professional team, a typical ownership structure, plain-language concepts and disclosures for restructuring. */
export default function RestructuringDetails() {
  return (
    <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-20">
      {/* Professional team */}
      <div>
        <Reveal className="max-w-2xl">
          <h3 className="font-serif text-2xl font-semibold sm:text-3xl">One plan. A coordinated professional team.</h3>
          <p className="lead mt-3">
            Restructuring touches tax, corporate law and potential disputes all at once. We bring the right independent
            professionals together and keep everyone working from the same plan — so your debt and ownership are structured
            correctly from the start.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => {
            const Icon = member.icon;
            return (
              <Reveal
                key={member.title}
                variant="up"
                delay={i * 90}
                className="group rounded-2xl border border-line bg-white p-6 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-accent hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-accent-light transition-transform duration-500 ease-brand group-hover:rotate-[-6deg]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className="mt-5 font-serif text-lg font-semibold">{member.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{member.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Typical structure, told as a scroll-driven story */}
      <StructureStory />

      {/* Concepts */}
      <div className="grid gap-5 md:grid-cols-2">
        {concepts.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 100} className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h3 className="flex items-center gap-3 font-serif text-xl font-semibold">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              {c.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{c.body}</p>
            {c.links.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {c.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark underline decoration-accent underline-offset-4 hover:text-ink"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <Notice title="Important information about restructuring">
        Corporate restructuring, trusts and estate freezes involve complex tax and legal rules and require individualized
        advice from qualified lawyers and accountants. Structures must be implemented for legitimate purposes — transfers made
        to defeat existing creditors can be reversed under applicable law. Tax outcomes and protection from liabilities are not
        guaranteed and depend on your circumstances and on how the structure is implemented and maintained. Legal and
        accounting services are provided by independent professionals.
      </Notice>
    </div>
  );
}

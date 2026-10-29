import { Link } from 'react-router-dom';
import { Calculator, Factory, FileSignature, Gavel, Landmark, ShieldCheck, User, Building, type LucideIcon } from 'lucide-react';
import Reveal from '../ui/Reveal';
import { Notice } from '../ui/Sections';

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

const concepts: { title: string; body: string; link?: { to: string; label: string } }[] = [
  {
    title: 'Holding & operating companies',
    body: 'Separating a holding company from the operating company lets surplus profits move up to the holding company — generally as tax-free inter-corporate dividends, subject to specific rules — where they sit apart from the day-to-day risks of running the business. The holding company can invest, hold property or lend funds back to the operating company on a properly secured basis.',
  },
  {
    title: 'Family trusts',
    body: 'A discretionary family trust can own shares for the benefit of family members, supporting succession and estate planning and, in some cases, allowing more than one family member to use their lifetime capital gains exemption on a future sale of qualifying shares. Trusts are subject to the tax on split income (TOSI) rules, annual reporting requirements and a deemed disposition of their assets every 21 years.',
  },
  {
    title: 'Estate freezes',
    body: "An estate freeze exchanges the owner's common shares for fixed-value preferred shares, locking in today's value for tax purposes. Future growth accrues to new common shares held by the next generation or a family trust, which can limit — and help you plan for — the tax payable on death. A freeze is often paired with corporate-owned life insurance to fund that frozen tax liability.",
    link: { to: '/financial-strategies/corporate-life-insurance', label: 'Corporate life insurance' },
  },
  {
    title: 'Corporate debt restructuring',
    body: 'Reorganizing how and where debt sits across your companies — consolidating or refinancing, properly documenting and securing shareholder and intercompany loans, and aligning repayment with cash flow — can improve stability and help protect key assets. Where a formal insolvency process may be appropriate, a licensed insolvency trustee is involved.',
  },
];

function Entity({
  icon: Icon,
  title,
  text,
  tone = 'light',
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  tone?: 'light' | 'dark';
  delay?: number;
}) {
  const dark = tone === 'dark';
  return (
    <Reveal
      variant="scale"
      delay={delay}
      className={`relative rounded-2xl border p-4 text-center sm:p-5 ${
        dark ? 'border-ink bg-ink text-paper shadow-float' : 'border-line bg-white shadow-card'
      }`}
    >
      <span
        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${
          dark ? 'bg-paper/10 text-accent-light' : 'bg-accent-50 text-accent-dark'
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className={`mt-3 font-serif text-base font-semibold sm:text-lg ${dark ? 'text-paper' : 'text-ink'}`}>{title}</p>
      <p className={`mt-1 text-xs leading-relaxed sm:text-[13px] ${dark ? 'text-paper/70' : 'text-muted'}`}>{text}</p>
    </Reveal>
  );
}

function Connector({ label, merge = false }: { label: string; merge?: boolean }) {
  return (
    <Reveal variant="fade">
      <div className="relative flex flex-col items-center py-1" aria-hidden="true">
        {merge ? (
          <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="h-9 w-1/2 text-accent">
            <path d="M1 0 V12 Q1 18 8 18 H192 Q199 18 199 12 V0 M100 18 V36" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        ) : (
          <span className="h-9 w-px bg-accent" />
        )}
        <span className="my-1.5 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-medium text-muted shadow-card">
          {label}
        </span>
        <span className="h-5 w-px bg-accent" />
      </div>
    </Reveal>
  );
}

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

      {/* Typical structure */}
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow">A common structure</p>
          <h3 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">Holding company, operating company and family trust</h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Many owner-managed businesses separate the company that operates the business from a holding company that keeps
            surplus and valuable assets, with a family trust holding growth shares. An estate freeze can sit at the top of
            this structure. The right design depends entirely on your circumstances and is confirmed with your lawyers and
            accountants.
          </p>
        </Reveal>

        <figure className="lg:col-span-7" aria-label="Diagram of a typical restructured ownership: the owner and a family trust own a holding company, which owns the operating company">
          <div className="rounded-3xl border border-line bg-paper p-4 sm:p-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              <Entity icon={User} title="You, the owner" text="Fixed-value preferred shares after an estate freeze" />
              <Entity icon={ShieldCheck} title="Family trust" text="New common shares that hold future growth" delay={100} />
            </div>
            <Connector merge label="Own the shares of" />
            <div className="mx-auto max-w-xs">
              <Entity
                icon={Building}
                tone="dark"
                title="Holding company"
                text="Receives surplus and holds investments, property and other valuable assets"
                delay={200}
              />
            </div>
            <Connector label="Owns · surplus flows up as dividends" />
            <div className="mx-auto max-w-xs">
              <Entity icon={Factory} title="Operating company" text="Runs the business and carries the day-to-day operating risk" delay={300} />
            </div>
          </div>
          <figcaption className="mt-3 text-center text-xs text-muted">Illustrative only — not a recommendation for any specific situation.</figcaption>
        </figure>
      </div>

      {/* Concepts */}
      <div className="grid gap-5 md:grid-cols-2">
        {concepts.map((c, i) => (
          <Reveal key={c.title} delay={(i % 2) * 100} className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <h3 className="flex items-center gap-3 font-serif text-xl font-semibold">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              {c.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{c.body}</p>
            {c.link && (
              <Link
                to={c.link.to}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark underline decoration-accent underline-offset-4 hover:text-ink"
              >
                {c.link.label} →
              </Link>
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

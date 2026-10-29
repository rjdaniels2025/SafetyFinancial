import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { PageHero } from '../components/ui/Sections';
import { ContactLine } from './LegalPages';
import { site } from '../config/site';
import usePageMeta from '../hooks/usePageMeta';

const { insuranceAgents, mga, insurers, debtSettlementRegistration } = site.licensing;

function External({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const regulators: { activity: string; regulator: string; role: ReactNode }[] = [
  {
    activity: 'Life insurance, accident and sickness insurance, and segregated fund contracts',
    regulator: 'Financial Services Regulatory Authority of Ontario (FSRA) — Insurance Act (Ontario)',
    role: 'Offered only through life insurance agents licensed by FSRA.',
  },
  {
    activity: 'Mortgages and mortgage-secured financing',
    regulator: 'FSRA — Mortgage Brokerages, Lenders and Administrators Act, 2006',
    role: 'WeWin is not a licensed mortgage brokerage and does not deal or trade in mortgages. Mortgage financing is handled only by FSRA-licensed brokerages.',
  },
  {
    activity: 'Securities, including mutual funds, stocks and bonds',
    regulator: 'Ontario Securities Commission and the Canadian Investment Regulatory Organization (CIRO)',
    role: 'WeWin is not registered to trade or advise in securities and does not recommend specific securities.',
  },
  {
    activity: 'Debt settlement and collection services',
    regulator: 'Consumer Protection Ontario — Collection and Debt Settlement Services Act',
    role: debtSettlementRegistration
      ? `Registered under the Act (${debtSettlementRegistration}).`
      : 'WeWin is not a collection agency and does not provide debt settlement services as defined by the Act. Where those services are needed, we refer you to registered providers.',
  },
  {
    activity: 'Bankruptcies and consumer proposals',
    regulator: 'Office of the Superintendent of Bankruptcy Canada',
    role: 'Handled only by Licensed Insolvency Trustees, to whom we refer you where appropriate.',
  },
  {
    activity: '“Financial Planner” and “Financial Advisor” titles',
    regulator: 'FSRA — Financial Professionals Title Protection Act, 2019',
    role: 'WeWin representatives do not use these titles unless they hold a credential approved by FSRA.',
  },
  {
    activity: 'Tax, accounting and legal advice',
    regulator: 'CPA Ontario and the Law Society of Ontario',
    role: 'Provided by independent CPAs and lawyers. WeWin coordinates with them but does not provide this advice.',
  },
];

const sections = [
  { id: 'role', title: 'Our role' },
  { id: 'regulation', title: 'Licensing and regulation' },
  { id: 'insurance', title: 'Insurance products and your agent' },
  { id: 'compensation', title: 'Compensation, referrals and conflicts of interest' },
  { id: 'debt', title: 'Debt solutions and credit' },
  { id: 'funding', title: 'Business funding and grants' },
  { id: 'corporate', title: 'Corporate restructuring, tax and legal' },
  { id: 'investments', title: 'Investments, pensions and retirement' },
  { id: 'website', title: 'Information on this website' },
  { id: 'identity', title: 'Identity verification and privacy' },
  { id: 'complaints', title: 'Making a complaint' },
];

const atAGlance = [
  'WeWin provides financial consulting, education and referrals.',
  'Insurance is offered only through FSRA-licensed life insurance agents.',
  'Agents are generally paid commissions by insurers, and conflicts of interest are disclosed.',
  'We are not a lender, mortgage brokerage, securities dealer, law firm or accounting firm.',
  'No outcome — approval, settlement, credit change or tax result — is guaranteed.',
  'You are never required to buy one product to receive another service.',
];

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-10 first:border-t-0 first:pt-0">
      <h2 className="!mt-0">{title}</h2>
      {children}
    </section>
  );
}

export default function DisclosuresPage() {
  usePageMeta(
    'Disclosures',
    `Licensing, compensation, conflicts of interest and other important disclosures about the services offered by ${site.name} in Ontario.`,
    '/disclosures'
  );

  return (
    <>
      <PageHero eyebrow="Legal" title="Disclosures">
        Last updated: {site.legalUpdated}. These disclosures explain who we are, how we are regulated, how the people we work
        with are paid, and your rights. Please read them before you use our services.
      </PageHero>

      <section className="bg-white py-14 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-accent/30 bg-accent-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-eyebrow text-accent-dark">At a glance</p>
                <ul className="mt-4 space-y-3">
                  {atAGlance.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-dark" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <nav aria-label="Disclosure sections" className="hidden rounded-2xl border border-line p-5 lg:block">
                <p className="text-xs font-semibold uppercase tracking-eyebrow text-muted">On this page</p>
                <ol className="mt-3 space-y-1 text-sm">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="flex gap-2 rounded-md px-2 py-1.5 text-ink/75 transition-colors hover:bg-paper hover:text-ink">
                        <span className="w-5 text-accent-dark">{i + 1}.</span>
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          <article className="prose-legal space-y-10 lg:col-span-8 lg:max-w-none">
            <Section id="role" title="1. Our role">
              <p>
                {site.name} ("WeWin") provides financial consulting, education and referral services to individuals,
                families, entrepreneurs and corporations in {site.jurisdiction}. We help clients understand their situation and
                options, and we coordinate with appropriately licensed and qualified professionals.
              </p>
              <p>
                WeWin is not a lender, mortgage brokerage, securities dealer or adviser, credit bureau, collection agency,
                licensed insolvency trustee, insurance company, law firm or accounting firm. Regulated activities are carried
                out only by individuals and firms that hold the licence or registration the law requires.
              </p>
              <p>
                Using this website or contacting us does not create a client relationship. Paid consulting services are
                provided under a written service agreement that sets out the scope of the services, fees, payment
                arrangements, exclusions, and any cancellation or refund terms.
              </p>
            </Section>

            <Section id="regulation" title="2. Licensing and regulation">
              <p>The table below shows how each type of service is regulated in Ontario and WeWin's role.</p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-line">
                {regulators.map((r, i) => (
                  <div key={r.activity} className={`grid gap-2 p-5 text-sm leading-relaxed md:grid-cols-3 md:gap-6 ${i % 2 ? 'bg-paper' : 'bg-white'}`}>
                    <div className="font-semibold text-ink">{r.activity}</div>
                    <div className="text-muted">{r.regulator}</div>
                    <div className="text-ink/85">{r.role}</div>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="insurance" title="3. Insurance products and your agent">
              <h3>Licensing</h3>
              <p>
                Life insurance, accident and sickness insurance (including critical illness and disability coverage) and
                segregated fund contracts are offered only through life insurance agents licensed by the Financial Services
                Regulatory Authority of Ontario. You can confirm an agent's licence using FSRA's public licence search at{' '}
                <External href="https://www.fsrao.ca">fsrao.ca</External>.
              </p>
              {insuranceAgents.length > 0 && (
                <ul>
                  {insuranceAgents.map((a) => (
                    <li key={a.licence}>
                      {a.name} — FSRA licence no. {a.licence}
                    </li>
                  ))}
                </ul>
              )}

              <h3>Managing General Agency and insurers</h3>
              <p>
                Our agents are contracted with insurance companies through {mga ? <strong>{mga}</strong> : 'a Managing General Agency (MGA)'}
                . The MGA provides contracting and administrative support; it is not the insurer, and each policy is a contract
                between you and the issuing insurance company.
              </p>
              {insurers.length > 0 ? (
                <p>Our agents are currently contracted with: {insurers.join(', ')}.</p>
              ) : (
                <p>Before making a recommendation, your agent will tell you which insurance companies they are contracted with.</p>
              )}

              <h3>Needs-based recommendations</h3>
              <p>
                Recommendations are based on a review of your needs, financial situation and objectives. Your agent will
                explain the key features, costs, exclusions and limitations of any product recommended, and you will have the
                opportunity to ask questions before you apply.
              </p>

              <h3>Replacing an existing policy</h3>
              <p>
                If a recommendation involves replacing, cancelling or changing an existing policy, your agent will explain in
                writing the potential advantages and disadvantages before you decide. Cancelling existing coverage before new
                coverage is approved and in force could leave you uninsured, and a new policy may include new exclusions or
                waiting periods.
              </p>

              <h3>No tied selling</h3>
              <p>
                You are never required to buy an insurance product as a condition of receiving any other WeWin service, and
                you are free to buy insurance from any agent or insurer you choose.
              </p>

              <h3>Underwriting, illustrations and your policy</h3>
              <ul>
                <li>Coverage is subject to the insurer's underwriting, eligibility requirements and policy terms.</li>
                <li>
                  Answer application questions completely and accurately. Misrepresentation or non-disclosure can allow an
                  insurer to deny a claim or void coverage.
                </li>
                <li>
                  Illustrations show guaranteed and non-guaranteed values. Dividends, interest credits and investment returns
                  are not guaranteed and may be higher or lower than illustrated.
                </li>
                <li>
                  Most individual policies include a short review period after delivery during which you may cancel for a
                  refund of premiums paid. Your policy sets out the exact terms.
                </li>
                <li>
                  Strategies that involve borrowing — such as policy loans, using a policy as collateral, or "infinite banking"
                  concepts — add risk. Loan interest, non-guaranteed values and changes in tax law can affect the outcome.
                </li>
              </ul>
            </Section>

            <Section id="compensation" title="4. Compensation, referrals and conflicts of interest">
              <h3>How insurance agents are paid</h3>
              <p>
                Life insurance agents are generally paid commissions by the insurance company that issues the policy, not by
                you. Commission rates vary by insurer and product. Agents may also receive renewal commissions, bonuses or other
                incentives from insurers or the MGA. You are entitled to ask your agent how they will be compensated for any
                product they recommend.
              </p>

              <h3>Referral arrangements</h3>
              <p>
                We may refer you to lenders, insurers, lawyers, accountants, licensed insolvency trustees, grant specialists and
                other professionals. If WeWin or its representatives will receive a referral fee or other compensation in
                connection with a referral, we will disclose that arrangement — including its nature and, where known, the
                amount — before you proceed, and in writing where required. You are never obliged to use a provider we refer
                you to.
              </p>

              <h3>Conflicts of interest</h3>
              <p>
                Because compensation can differ between products, insurers and providers, a conflict of interest may exist. We
                manage conflicts by putting your interests first, basing recommendations on a documented review of your needs,
                and disclosing material conflicts to you before you make a decision.
              </p>

              <h3>Consulting fees</h3>
              <p>
                Any fee for WeWin's consulting services is set out in a written agreement before paid work begins. Consulting
                fees are separate from, and do not replace, any commission an insurer pays to a licensed agent.
              </p>
            </Section>

            <Section id="debt" title="5. Debt solutions and credit">
              <ul>
                <li>
                  {debtSettlementRegistration
                    ? `WeWin is registered under Ontario's Collection and Debt Settlement Services Act (${debtSettlementRegistration}).`
                    : "WeWin is not a collection agency and does not provide debt settlement services as defined by Ontario's Collection and Debt Settlement Services Act. Where those services are appropriate, we refer you to providers registered under that Act."}
                </li>
                <li>
                  Debt-resolution outcomes depend on your circumstances, your creditors, applicable law and the agreed scope of
                  service. We do not guarantee that any creditor or collector will accept a proposed arrangement.
                </li>
                <li>
                  We do not guarantee any change to your credit score. Accurate, timely information on your credit report cannot
                  be removed, and legitimate debts cannot be erased.
                </li>
                <li>
                  You can obtain your credit report free of charge from Equifax Canada and TransUnion Canada and dispute
                  inaccurate information directly with them at no cost.
                </li>
                <li>
                  Not-for-profit credit counselling services are also available in Ontario. If a consumer proposal or
                  bankruptcy may be appropriate, only a Licensed Insolvency Trustee can provide those services.
                </li>
                <li>
                  Ontario's <em>Consumer Protection Act, 2002</em> may give you rights in relation to certain consumer
                  agreements, including cancellation rights. Your service agreement explains your rights.
                </li>
              </ul>
            </Section>

            <Section id="funding" title="6. Business funding and grants">
              <ul>
                <li>WeWin does not lend money, underwrite credit or make approval decisions.</li>
                <li>
                  WeWin is not a licensed mortgage brokerage. Financing secured by real property is arranged only through
                  brokerages licensed by FSRA.
                </li>
                <li>
                  Interest rates, fees, security requirements and personal guarantees are set by the lender. Review all terms
                  carefully and consider independent legal advice before signing. A personal guarantee can put your personal
                  assets at risk.
                </li>
                <li>
                  Grant and government programs are subject to eligibility, availability, deadlines, eligible-expense rules and
                  program conditions, and decisions are made by the administering organization. Funding is not guaranteed.
                </li>
              </ul>
            </Section>

            <Section id="corporate" title="7. Corporate restructuring, tax and legal">
              <ul>
                <li>
                  Legal documents — including reorganizations, share structures, trust deeds and agreements — are prepared by
                  independent lawyers. Tax returns, elections and filings are prepared by independent accountants.
                </li>
                <li>
                  Tax planning must comply with the <em>Income Tax Act</em>, including the general anti-avoidance rule. The
                  Canada Revenue Agency may review or challenge any arrangement, and tax laws and administrative practice can
                  change.
                </li>
                <li>
                  Restructuring must be undertaken for legitimate purposes. Transfers made to defeat, hinder or delay existing
                  creditors can be set aside under Ontario's <em>Fraudulent Conveyances Act</em>, the{' '}
                  <em>Assignments and Preferences Act</em> and federal insolvency law. Protection from liabilities is not
                  guaranteed.
                </li>
                <li>
                  Family trusts are subject to the tax on split income, attribution rules, a deemed disposition every 21 years,
                  and annual tax return and beneficial ownership reporting requirements.
                </li>
                <li>
                  Estate freezes rely on an independent valuation; a price adjustment clause is typically used in case the
                  Canada Revenue Agency disputes the value.
                </li>
                <li>
                  Corporate-owned insurance and Capital Dividend Account treatment depend on your structure and require review
                  by your tax advisers. Not all of a death benefit necessarily qualifies for the Capital Dividend Account.
                </li>
              </ul>
            </Section>

            <Section id="investments" title="8. Investments, pensions and retirement">
              <ul>
                <li>
                  WeWin is not registered to trade in or advise on securities and does not recommend specific securities.
                  Securities are available only through appropriately registered dealers and advisers.
                </li>
                <li>
                  Segregated fund contracts are insurance products offered by licensed life insurance agents. Their values
                  fluctuate, guarantees apply only as set out in the contract, and fees apply.
                </li>
                <li>
                  Individual Pension Plans require registration with the Canada Revenue Agency and, where applicable, a pension
                  regulator, as well as periodic actuarial valuations and ongoing funding and administration obligations.
                </li>
                <li>Past performance and illustrations do not guarantee future results.</li>
              </ul>
            </Section>

            <Section id="website" title="9. Information on this website">
              <p>
                Content on this website is general information for residents of {site.jurisdiction}. It is not personalized
                financial, insurance, investment, tax or legal advice, and it reflects our understanding of the rules on the
                date shown above. Examples and diagrams are illustrative only. Links to third-party websites are provided for
                convenience; we are not responsible for their content.
              </p>
              <p>
                See also our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </Section>

            <Section id="identity" title="10. Identity verification and privacy">
              <p>
                Insurers, MGAs, lenders and other financial institutions are required by federal anti-money-laundering law to
                verify your identity for certain products and may ask for identification and information about the source of
                funds. With your consent, we share only the information needed for your application or referral. Our{' '}
                <Link to="/privacy">Privacy Policy</Link> explains how we handle personal information.
              </p>
            </Section>

            <Section id="complaints" title="11. Making a complaint">
              <p>We take concerns seriously. If you are not satisfied:</p>
              <ol className="mb-4 list-decimal space-y-2 pl-5">
                <li>
                  Contact us first <ContactLine />, describing your concern and how you would like it resolved. We will
                  acknowledge your complaint and work to resolve it promptly and fairly.
                </li>
                <li>
                  For an insurance product, you may also use the issuing insurer's complaint process. If it is not resolved,
                  you can contact the OmbudService for Life &amp; Health Insurance (
                  <External href="https://www.olhi.ca">olhi.ca</External>), a free and independent service.
                </li>
                <li>
                  Concerns about the conduct of a licensed insurance agent or mortgage brokerage can be raised with FSRA (
                  <External href="https://www.fsrao.ca">fsrao.ca</External>).
                </li>
                <li>
                  Investment-related complaints may be taken to the Ombudsman for Banking Services and Investments (
                  <External href="https://www.obsi.ca">obsi.ca</External>).
                </li>
                <li>
                  Concerns about debt settlement or collection services can be raised with Consumer Protection Ontario, and
                  privacy concerns with the Office of the Privacy Commissioner of Canada (
                  <External href="https://www.priv.gc.ca">priv.gc.ca</External>).
                </li>
              </ol>
            </Section>

            <p className="border-t border-line pt-8 text-sm text-muted">
              We review these disclosures regularly and update them when our services, relationships or the law change. The
              "last updated" date at the top of this page shows the most recent revision.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

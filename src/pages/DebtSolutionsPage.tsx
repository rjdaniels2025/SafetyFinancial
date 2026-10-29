import { Check, Minus } from 'lucide-react';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { ConsultationBand, Notice, PageHero, ProcessSteps, SectionHeader, TopicList } from '../components/ui/Sections';
import FAQ from '../components/ui/FAQ';
import { debtPackages, packageTerms } from '../data/packages';
import usePageMeta from '../hooks/usePageMeta';

const contactLink = `/contact?service=${encodeURIComponent('Debt Solutions & Credit Counselling')}`;

const serviceGroups = [
  {
    title: 'Credit analysis',
    items: [
      'Comprehensive credit report analysis',
      'Review of credit accounts, balances, payment history and reported delinquencies',
      'Identification of potential credit-reporting discrepancies',
    ],
  },
  {
    title: 'Debt & collection consulting',
    items: [
      'Debt-resolution consulting',
      'Collection-related consulting and resolution support, where permitted',
      'Financial profile reviews',
    ],
  },
  {
    title: 'Guidance & support',
    items: [
      'Credit education and responsible credit-management guidance',
      'Personalized consultations and follow-up support',
      'Referrals to qualified debt professionals where appropriate',
    ],
  },
];

const steps = [
  { title: 'Initial consultation', text: 'We discuss your situation, your concerns and what you would like to achieve.' },
  { title: 'Information with consent', text: 'With your written consent, we collect the relevant information through a secure process.' },
  { title: 'Comprehensive credit analysis', text: 'We review your credit profile, accounts, balances, payment history and obligations.' },
  { title: 'Findings & options', text: 'We walk you through what we found and the options that may be available to you.' },
  { title: 'Consulting or referral', text: 'We provide the agreed consulting support, or refer you to an appropriate professional.' },
  { title: 'Follow-up', text: 'We review progress and next steps with you.' },
];

const faqs = [
  {
    q: 'Will a consultation or credit review affect my credit score?',
    a: 'Reviewing your own credit report does not affect your credit score. Any information we review is obtained with your consent.',
  },
  {
    q: 'Can negative items be removed from my credit report?',
    a: 'Accurate, timely information cannot be guaranteed for removal. We help identify potential reporting discrepancies so they can be reviewed with the credit bureau or the reporting creditor through the appropriate channels.',
  },
  {
    q: 'Are you a licensed insolvency trustee?',
    a: 'No. If a consumer proposal, bankruptcy or another formal insolvency process may be appropriate, we refer you to a licensed insolvency trustee.',
  },
  {
    q: 'How do I share my credit report or documents?',
    a: 'Please do not send credit reports or identification through our website forms or regular email. If documents are required, we will arrange a secure method to share them.',
  },
];

export default function DebtSolutionsPage() {
  usePageMeta(
    'Debt Solutions & Credit Counselling',
    'Credit report analysis, debt-resolution consulting and collection-related support to help you understand your credit profile and navigate your options.',
    '/debt-solutions'
  );

  return (
    <>
      <PageHero
        eyebrow="Debt Solutions & Credit Counselling"
        title="Understand Your Credit. Navigate Your Options."
        actions={
          <>
            <Button to={contactLink} variant="light" arrow>
              Book a Consultation
            </Button>
            <Button to="#packages" variant="outlineLight">
              View Service Packages
            </Button>
          </>
        }
      >
        WeWin Consulting Group helps clients understand their credit profiles, review outstanding financial obligations,
        and explore practical debt-resolution options. Our consulting process focuses on clarity, informed decisions, and a
        structured approach to the client's financial circumstances.
      </PageHero>

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Services" title="What we help with" />
          <div className="mt-8 sm:mt-12 grid gap-6 lg:grid-cols-3">
            {serviceGroups.map((group, i) => (
              <Reveal key={group.title} delay={i * 100} className="rounded-2xl border border-line bg-paper p-5 sm:p-7">
                <h3 className="text-xl font-semibold">{group.title}</h3>
                <div className="mt-5">
                  <TopicList items={group.items} columns={1} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Client process" title="A structured approach, step by step." />
          <Reveal className="mt-8 sm:mt-12">
            <ProcessSteps steps={steps} />
          </Reveal>
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 border-y border-line bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Service packages" title="Choose the level of support you need.">
            Every engagement begins with a consultation so we can confirm which package, if any, is appropriate for your
            situation.
          </SectionHeader>

          <div className="mt-8 sm:mt-12 grid gap-6 lg:grid-cols-2">
            {debtPackages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 100} className="flex flex-col rounded-2xl border border-line bg-paper p-6 sm:p-8">
                <p className="eyebrow">Package {i + 1}</p>
                <h3 className="mt-3 text-2xl font-semibold leading-snug">{pkg.name}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted">{pkg.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] text-ink/85">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-brass-dark" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-line pt-6">
                  {pkg.price ? (
                    <p>
                      <span className="font-serif text-3xl font-semibold">{pkg.price}</span>
                      {pkg.priceNote && <span className="ml-2 text-sm text-muted">{pkg.priceNote}</span>}
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-ink/80">Pricing confirmed during your consultation</p>
                  )}
                  <Button to={contactLink} className="mt-5 w-full sm:w-auto" arrow>
                    Discuss this package
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 grid gap-8 rounded-2xl border border-line p-6 sm:p-8 lg:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold">Not included</h3>
              <ul className="mt-4 space-y-2.5">
                {packageTerms.exclusions.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink/80">
                    <Minus className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Fees, payment & cancellation</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/80">{packageTerms.payment}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Questions" title="Common questions" />
          </div>
          <div className="space-y-8 lg:col-span-7">
            <FAQ items={faqs} />
            <Notice>
              Debt-resolution outcomes depend on individual circumstances, creditors, applicable law and the agreed scope of
              service. We do not guarantee any particular credit score increase, the deletion of accurate negative
              information, the removal of legitimate debts, or the acceptance of a proposed settlement.
            </Notice>
          </div>
        </div>
      </section>

      <ConsultationBand title="Ready to understand your options?" />
    </>
  );
}

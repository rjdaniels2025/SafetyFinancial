import { Check, X as XIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { ConsultationBand, Notice, PageHero, ProcessSteps, SectionHeader, TopicList } from '../components/ui/Sections';
import FundingIntakeForm from '../components/forms/FundingIntakeForm';
import usePageMeta from '../hooks/usePageMeta';

const financingOptions = [
  { title: 'Business loans', text: 'Term financing for defined business purposes.' },
  { title: 'Business lines of credit', text: 'Flexible access to capital for ongoing needs.' },
  { title: 'Working capital financing', text: 'Support for cash flow, payroll, inventory and operations.' },
  { title: 'Startup & expansion financing', text: 'Capital for launching, growing or opening new locations.' },
  { title: 'Equipment & business-purpose financing', text: 'Financing tied to specific assets and business uses.' },
  { title: 'Alternative lending options', text: 'Non-traditional lenders where conventional options may not fit.' },
  { title: 'Private financing', text: 'Private financing opportunities, where appropriate.' },
  { title: 'Government-supported programs', text: 'Financing programs supported by federal or provincial governments.' },
];

const advisory = [
  'Financing-readiness consultations',
  'Grant and incentive opportunity identification',
  'Referrals to relevant lenders and qualified financing professionals',
];

const steps = [
  { title: 'Intake', text: 'Share your business profile and general financing needs through our secure intake.' },
  { title: 'Readiness review', text: 'We review your objectives, financial position and the information lenders typically consider.' },
  { title: 'Options explored', text: 'We discuss financing channels and programs that may align with your needs and eligibility.' },
  { title: 'Preparation', text: 'We help you understand what is typically required to prepare a complete application.' },
  { title: 'Referral', text: 'Where appropriate, we refer you to relevant lenders or qualified financing professionals.' },
  { title: 'Follow-up', text: 'We stay in touch as you move through the process and plan your next steps.' },
];

const grants = [
  'Grant opportunity identification',
  'Government program research',
  'Business expansion and innovation programs',
  'Eligible hiring and training initiatives',
  'Relevant tax incentives and reimbursement programs',
  'Referrals to grant writers and program specialists',
];

export default function BusinessFundingPage() {
  usePageMeta(
    'Business Funding Solutions',
    'Consulting on business loans, lines of credit, working capital, government-supported programs, grants and financing readiness for Canadian businesses.',
    '/business-funding'
  );

  return (
    <>
      <PageHero
        eyebrow="Business Funding Solutions"
        title="Strategic Funding Solutions for Business Growth."
        actions={
          <>
            <Button to="#intake" variant="light" arrow>
              Start a Funding Inquiry
            </Button>
            <Button to={`/contact?service=${encodeURIComponent('Business Funding Solutions')}`} variant="outlineLight">
              Book a Consultation
            </Button>
          </>
        }
      >
        WeWin Consulting Group helps entrepreneurs and established businesses explore financing options aligned with their
        business objectives, financial position, and eligibility. From working capital to expansion opportunities, we help
        clients better understand the options available through relevant funding channels.
      </PageHero>

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Financing options" title="Funding channels we help you explore." />
          <div className="mt-8 sm:mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {financingOptions.map((o) => (
              <div key={o.title} className="bg-white p-6">
                <h3 className="text-lg font-semibold leading-snug">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{o.text}</p>
              </div>
            ))}
          </div>
          <Reveal className="mt-10 rounded-2xl border border-line bg-paper p-5 sm:p-7">
            <h3 className="text-lg font-semibold">Funding readiness support</h3>
            <div className="mt-4">
              <TopicList items={advisory} columns={3} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="How it works" title="From first conversation to the right funding channel." />
          <Reveal className="mt-8 sm:mt-12">
            <ProcessSteps steps={steps} />
          </Reveal>
        </div>
      </section>

      <section id="grants" className="scroll-mt-24 border-y border-line bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader eyebrow="Grants & business development" title="Programs that support growth and innovation.">
              Government and industry programs can support expansion, innovation, hiring and training. We help you identify
              opportunities that may be relevant and connect you with specialists where needed.
            </SectionHeader>
          </div>
          <Reveal className="space-y-8 lg:col-span-7" delay={100}>
            <TopicList items={grants} />
            <Notice title="About grants and programs">
              Grant availability, eligibility, deadlines, eligible expenses and funding amounts vary by program and can change
              without notice. Program decisions are made by the administering organization. We do not guarantee financing
              approval or grant awards.
            </Notice>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Our role" title="Clear about what we do — and what we don't." />
          <Reveal className="mt-8 sm:mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h3 className="text-xl font-semibold">WeWin Consulting Group</h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Consults on financing options and readiness',
                  'Identifies potentially relevant programs and grants',
                  'Helps you understand typical application requirements',
                  'Refers you to relevant lenders and qualified professionals',
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] text-ink/85">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-dark" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Lenders & authorized professionals</h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Lend funds and set rates, terms and conditions',
                  'Carry out brokerage activities where licensing is required',
                  'Underwrite and assess creditworthiness',
                  'Make final approval decisions',
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] text-ink/85">
                    <XIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted">WeWin does not perform these activities.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="intake" className="scroll-mt-24 border-t border-line bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Funding intake" title="Tell us about your business.">
              This short inquiry helps us prepare for your consultation. General ranges are all we need at this stage.
            </SectionHeader>
            <div className="mt-8">
              <Notice title="Before you apply">
                Financing is subject to lender requirements, due diligence and approval. Submitting this form does not
                constitute an application for credit.
              </Notice>
            </div>
          </div>
          <div className="-mx-4 border-y border-line bg-paper px-4 py-7 sm:mx-0 sm:rounded-2xl sm:border sm:p-10 lg:col-span-8">
            <FundingIntakeForm />
          </div>
        </div>
      </section>

      <ConsultationBand title="Planning your next stage of growth?" />
    </>
  );
}

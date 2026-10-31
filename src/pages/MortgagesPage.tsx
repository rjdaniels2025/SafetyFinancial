import { Link } from 'react-router-dom';
import { Check, X as XIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { ConsultationBand, Notice, PageHero, ProcessSteps, SectionHeader, TopicList } from '../components/ui/Sections';
import { mortgagePage } from '../data/services';
import { site } from '../config/site';
import usePageMeta from '../hooks/usePageMeta';

const contactHref = `/contact?service=${encodeURIComponent('Mortgage & Private Lending Referrals')}`;

const residential = [
  'Purchase mortgages for homebuyers',
  'Refinancing, including consolidating higher-interest debt',
  'Renewals and switching lenders',
  'Home equity lines of credit',
  'Self-employed and business-owner borrowers',
  'Credit-rebuilding and alternative ("B") lending options',
];

const privateAndCommercial = [
  'Private mortgages where conventional lenders may not fit',
  'Short-term and bridge financing',
  'Second mortgages',
  'Commercial and mixed-use property financing',
  'Construction and development financing',
  'Investment and rental property financing',
];

const steps = [
  { title: 'Conversation', text: 'We discuss your goals and where a mortgage or private financing may fit into your wider financial picture.' },
  { title: 'Introduction', text: 'With your consent, we introduce you to a licensed mortgage brokerage or agent from our partner network.' },
  { title: 'Licensed advice', text: 'The licensed partner explains the options and handles the application and lender, while we keep the mortgage aligned with your wider plan.' },
];

export default function MortgagesPage() {
  usePageMeta(
    'Mortgage & Private Lending',
    'Referrals to FSRA-licensed mortgage brokerages and agents for residential, private and commercial mortgage financing in Ontario.',
    mortgagePage.path
  );

  const partners = site.licensing.mortgagePartners;

  return (
    <>
      <PageHero
        eyebrow="Mortgage & Private Lending"
        title="Mortgage and Private Lending Referrals."
        actions={
          <Button to={contactHref} variant="light" arrow>
            Request an Introduction
          </Button>
        }
      >
        When a mortgage, refinance or private loan is part of the plan, we connect you with licensed mortgage professionals
        in our partner network — and keep that financing working with your debt, business funding and long-term strategy.
      </PageHero>

      <section className="bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="What our partners can help with" title="Financing for homes, properties and businesses." />
          <div className="mt-8 grid gap-6 sm:mt-12 lg:grid-cols-2">
            <Reveal className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Residential mortgages</h3>
              <div className="mt-5">
                <TopicList items={residential} columns={1} />
              </div>
            </Reveal>
            <Reveal delay={100} className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Private and commercial lending</h3>
              <div className="mt-5">
                <TopicList items={privateAndCommercial} columns={1} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="How referrals work" title="An introduction, then licensed advice." />
          <Reveal className="mt-8 sm:mt-12">
            <ProcessSteps steps={steps} />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-white py-14 sm:py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="Our role" title="Clear about what we do — and what we don't." />
          <Reveal className="mt-8 grid gap-6 sm:mt-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h3 className="text-xl font-semibold">WeWin Consulting Group</h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Talks with you about your goals and overall financial picture',
                  'Introduces you to licensed mortgage professionals, with your consent',
                  'Coordinates the mortgage with your debt, funding and planning strategies',
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] text-ink/85">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-dark" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Licensed mortgage brokerages & agents</h3>
              <ul className="mt-5 space-y-3">
                {[
                  'Advise on mortgage products, rates and terms',
                  'Collect your application and supporting documents',
                  'Deal with lenders and arrange the mortgage',
                  'Provide the disclosures Ontario law requires, including any referral fee',
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

          {partners.length > 0 && (
            <Reveal className="mt-10">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-muted">Our licensed partners</h3>
              <ul className="mt-4 space-y-2 text-[15px] text-ink/85">
                {partners.map((p) => (
                  <li key={p.name}>
                    <span className="font-semibold text-ink">{p.name}</span> — {p.licence}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <div className="mt-10 max-w-4xl">
            <Notice title="Important information about mortgages and private lending">
              WeWin Consulting Group is not a licensed mortgage brokerage and does not deal or trade in mortgages. Mortgage
              advice and arrangements are provided only by brokerages and agents licensed by the Financial Services Regulatory
              Authority of Ontario (FSRA). WeWin may receive a referral fee from a partner; if so, it is disclosed to you in
              writing before you proceed. Private and alternative mortgages usually cost more than conventional mortgages —
              higher rates and lender, broker and legal fees, shorter terms, and renewal risk — and are secured against your
              property. Approval, rates and terms are set by the lender. Consider independent legal advice before signing. See
              our <Link to="/disclosures#mortgages" className="font-medium underline underline-offset-2">Disclosures</Link>.
            </Notice>
          </div>
        </div>
      </section>

      <ConsultationBand title="Talk through where a mortgage fits in your plan." />
    </>
  );
}

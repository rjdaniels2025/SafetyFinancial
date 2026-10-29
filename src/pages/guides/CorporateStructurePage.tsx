import { ConsultationBand, Notice } from '../../components/ui/Sections';
import { GuideHero, GuideSection, RelatedGuides, RuleCards, StepCards } from '../../components/ui/Guide';
import OwnershipDiagram from '../../components/strategies/OwnershipDiagram';
import usePageMeta from '../../hooks/usePageMeta';

const path = '/financial-strategies/corporate-structure';

export default function CorporateStructurePage() {
  usePageMeta(
    'Corporate Structure: Holding Companies, Operating Companies & Family Trusts',
    'How separating an operating company, a holding company and a family trust lets profit be taxed the way you planned and kept apart from business risk.',
    path
  );

  return (
    <>
      <GuideHero eyebrow="Corporate structure · How it works" before="Profit should sit where you put it, not where it" accent="landed" after=".">
        Many owners end up with a single operating company that holds everything — the trading risk, the retained earnings,
        the rental property and the cash. That is the default structure, and it is rarely a deliberate one. Corporate
        structuring separates those pieces so profit is taxed the way you planned and kept apart from risk it does not need
        to carry.
      </GuideHero>

      <GuideSection
        eyebrow="The pieces"
        title="Three entities, three different jobs."
        intro="Each part of the structure does one thing well. Together they keep profit, assets and growth where they belong."
      >
        <RuleCards
          items={[
            {
              title: 'Operating company',
              text: 'The company that trades, bills customers and carries the day-to-day risk. Profit left here is exposed to the claims of every creditor the business will ever have.',
            },
            {
              title: 'Holding company',
              text: 'A separate company that owns the shares of the operating company. Retained earnings can generally be moved up to it as tax-free inter-corporate dividends — out of operating risk — subject to specific tax rules.',
            },
            {
              title: 'Family trust',
              text: 'A trust that holds the growth shares, so future appreciation can be directed to the next generation on the terms you set in the trust deed.',
            },
          ]}
        />
      </GuideSection>

      <GuideSection
        eyebrow="Putting it together"
        title="How the pieces connect."
        tone="paper"
        intro="A common arrangement combines all three, often with an estate freeze at the top. The right design depends on your circumstances and is confirmed with your lawyers and accountants."
      >
        <OwnershipDiagram />
      </GuideSection>

      <GuideSection
        eyebrow="The process"
        title="How we get you there."
        intro="We coordinate the CPAs and corporate, tax and litigation lawyers involved, so each step happens in the right order."
      >
        <StepCards
          steps={[
            {
              title: 'Review the current structure',
              text: 'We look at how the company is incorporated, what it owns, where the retained earnings sit and what the shareholders actually want to happen to it.',
            },
            {
              title: 'Design the target structure',
              text: 'Tax, legal and insurance professionals agree on the structure, the sequence of steps and the elections needed to get there — generally on a tax-deferred basis.',
            },
            {
              title: 'Execute and file',
              text: 'Resolutions, rollovers, trust deeds and filings are drafted, signed and filed by the professionals involved. You approve at each stage; we coordinate everything else.',
            },
            {
              title: 'Maintain and review',
              text: "Annual minutes, trust filings and key dates — including the trust's 21-year date — are tracked so the structure keeps working as the business grows.",
            },
          ]}
        />
      </GuideSection>

      <section className="bg-paper py-12 sm:py-16">
        <div className="container-page max-w-4xl">
          <Notice title="Important information">
            Corporate structuring involves complex tax and legal rules and requires individualized advice from qualified
            lawyers and accountants. Structures must be implemented for legitimate purposes — transfers made to defeat
            existing creditors can be reversed under applicable law. Tax outcomes and protection from liabilities are not
            guaranteed and depend on your circumstances and how the structure is implemented and maintained.
          </Notice>
        </div>
      </section>

      <RelatedGuides current={path} />
      <ConsultationBand title="Find out whether your structure is working for you." />
    </>
  );
}

import { Link } from 'react-router-dom';
import { ConsultationBand, Notice } from '../../components/ui/Sections';
import { GuideHero, GuideSection, NumberedPoints, RelatedGuides, StepCards } from '../../components/ui/Guide';
import usePageMeta from '../../hooks/usePageMeta';

const path = '/financial-strategies/estate-freeze';

export default function EstateFreezePage() {
  usePageMeta(
    'Estate Freezes',
    'How an estate freeze fixes the tax on your shares at today’s value, what happens at death, and what to watch for before you freeze.',
    path
  );

  return (
    <>
      <GuideHero eyebrow="Estate freezes · How it works" before="The company keeps growing. Your tax bill stops where you" accent="freeze" after=" it.">
        When you die, the tax rules generally treat your shares as if you sold them that day, unless they pass to a spouse or
        spousal trust. The more the company has grown, the bigger that bill — and your estate has to pay it whether or not
        anything was actually sold. An estate freeze fixes your share of the company at today's value and hands the future
        growth to the next generation. Here is what actually changes.
      </GuideHero>

      <GuideSection
        eyebrow="The mechanics"
        title="How a freeze works."
        intro="The steps are usually completed on a tax-deferred basis using the rollover provisions of the Income Tax Act."
      >
        <StepCards
          steps={[
            {
              title: 'Value the company',
              text: 'An independent valuation establishes the fair market value of your shares today. Everything else is built on this number.',
            },
            {
              title: 'Exchange your common shares',
              text: 'You exchange your common shares for preferred shares with a fixed redemption value equal to that amount. Your interest is now frozen at today’s value.',
            },
            {
              title: 'Issue new growth shares',
              text: 'New common shares are issued for a nominal amount to your children or a family trust. All future growth in the company accrues to them.',
            },
            {
              title: 'Plan for the frozen amount',
              text: (
                <>
                  Because the tax on your frozen shares is now a known figure, it can be planned and funded — often with{' '}
                  <Link to="/financial-strategies/corporate-life-insurance" className="font-medium text-accent-dark underline decoration-accent underline-offset-2">
                    corporate-owned life insurance
                  </Link>
                  .
                </>
              ),
            },
          ]}
        />
      </GuideSection>

      <GuideSection eyebrow="What happens at death" title="Settled years in advance." tone="paper">
        <NumberedPoints
          items={[
            {
              lead: 'The number was settled years ago.',
              text: 'The deemed disposition applies to preferred shares fixed at the frozen amount, not to what the company has become since.',
            },
            {
              lead: 'The growth is already somewhere else.',
              text: 'The common shares issued at the freeze belong to your children or the family trust, so that growth was never part of your estate.',
            },
            {
              lead: 'A known bill can be funded.',
              text: 'Because the amount stopped moving, it can be planned for deliberately rather than discovered by your family at the worst possible time.',
            },
            {
              lead: 'You can keep control.',
              text: 'Freeze shares can carry voting rights, so a freeze can hand over the future growth without handing over the company.',
            },
          ]}
        />
      </GuideSection>

      <GuideSection
        eyebrow="What to watch for"
        title="Get these right at the start."
        intro="A freeze is a long-term decision. These are the points your accountant and lawyer will focus on."
      >
        <NumberedPoints
          items={[
            {
              lead: 'A freeze is hard to undo.',
              text: 'If the company’s value later falls, a refreeze may be possible, but it is a fresh transaction with its own cost and its own conditions.',
            },
            {
              lead: 'A family trust has a 21-year clock.',
              text: 'Trust assets face a deemed disposition every twenty-one years. That date has to be planned for from the day the trust is created, not discovered in year twenty.',
            },
            {
              lead: 'Who receives the new common shares matters.',
              text: 'The attribution rules, the tax on split income and the corporate attribution rule can all apply depending on who holds what and who benefits. Those turn on facts your accountant needs to review.',
            },
            {
              lead: 'The valuation is the foundation.',
              text: 'A freeze built on a value the Canada Revenue Agency later disputes can unravel, which is why a price adjustment clause is standard.',
            },
          ]}
        />
      </GuideSection>

      <section className="bg-paper py-12 sm:py-16">
        <div className="container-page max-w-4xl">
          <Notice title="Important information">
            Estate freezes involve complex tax and legal rules and require individualized advice from qualified lawyers and
            accountants, including an independent valuation. The tax treatment described is general and depends on your
            circumstances, the structure used and current law. No particular tax outcome is guaranteed.
          </Notice>
        </div>
      </section>

      <RelatedGuides current={path} />
      <ConsultationBand title="See what a freeze could look like for your company." />
    </>
  );
}

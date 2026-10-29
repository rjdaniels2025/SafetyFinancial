import { ConsultationBand, Notice } from '../../components/ui/Sections';
import { ArrowList, GuideHero, GuideSection, RelatedGuides, RuleCards } from '../../components/ui/Guide';
import Reveal from '../../components/ui/Reveal';
import usePageMeta from '../../hooks/usePageMeta';

const path = '/financial-strategies/family-trusts';

export default function FamilyTrustsPage() {
  usePageMeta(
    'Family Trusts',
    'How a family trust works — the settlor, the trustee and the beneficiaries — what a trust can do that a will cannot, and the 21-year rule.',
    path
  );

  return (
    <>
      <GuideHero eyebrow="Family trusts · How it works" before="You set the rules while you are" accent="here" after=".">
        A family trust is a legal arrangement that holds assets — often the growth shares of your company — for the benefit of
        your family. It lets you direct future growth to the next generation on terms you choose and keep flexibility over who
        receives what, and when. Here is what is actually involved.
      </GuideHero>

      <GuideSection
        eyebrow="The three pieces"
        title="A settlor, a trustee and the beneficiaries."
        intro="A trust is not a company and it is not a person. It is a set of rules, written into a deed, that govern how property is held and for whom."
      >
        <RuleCards
          items={[
            {
              title: 'The settlor',
              text: 'The person who creates the trust and transfers the initial property into it. Once it is in, they no longer own it directly. Choosing the right settlor matters for tax reasons.',
            },
            {
              title: 'The trustee',
              text: 'The person or company that holds legal title and makes the decisions the trust deed allows — including when, and to whom, assets are distributed.',
            },
            {
              title: 'The beneficiaries',
              text: 'The family members the trust is set up to benefit. The trustee decides how and when, within the rules the deed sets.',
            },
          ]}
        />
      </GuideSection>

      <GuideSection eyebrow="Why families use them" title="Four things a trust can do that a will cannot." tone="paper">
        <ArrowList
          items={[
            'Direct future growth to the next generation during your lifetime, on terms you set',
            'Split income with family members in lower tax brackets, within the rules that still allow it',
            'Help protect family assets from future creditors and from a beneficiary’s own poor decisions',
            'Keep flexibility over who receives what, and when, instead of fixing it at death',
          ]}
        />
        <Reveal>
          <p className="mt-6 text-[15px] leading-relaxed text-muted">
            A trust is also subject to a deemed disposition of its assets every 21 years and to annual tax return and reporting
            requirements. These have to be planned for before the trust is set up, not after.
          </p>
        </Reveal>
      </GuideSection>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-page max-w-4xl">
          <Notice title="Important information">
            Family trusts are subject to complex rules, including the tax on split income, attribution rules, the 21-year
            deemed disposition and trust reporting requirements. A trust must be set up and administered with individualized
            advice from qualified lawyers and accountants. Protection from creditors is not guaranteed, and transfers made to
            defeat existing creditors can be reversed under applicable law.
          </Notice>
        </div>
      </section>

      <RelatedGuides current={path} />
      <ConsultationBand title="Talk through whether a family trust fits your plans." />
    </>
  );
}

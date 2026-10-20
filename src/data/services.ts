import {
  Receipt,
  Scale,
  TrendingUp,
  Rocket,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceContent {
  slug: string;
  path: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  heroTitle: string;
  heroHighlight: string;
  heroText: string;
  outcomes: string[];
  offerings: { title: string; description: string }[];
  audiences: { title: string; description: string }[];
  steps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  formTitle: string;
  formOptions: string[];
  formOptionsLabel: string;
}

export const services: ServiceContent[] = [
  {
    slug: 'tax',
    path: '/tax-solutions',
    name: 'Tax Solutions',
    shortName: 'Tax',
    icon: Receipt,
    tagline: 'Keep more of what you earn',
    summary:
      'Proactive tax planning, back-tax resolution and smarter structures so you stop overpaying and stay ahead of deadlines.',
    heroTitle: 'Pay what you owe —',
    heroHighlight: 'not a dollar more',
    heroText:
      'Most people only think about taxes once a year. We help business owners and households plan all year long, so every deduction, credit and structure is working in your favour.',
    outcomes: [
      'Year-round tax planning, not just filing season',
      'Back-tax and tax-debt resolution strategies',
      'Business structure and write-off reviews',
      'Organized records that make filing painless',
    ],
    offerings: [
      {
        title: 'Strategic Tax Planning',
        description:
          'A forward-looking plan that times income, expenses and contributions to legally reduce what you owe.',
      },
      {
        title: 'Tax Debt Resolution',
        description:
          'Behind on taxes? We map out options such as payment arrangements and work with qualified partners to resolve balances.',
      },
      {
        title: 'Business Write-Off Review',
        description:
          'We review your business expenses, vehicle, home office and payroll to find deductions you may be missing.',
      },
      {
        title: 'Entity & Structure Guidance',
        description:
          'Sole proprietor, partnership or corporation? We help you understand which structure fits your income and goals.',
      },
      {
        title: 'Bookkeeping Clean-Up',
        description:
          'Messy books cost money. We help organize your records so your filings are accurate and stress-free.',
      },
      {
        title: 'Filing Coordination',
        description:
          'We coordinate preparation and filing with licensed tax professionals in our network, so nothing slips.',
      },
    ],
    audiences: [
      {
        title: 'Business Owners',
        description:
          'Self-employed, contractors and small business owners who want a clear plan to lower their tax bill.',
      },
      {
        title: 'Everyday Earners',
        description:
          'Employees and families who want to make sure they are claiming every credit and deduction available.',
      },
      {
        title: 'Anyone Behind on Taxes',
        description:
          'Unfiled returns or a growing balance? We help you build a realistic path back to good standing.',
      },
    ],
    steps: [
      { title: 'Free Review', description: 'Tell us about your income, business and past filings.' },
      { title: 'Tax Strategy', description: 'We identify savings opportunities and any issues to resolve.' },
      { title: 'Execute', description: 'We put the plan in motion with our licensed partners where required.' },
      { title: 'Stay Ahead', description: 'Ongoing check-ins so you are never surprised at tax time again.' },
    ],
    faqs: [
      {
        question: 'Do you prepare and file tax returns?',
        answer:
          'We focus on strategy and planning. Where preparation, filing or representation is needed, we coordinate it with licensed tax professionals in our network.',
      },
      {
        question: 'I owe back taxes. Can you help?',
        answer:
          'Yes. We review your situation, explain your options and connect you with the right professionals to resolve the balance.',
      },
      {
        question: 'Is this only for businesses?',
        answer:
          'No. We work with business owners and individuals alike. Everyone benefits from a plan that lowers their tax burden.',
      },
    ],
    formTitle: 'Book your free tax strategy review',
    formOptionsLabel: 'What do you need help with?',
    formOptions: [
      'Lowering my taxes going forward',
      'I owe back taxes',
      'Unfiled returns',
      'Business structure / write-offs',
      'Not sure — review everything',
    ],
  },
  {
    slug: 'debt',
    path: '/debt-solutions',
    name: 'Debt Solutions',
    shortName: 'Debt',
    icon: Scale,
    tagline: 'A clear way out of debt',
    summary:
      'Personalized debt strategies — consolidation, negotiation and payoff plans — designed to lower payments and get you debt-free faster.',
    heroTitle: 'Get out of debt with',
    heroHighlight: 'a real plan',
    heroText:
      'Debt grows quietly through high interest and scattered payments. We look at the full picture and build a strategy that lowers what you pay and shortens how long you pay it.',
    outcomes: [
      'One clear plan for every balance you carry',
      'Lower interest and fewer monthly payments',
      'Options explained in plain language',
      'Business and personal debt both covered',
    ],
    offerings: [
      {
        title: 'Debt Analysis',
        description:
          'A full breakdown of every balance, rate and payment so you can see exactly where your money is going.',
      },
      {
        title: 'Consolidation Strategy',
        description:
          'Combine high-interest balances into a single, more manageable payment where it makes sense.',
      },
      {
        title: 'Payoff Roadmap',
        description:
          'A month-by-month plan (avalanche, snowball or hybrid) built around your actual budget.',
      },
      {
        title: 'Creditor Negotiation Referrals',
        description:
          'When settlement or formal relief is the right fit, we connect you with licensed professionals to negotiate on your behalf.',
      },
      {
        title: 'Business Debt Restructuring',
        description:
          'Free up cash flow by restructuring equipment loans, lines of credit and merchant advances.',
      },
      {
        title: 'Budget & Cash-Flow Coaching',
        description:
          'Simple systems to stay on track so you never end up back where you started.',
      },
    ],
    audiences: [
      {
        title: 'Overwhelmed Households',
        description:
          'Credit cards, car loans, lines of credit — when the payments pile up, we bring order to the chaos.',
      },
      {
        title: 'Business Owners',
        description:
          'Business debt squeezing your cash flow? We help restructure so you can focus on growth again.',
      },
      {
        title: 'Anyone Facing Collections',
        description:
          'Calls and letters from collectors are stressful. We help you understand your options and next steps.',
      },
    ],
    steps: [
      { title: 'Free Debt Review', description: 'Share your balances, rates and monthly payments.' },
      { title: 'Options Mapped', description: 'We lay out every realistic path, with pros and cons.' },
      { title: 'Plan in Motion', description: 'We execute the strategy and bring in licensed partners when needed.' },
      { title: 'Debt-Free Path', description: 'Track progress with regular check-ins until you are clear.' },
    ],
    faqs: [
      {
        question: 'Will this hurt my credit?',
        answer:
          'It depends on the strategy. Some options, like consolidation, can help over time; others may have a short-term impact. We explain the trade-offs before you decide.',
      },
      {
        question: 'Do you lend money?',
        answer:
          'No. We are consultants. When consolidation financing makes sense, we refer you to lending partners in our network.',
      },
      {
        question: 'How much debt do I need to work with you?',
        answer:
          'There is no minimum. Whether it is $5,000 or $500,000, a clear plan makes a difference.',
      },
    ],
    formTitle: 'Get your free debt review',
    formOptionsLabel: 'Approximate total debt',
    formOptions: ['Under $10,000', '$10,000 – $25,000', '$25,000 – $50,000', '$50,000 – $100,000', 'Over $100,000'],
  },
  {
    slug: 'credit',
    path: '/credit-building',
    name: 'Credit Building',
    shortName: 'Credit',
    icon: TrendingUp,
    tagline: 'Build credit that opens doors',
    summary:
      'Credit report reviews, error disputes and a step-by-step building plan for personal and business credit.',
    heroTitle: 'Build the credit that',
    heroHighlight: 'unlocks your next move',
    heroText:
      'Your credit score affects your rates, approvals and even business funding. We help you understand your report, fix what is wrong and build a profile lenders say yes to.',
    outcomes: [
      'Know exactly what is on your credit report',
      'Dispute inaccurate or outdated items',
      'Build a strong personal and business credit profile',
      'Position yourself for better rates and approvals',
    ],
    offerings: [
      {
        title: 'Credit Report Review',
        description:
          'A line-by-line walkthrough of your reports so you know what is helping and what is hurting.',
      },
      {
        title: 'Dispute Guidance',
        description:
          'We help you challenge inaccurate, incomplete or outdated items with the credit bureaus.',
      },
      {
        title: 'Credit Building Plan',
        description:
          'Utilization targets, the right accounts and payment habits that steadily raise your score.',
      },
      {
        title: 'Business Credit Setup',
        description:
          'Separate your business from your personal credit and build a business profile for future funding.',
      },
      {
        title: 'Funding Readiness',
        description:
          'Get your credit in shape before you apply for a mortgage, car loan or business capital.',
      },
      {
        title: 'Credit Counselling Referrals',
        description:
          'When you need formal support, we connect you with trusted credit counselling professionals.',
      },
    ],
    audiences: [
      {
        title: 'Rebuilding After Setbacks',
        description:
          'Late payments, collections or a past insolvency do not have to define your future.',
      },
      {
        title: 'Planning a Big Purchase',
        description:
          'Getting ready for a home, vehicle or major financing? Better credit means better terms.',
      },
      {
        title: 'Business Owners',
        description:
          'Build business credit so you can access capital without putting everything on your personal name.',
      },
    ],
    steps: [
      { title: 'Free Credit Review', description: 'We review your credit reports with you.' },
      { title: 'Custom Plan', description: 'We prioritize disputes and building actions for the biggest impact.' },
      { title: 'Take Action', description: 'Disputes filed, accounts optimized, habits set.' },
      { title: 'Track Progress', description: 'Monitor improvements and adjust until you hit your goal.' },
    ],
    faqs: [
      {
        question: 'How fast can my credit improve?',
        answer:
          'Every file is different. Some changes show up within a reporting cycle or two; others take longer. We set realistic expectations after reviewing your report.',
      },
      {
        question: 'Can you remove accurate negative items?',
        answer:
          'No one can legally remove accurate, timely information. We focus on correcting errors and building positive history that outweighs past setbacks.',
      },
      {
        question: 'Do you help with business credit?',
        answer:
          'Yes. Building a separate business credit profile is a key step toward funding your growth.',
      },
    ],
    formTitle: 'Start your free credit review',
    formOptionsLabel: 'Current credit score (estimate)',
    formOptions: ['Below 550', '550 – 619', '620 – 679', '680 – 739', '740+', 'Not sure'],
  },
  {
    slug: 'business',
    path: '/business-growth',
    name: 'Business Growth & Funding',
    shortName: 'Business Growth',
    icon: Rocket,
    tagline: 'Capital and strategy to scale',
    summary:
      'Growth strategy plus access to our network of funding partners — loans, lines of credit, equipment financing and grants.',
    heroTitle: 'Fuel your business with',
    heroHighlight: 'strategy and capital',
    heroText:
      'Growth takes more than hard work — it takes the right plan and the right funding at the right time. We help you get fundable and connect you with partners in our network who can deliver the capital.',
    outcomes: [
      'A growth plan built around your numbers',
      'Access to our network of funding partners',
      'Help preparing a strong funding application',
      'Tax, credit and cash flow aligned for growth',
    ],
    offerings: [
      {
        title: 'Funding Referrals',
        description:
          'Term loans, lines of credit, equipment financing and more through our trusted partner network.',
      },
      {
        title: 'Grants & Programs',
        description:
          'We help identify grants and government-backed programs your business may qualify for.',
      },
      {
        title: 'Funding Readiness Review',
        description:
          'We review your financials, credit and documents so you apply with confidence.',
      },
      {
        title: 'Growth Strategy Sessions',
        description:
          'Pricing, cash flow, margins and expansion — practical strategy for your next stage.',
      },
      {
        title: 'Cash-Flow Optimization',
        description:
          'Find the leaks, tighten your terms and free up working capital to reinvest.',
      },
      {
        title: 'Start-Up Foundations',
        description:
          'Launching something new? Set up the right structure, banking and credit from day one.',
      },
    ],
    audiences: [
      {
        title: 'Established Businesses',
        description: 'Ready to expand, hire or take on bigger contracts and need capital to do it.',
      },
      {
        title: 'Start-Ups & Side Hustles',
        description: 'Building from the ground up and want to do it right from the start.',
      },
      {
        title: 'Cash-Strapped Owners',
        description: 'Profitable on paper but tight on cash? Let us fix the flow before you borrow.',
      },
    ],
    steps: [
      { title: 'Discovery Call', description: 'Tell us about your business, revenue and goals.' },
      { title: 'Readiness Check', description: 'We review credit, financials and documents.' },
      { title: 'Partner Match', description: 'We connect you with the funding partners best suited to you.' },
      { title: 'Grow', description: 'Put the capital to work with a plan that keeps you profitable.' },
    ],
    faqs: [
      {
        question: 'Are you a lender?',
        answer:
          'No. We are consultants who refer you to funding partners in our network. Approval and terms are set by the lender.',
      },
      {
        question: 'What kind of funding can I access?',
        answer:
          'Depending on your profile: term loans, lines of credit, equipment financing, revenue-based financing and grants.',
      },
      {
        question: 'Do I need good credit to get funding?',
        answer:
          'Stronger credit opens more doors, but options exist at many levels. If you are not ready yet, our credit building service gets you there.',
      },
    ],
    formTitle: 'See what funding you qualify for',
    formOptionsLabel: 'How much funding are you looking for?',
    formOptions: ['Under $25,000', '$25,000 – $100,000', '$100,000 – $250,000', '$250,000+', 'Not sure yet'],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;

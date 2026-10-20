import {
  Receipt,
  HeartPulse,
  Building2,
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
    path: '/tax-strategy',
    name: 'Tax Strategy & Business Incentives',
    shortName: 'Tax & Incentives',
    icon: Receipt,
    tagline: 'SR&ED, tax credits and tax savings',
    summary:
      'SR&ED consulting, government tax credits and incentive programs, and tax-saving strategies coordinated with qualified accounting professionals.',
    heroTitle: 'Claim the incentives',
    heroHighlight: 'your business has earned',
    heroText:
      'Canadian businesses leave millions in SR&ED credits, government incentives and tax savings unclaimed every year. We find the opportunities that apply to you and coordinate with qualified tax professionals to help you capture them.',
    outcomes: [
      'SR&ED eligibility reviewed and claims supported',
      'Government credits and incentives identified',
      'Tax-saving opportunities uncovered',
      'Corporate tax planning coordinated with professionals',
    ],
    offerings: [
      {
        title: 'SR&ED Tax Incentive Consulting',
        description:
          'We assess whether your innovation and development work qualifies for the Scientific Research & Experimental Development program and help you prepare a strong, well-documented claim.',
      },
      {
        title: 'Government Tax Credits & Business Incentives',
        description:
          'Federal and provincial credits, hiring incentives and sector-specific programs — we identify what your business may qualify for.',
      },
      {
        title: 'Tax-Saving Opportunity Identification',
        description:
          'A structured review of your business and personal situation to surface deductions, credits and strategies you may be missing.',
      },
      {
        title: 'Corporate Tax Planning Coordination',
        description:
          'We work alongside your accountant, or ours, to align corporate tax planning with your growth and cash-flow goals.',
      },
      {
        title: 'Accounting & Tax-Professional Referrals',
        description:
          'Need a CPA, bookkeeper or tax specialist? We connect you with qualified professionals in our network.',
      },
    ],
    audiences: [
      {
        title: 'Innovative Businesses',
        description:
          'Tech, manufacturing, agri-food and other companies developing new products or processes that may qualify for SR&ED.',
      },
      {
        title: 'Growing Corporations',
        description:
          'Incorporated businesses that want proactive tax planning instead of surprises at year-end.',
      },
      {
        title: 'Owners Without a Tax Plan',
        description:
          'Business owners who suspect they are paying too much but are not sure where the opportunities are.',
      },
    ],
    steps: [
      { title: 'Opportunity Review', description: 'We learn about your business, activities and current tax position.' },
      { title: 'Identify Incentives', description: 'We pinpoint SR&ED, credits and savings that may apply to you.' },
      { title: 'Coordinate & Claim', description: 'We prepare documentation and coordinate with qualified tax professionals.' },
      { title: 'Plan Ahead', description: 'Ongoing planning so you capture every eligible incentive year after year.' },
    ],
    faqs: [
      {
        question: 'What is SR&ED?',
        answer:
          'The Scientific Research and Experimental Development program is a federal tax incentive that rewards Canadian businesses for work that advances technology or resolves technical uncertainty. Eligible businesses can receive refundable or non-refundable tax credits.',
      },
      {
        question: 'Does my business qualify for SR&ED?',
        answer:
          'Many businesses qualify without realizing it — it is not limited to labs. If you develop or improve products, processes or software and solve technical problems along the way, it is worth a review.',
      },
      {
        question: 'Do you file tax returns?',
        answer:
          'We focus on strategy, incentive identification and claim support. Filing and formal tax advice are handled by qualified accountants and tax professionals we coordinate with.',
      },
    ],
    formTitle: 'Book your free tax & incentive review',
    formOptionsLabel: 'What are you most interested in?',
    formOptions: [
      'SR&ED tax credits',
      'Government credits & incentives',
      'Lowering my tax bill',
      'Corporate tax planning',
      'Referral to an accountant / tax professional',
    ],
  },
  {
    slug: 'debt',
    path: '/debt-solutions',
    name: 'Debt Solutions & Financial Wellness',
    shortName: 'Debt & Wellness',
    icon: HeartPulse,
    tagline: 'Less debt, stronger credit',
    summary:
      'Personalized debt-management strategies, budgeting guidance and credit improvement plans — with referrals to the right debt-relief providers when needed.',
    heroTitle: 'Take control of your debt and',
    heroHighlight: 'rebuild your financial health',
    heroText:
      'Debt and credit problems feed each other. We assess your full financial picture, build a realistic plan to reduce what you owe, and help you rebuild the credit history that opens doors again.',
    outcomes: [
      'A clear picture of everything you owe',
      'A personalized debt-management strategy',
      'A plan to improve and rebuild your credit',
      'The right referrals when you need formal relief',
    ],
    offerings: [
      {
        title: 'Personalized Debt-Management Strategies',
        description:
          'A plan built around your balances, rates and income — consolidation, payoff order and negotiation options explained clearly.',
      },
      {
        title: 'Financial Assessments & Budgeting Guidance',
        description:
          'A full review of your income, spending and obligations, plus a practical budget you can actually stick to.',
      },
      {
        title: 'Credit Profile Reviews & Improvement',
        description:
          'We walk through your credit report with you, flag errors and prioritize the actions that improve your score most.',
      },
      {
        title: 'Building Stronger Credit Histories',
        description:
          'Guidance on the right accounts, utilization and payment habits to build a credit history lenders trust.',
      },
      {
        title: 'Understanding Collections & Obligations',
        description:
          'Collection calls and letters are stressful. We help you understand what you owe, your rights and your next steps.',
      },
      {
        title: 'Debt-Relief & Financial Service Referrals',
        description:
          'When you need credit counselling, a consumer proposal or other formal relief, we refer you to appropriate licensed providers.',
      },
    ],
    audiences: [
      {
        title: 'Overwhelmed Households',
        description:
          'Credit cards, loans and lines of credit piling up — we bring order and a clear plan.',
      },
      {
        title: 'Rebuilding After Setbacks',
        description:
          'Late payments, collections or a past insolvency do not have to define your financial future.',
      },
      {
        title: 'Planning a Big Move',
        description:
          'Getting ready for a mortgage, vehicle or business financing and want your finances in shape first.',
      },
    ],
    steps: [
      { title: 'Financial Assessment', description: 'We review your income, debts, budget and credit report.' },
      { title: 'Personal Strategy', description: 'A clear plan for debt reduction and credit improvement.' },
      { title: 'Take Action', description: 'We guide you through each step and make referrals where needed.' },
      { title: 'Stay on Track', description: 'Regular check-ins as your debt goes down and your credit goes up.' },
    ],
    faqs: [
      {
        question: 'Will working with you hurt my credit?',
        answer:
          'Our assessments and planning do not affect your credit. Some debt strategies can have short-term effects; we explain every trade-off before you decide.',
      },
      {
        question: 'Can you remove negative items from my credit report?',
        answer:
          'No one can legally remove accurate, timely information. We help you dispute genuine errors and build positive history that outweighs past setbacks.',
      },
      {
        question: 'Are you a licensed insolvency trustee?',
        answer:
          'No. When a consumer proposal, bankruptcy or formal credit counselling is the right path, we refer you to appropriate licensed professionals.',
      },
    ],
    formTitle: 'Get your free financial assessment',
    formOptionsLabel: 'What would you like help with?',
    formOptions: [
      'Reducing my debt',
      'Improving my credit',
      'Budgeting & financial planning',
      'Dealing with collections',
      'All of the above',
    ],
  },
  {
    slug: 'restructuring',
    path: '/corporate-restructuring',
    name: 'Corporate Restructuring & Business Solutions',
    shortName: 'Restructuring',
    icon: Building2,
    tagline: 'Stabilize and strengthen your business',
    summary:
      'Corporate debt and restructuring strategies, business financial assessments and cash-flow improvement — coordinated with qualified lawyers and CPAs.',
    heroTitle: 'Restructure today for',
    heroHighlight: 'a stronger business tomorrow',
    heroText:
      'When corporate debt, tight cash flow or a complex structure are holding your business back, you need a clear strategy and the right professionals at the table. We assess your position and coordinate the experts to fix it.',
    outcomes: [
      'A clear assessment of your financial position',
      'A strategy for corporate debt and restructuring',
      'Improved cash flow and stability',
      'Qualified lawyers and CPAs coordinated for you',
    ],
    offerings: [
      {
        title: 'Corporate Debt & Restructuring Strategies',
        description:
          'Options to reorganize obligations, renegotiate terms and restore stability to an over-leveraged business.',
      },
      {
        title: 'Business Financial Assessments',
        description:
          'An objective review of your statements, obligations and cash position so decisions are based on facts.',
      },
      {
        title: 'Cash-Flow & Financial-Position Improvement',
        description:
          'Identify leaks, tighten terms and free up working capital to strengthen your balance sheet.',
      },
      {
        title: 'Coordination with Lawyers & CPAs',
        description:
          'We bring in qualified tax lawyers, business lawyers and CPAs and keep everyone aligned on one strategy.',
      },
      {
        title: 'Corporate Structure & Succession Referrals',
        description:
          'Holding companies, reorganizations and succession plans — referred to the right specialists for your situation.',
      },
    ],
    audiences: [
      {
        title: 'Businesses Under Pressure',
        description:
          'Rising debt, creditor pressure or shrinking margins and a need for a clear way forward.',
      },
      {
        title: 'Owners Planning Ahead',
        description:
          'Thinking about succession, selling, or reorganizing your corporate structure.',
      },
      {
        title: 'Complex Situations',
        description:
          'Multiple entities, tax exposure or legal questions that need several professionals working together.',
      },
    ],
    steps: [
      { title: 'Confidential Consultation', description: 'We discuss your business, obligations and goals.' },
      { title: 'Financial Assessment', description: 'We analyze your financial position and pressure points.' },
      { title: 'Restructuring Strategy', description: 'A clear plan with the right legal and accounting professionals involved.' },
      { title: 'Execute & Stabilize', description: 'We coordinate the plan and monitor progress to keep you on track.' },
    ],
    faqs: [
      {
        question: 'Do you provide legal or accounting advice?',
        answer:
          'No. We provide strategy and coordination. Legal and accounting advice comes from qualified tax lawyers, business lawyers and CPAs we work with.',
      },
      {
        question: 'Is it too late if creditors are already calling?',
        answer:
          'Not necessarily. The earlier you act, the more options you have — reach out as soon as possible for a confidential review.',
      },
      {
        question: 'Is this confidential?',
        answer: 'Yes. Everything you share with us is kept strictly confidential.',
      },
    ],
    formTitle: 'Request a confidential business review',
    formOptionsLabel: 'What is your main concern?',
    formOptions: [
      'Corporate debt',
      'Cash flow',
      'Corporate structure',
      'Succession planning',
      'Need a lawyer / CPA referral',
    ],
  },
  {
    slug: 'growth',
    path: '/business-growth',
    name: 'Business Growth & Strategy',
    shortName: 'Business Growth',
    icon: Rocket,
    tagline: 'Strategy, grants and financing to scale',
    summary:
      'Growth and operational consulting, strategic planning, grants and incentives, and financing referrals with application preparation.',
    heroTitle: 'Grow your business with',
    heroHighlight: 'strategy and capital',
    heroText:
      'Growth takes the right plan, sound financials and access to capital. We help you sharpen operations, find grants and incentives, and prepare strong financing applications through our network of partners.',
    outcomes: [
      'A growth plan built around your numbers',
      'Grants and incentives identified',
      'Financing applications prepared properly',
      'Support from startup through expansion',
    ],
    offerings: [
      {
        title: 'Growth & Operational Consulting',
        description:
          'Practical advice on operations, pricing, margins and systems so your business can scale efficiently.',
      },
      {
        title: 'Strategic Planning & Financial Analysis',
        description:
          'Clear goals, a realistic roadmap and the financial analysis to back every decision.',
      },
      {
        title: 'Business Grants & Incentive Opportunities',
        description:
          'We identify grants and government programs your business may qualify for and help you apply.',
      },
      {
        title: 'Financing Referrals & Application Preparation',
        description:
          'We prepare you for lenders and connect you with financing partners in our network suited to your needs.',
      },
      {
        title: 'Startup & Expansion Support',
        description:
          'From launching a new venture to opening a new location — structure, planning and funding guidance at every stage.',
      },
    ],
    audiences: [
      {
        title: 'Startups',
        description: 'Building from the ground up and want to do it right from day one.',
      },
      {
        title: 'Established Businesses',
        description: 'Ready to expand, hire or take on bigger contracts and need a plan and capital.',
      },
      {
        title: 'Owners Seeking Funding',
        description: 'Looking for grants or financing and want a strong, well-prepared application.',
      },
    ],
    steps: [
      { title: 'Discovery Call', description: 'Tell us about your business, revenue and goals.' },
      { title: 'Strategy & Analysis', description: 'We review your numbers and map out a growth plan.' },
      { title: 'Grants & Financing', description: 'We identify programs and prepare your applications.' },
      { title: 'Grow', description: 'Execute the plan with ongoing support as you scale.' },
    ],
    faqs: [
      {
        question: 'Are you a lender?',
        answer:
          'No. We refer you to financing partners in our network and help you prepare your application. Approval and terms are set by the lender.',
      },
      {
        question: 'Can you help me find grants?',
        answer:
          'Yes. We identify government grants and incentive programs your business may be eligible for and help you prepare applications.',
      },
      {
        question: 'Do you work with startups?',
        answer:
          'Absolutely. We support businesses from the idea stage through expansion.',
      },
    ],
    formTitle: 'Book your free growth strategy session',
    formOptionsLabel: 'What are you looking for?',
    formOptions: [
      'Growth & operations consulting',
      'Strategic planning',
      'Grants & incentives',
      'Financing',
      'Startup support',
    ],
  },
];

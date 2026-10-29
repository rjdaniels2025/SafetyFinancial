import { Scale, Landmark, Compass, type LucideIcon } from 'lucide-react';

export interface CoreService {
  slug: string;
  path: string;
  title: string;
  navLabel: string;
  summary: string;
  cta: string;
  icon: LucideIcon;
  tagline: string;
  highlights: string[];
}

/** The three core service categories. Order here drives the homepage, navigation and footer. */
export const coreServices: CoreService[] = [
  {
    slug: 'debt',
    path: '/debt-solutions',
    title: 'Debt Solutions & Credit Counselling',
    navLabel: 'Debt Solutions',
    summary:
      'Comprehensive credit analysis, debt-resolution consulting, collection-related support, and personalized financial guidance to help clients understand their options and navigate financial challenges.',
    cta: 'Explore Debt Solutions',
    icon: Scale,
    tagline: 'Credit analysis and debt-resolution consulting',
    highlights: ['Credit report analysis', 'Debt-resolution consulting', 'Collection-related support', 'Credit education'],
  },
  {
    slug: 'funding',
    path: '/business-funding',
    title: 'Business Funding Solutions',
    navLabel: 'Business Funding',
    summary:
      'Business financing opportunities, lines of credit, lending options, grant programs, and strategic guidance tailored to business needs and eligibility.',
    cta: 'Explore Funding Solutions',
    icon: Landmark,
    tagline: 'Financing options, grants and funding readiness',
    highlights: ['Loans & lines of credit', 'Working capital', 'Grants & incentives', 'Financing readiness'],
  },
  {
    slug: 'strategies',
    path: '/financial-strategies',
    title: 'Corporate & Personal Financial Strategies',
    navLabel: 'Financial Strategies',
    summary:
      'Integrated financial planning for individuals, families, entrepreneurs, and corporations, covering corporate restructuring, corporate financial strategies, tax-planning coordination, financial protection, retirement planning, and long-term wealth objectives.',
    cta: 'Explore Financial Strategies',
    icon: Compass,
    tagline: 'Restructuring, tax, protection, retirement and wealth planning',
    highlights: ['Corporate restructuring', 'Corporate & tax strategies', 'Protection & legacy', 'Retirement & wealth'],
  },
];

/** Subsections of the Financial Strategies page, used for anchors and the navigation dropdown. */
export const strategySections = [
  { id: 'corporate-restructuring', title: 'Corporate Restructuring & Asset Protection', short: 'Restructuring' },
  { id: 'corporate-tax', title: 'Corporate Financial & Tax Strategies', short: 'Corporate & Tax' },
  { id: 'corporate-protection', title: 'Corporate Protection & Legacy Planning', short: 'Corporate Protection' },
  { id: 'personal-protection', title: 'Personal Financial Protection', short: 'Personal Protection' },
  { id: 'wealth-retirement', title: 'Wealth, Retirement & Financial Architecture', short: 'Wealth & Retirement' },
];

export const serviceOfInterestOptions = [
  'Debt Solutions & Credit Counselling',
  'Business Funding Solutions',
  'Corporate Restructuring, Trusts & Estate Freezes',
  'Corporate Financial & Tax Strategies',
  'Corporate Protection & Corporate Life Insurance',
  'Personal Financial Protection',
  'Wealth, Retirement & Financial Architecture',
  'Not sure yet',
];

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
    tagline: 'Corporate restructuring, tax, protection, retirement and wealth planning',
    highlights: ['Corporate restructuring', 'Corporate & tax strategies', 'Protection & legacy', 'Retirement & wealth'],
  },
];

/** Subsections of the Financial Strategies page, used for anchors and the navigation dropdown. */
export const strategySections = [
  { id: 'corporate-restructuring', title: 'Corporate Restructuring', short: 'Corporate Restructuring' },
  { id: 'corporate-tax', title: 'Corporate Financial & Tax Strategies', short: 'Corporate & Tax' },
  { id: 'corporate-protection', title: 'Corporate Protection & Legacy Planning', short: 'Corporate Protection' },
  { id: 'group-benefits', title: 'Group Benefits for Business Owners', short: 'Group Benefits' },
  { id: 'personal-protection', title: 'Personal Financial Protection', short: 'Personal Protection' },
  { id: 'wealth-retirement', title: 'Wealth, Retirement & Financial Architecture', short: 'Wealth & Retirement' },
];

/** The mortgage and private lending referral page. Not a core service: WeWin only introduces clients to
 * licensed partners (see the Disclosures page). */
export const mortgagePage = {
  path: '/mortgages',
  title: 'Mortgage & Private Lending',
  navLabel: 'Mortgages',
  blurb: 'Referrals to licensed mortgage professionals and private lending partners',
};

/** In-depth guide pages that sit under Financial Strategies. */
export const strategyGuides = [
  {
    path: '/financial-strategies/corporate-structure',
    title: 'Corporate Structure',
    blurb: 'Operating companies, holding companies and family trusts',
  },
  {
    path: '/financial-strategies/estate-freeze',
    title: 'Estate Freezes',
    blurb: 'Fix the tax on death at today\'s value',
  },
  {
    path: '/financial-strategies/family-trusts',
    title: 'Family Trusts',
    blurb: 'Settlors, trustees, beneficiaries and the 21-year rule',
  },
  {
    path: '/financial-strategies/corporate-life-insurance',
    title: 'Corporate Life Insurance',
    blurb: 'Corporate-owned coverage and the Capital Dividend Account',
  },
];

export const serviceOfInterestOptions = [
  'Debt Solutions & Credit Counselling',
  'Business Funding Solutions',
  'Mortgage & Private Lending Referrals',
  'Corporate Restructuring',
  'Corporate Financial & Tax Strategies',
  'Corporate Protection & Corporate Life Insurance',
  'Group Benefits for Business Owners',
  'Personal Financial Protection',
  'Wealth, Retirement & Financial Architecture',
  'Not sure yet',
];

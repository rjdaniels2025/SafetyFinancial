/**
 * Debt Solutions service packages.
 * Leave `price` empty until pricing is confirmed — the site then shows
 * "Pricing confirmed during your consultation" instead of a figure.
 */
export interface ServicePackage {
  name: string;
  description: string;
  includes: string[];
  price: string; // e.g. '$499' — leave empty until confirmed
  priceNote: string; // e.g. 'one-time fee' or 'payable in two instalments'
}

export const debtPackages: ServicePackage[] = [
  {
    name: 'Full Credit Analysis & Debt Resolution Consulting',
    description:
      "A detailed review of the client's credit profile and outstanding debt concerns, followed by a consultation on potential resolution options.",
    includes: [
      'Comprehensive credit report analysis',
      'Review of accounts, balances, payment history and reported delinquencies',
      'Identification of potential credit-reporting discrepancies',
      'Review of findings and potential resolution options',
      'Follow-up and review of next steps',
    ],
    price: '',
    priceNote: '',
  },
  {
    name: 'Full Credit Analysis, Debt Resolution & Collection Resolution Consulting',
    description:
      'Includes the comprehensive credit analysis and debt-resolution consultation, with additional consulting support for eligible collection-related matters.',
    includes: [
      'Everything in Full Credit Analysis & Debt Resolution Consulting',
      'Additional consulting support for eligible collection-related matters',
      'Collection-related resolution support, where permitted',
    ],
    price: '',
    priceNote: '',
  },
];

/** Shown beneath the packages. Update to reflect your service agreement. */
export const packageTerms = {
  exclusions: [
    'No guarantee of any particular credit score change',
    'No removal of accurate, timely negative information',
    'No removal or cancellation of legitimate debts',
    'No guarantee that a creditor or collector will accept a proposed arrangement',
    'Legal advice, insolvency proceedings (such as consumer proposals or bankruptcy) and lending are not included and are referred to qualified professionals',
  ],
  payment:
    'Fees, payment arrangements and any cancellation or refund terms are set out in a written service agreement that you review and accept before any paid work begins.',
};

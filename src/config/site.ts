/**
 * Central business settings. Anything left empty is hidden on the site,
 * so nothing unverified is ever displayed. Fill these in as details are confirmed.
 */
export const site = {
  name: 'WeWin Consulting Group',
  shortName: 'WeWin',
  descriptor: 'Consulting Group',
  description:
    'WeWin Consulting Group helps individuals, families, entrepreneurs and corporations navigate financial challenges, explore funding opportunities and develop tailored financial strategies.',

  // Public URL used for canonical links, sitemap and social previews.
  // Override at build time with the VITE_SITE_URL environment variable.
  url: (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://safetyfinancial.vercel.app',

  contact: {
    email: '', // e.g. 'info@wewinconsulting.ca'
    phone: '', // e.g. '(416) 555-0100'
    address: '', // e.g. 'Toronto, Ontario'
    hours: '', // e.g. 'Monday–Friday, 9:00 a.m.–5:00 p.m. ET'
  },

  // Optional online scheduler (Calendly, Microsoft Bookings, etc.).
  // When set, the Contact page shows a "Schedule online" option.
  bookingUrl: '',

  // Optional photography. Place files in /public/images and set the path here,
  // e.g. '/images/hero.jpg'. When empty, a brand illustration is shown instead.
  images: {
    hero: '',
    about: '',
  },

  // Province(s) of operation, used in legal pages.
  jurisdiction: '', // e.g. 'Ontario'

  legalUpdated: 'October 20, 2026',
};

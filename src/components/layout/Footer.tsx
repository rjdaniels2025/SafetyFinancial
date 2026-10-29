import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { site } from '../../config/site';
import { coreServices } from '../../data/services';

export default function Footer() {
  const { email, phone, address, hours } = site.contact;
  const hasContact = Boolean(email || phone || address || hours);

  return (
    <footer className="pb-safe bg-ink text-paper/70 lg:pb-0">
      <div className="container-page py-12 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-12 md:gap-12">
          <div className="col-span-2 md:col-span-4">
            <Logo reversed />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Financial consulting for individuals, families, entrepreneurs and corporations in Canada.
            </p>
          </div>

          <div className="col-span-2 md:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-accent-light">Solutions</h2>
            <ul className="mt-2 text-sm sm:mt-4 sm:space-y-2.5">
              {coreServices.map((s) => (
                <li key={s.slug}>
                  <Link to={s.path} className="inline-block py-2.5 hover:text-paper sm:py-0">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/financial-strategies/corporate-life-insurance" className="inline-block py-2.5 hover:text-paper sm:py-0">
                  Corporate Life Insurance
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-accent-light">Firm</h2>
            <ul className="mt-2 text-sm sm:mt-4 sm:space-y-2.5">
              <li><Link to="/about" className="inline-block py-2.5 hover:text-paper sm:py-0">About Us</Link></li>
              <li><Link to="/contact" className="inline-block py-2.5 hover:text-paper sm:py-0">Contact</Link></li>
              <li><Link to="/privacy" className="inline-block py-2.5 hover:text-paper sm:py-0">Privacy Policy</Link></li>
              <li><Link to="/terms" className="inline-block py-2.5 hover:text-paper sm:py-0">Terms of Service</Link></li>
              <li><Link to="/disclosures" className="inline-block py-2.5 hover:text-paper sm:py-0">Disclosures</Link></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-accent-light">Contact</h2>
            {hasContact ? (
              <ul className="mt-2 text-sm sm:mt-4 sm:space-y-2.5">
                {phone && <li><a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="inline-block py-2.5 hover:text-paper sm:py-0">{phone}</a></li>}
                {email && <li><a href={`mailto:${email}`} className="inline-block py-2.5 hover:text-paper sm:py-0">{email}</a></li>}
                {address && <li>{address}</li>}
                {hours && <li>{hours}</li>}
              </ul>
            ) : (
              <p className="mt-4 text-sm">
                <Link to="/contact" className="underline decoration-accent underline-offset-4 hover:text-paper">
                  Send us a message
                </Link>{' '}
                and a member of our team will be in touch.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-paper/10 pt-8 sm:mt-14 text-xs leading-relaxed text-paper/65">
          <p>
            {site.name} provides financial consulting, education and referral services. We are not a lender, mortgage
            brokerage, credit bureau, licensed insolvency trustee, law firm or accounting firm. Financing is subject to
            lender approval; grants are subject to program eligibility; insurance is subject to underwriting; and debt-resolution
            outcomes depend on individual circumstances. Regulated insurance, investment, legal, tax, actuarial and insolvency
            services are provided only by appropriately licensed professionals. Referral arrangements are disclosed where
            required. See our{' '}
            <Link to="/disclosures" className="underline underline-offset-2 hover:text-paper">
              full disclosures
            </Link>
            .
          </p>
          <p className="mt-4">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

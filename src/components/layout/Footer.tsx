import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { site } from '../../config/site';
import { coreServices } from '../../data/services';

export default function Footer() {
  const { email, phone, address, hours } = site.contact;
  const hasContact = Boolean(email || phone || address || hours);

  return (
    <footer className="bg-ink text-paper/70">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo reversed />
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Financial consulting for individuals, families, entrepreneurs and corporations in Canada.
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-brass-light">Solutions</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {coreServices.map((s) => (
                <li key={s.slug}>
                  <Link to={s.path} className="hover:text-paper">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/financial-strategies/corporate-life-insurance" className="hover:text-paper">
                  Corporate Life Insurance
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-brass-light">Firm</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-paper">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-paper">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-paper">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-paper">Terms of Service</Link></li>
              <li><Link to="/disclosures" className="hover:text-paper">Disclosures</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-brass-light">Contact</h2>
            {hasContact ? (
              <ul className="mt-4 space-y-2.5 text-sm">
                {phone && <li><a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="hover:text-paper">{phone}</a></li>}
                {email && <li><a href={`mailto:${email}`} className="hover:text-paper">{email}</a></li>}
                {address && <li>{address}</li>}
                {hours && <li>{hours}</li>}
              </ul>
            ) : (
              <p className="mt-4 text-sm">
                <Link to="/contact" className="underline decoration-brass underline-offset-4 hover:text-paper">
                  Send us a message
                </Link>{' '}
                and a member of our team will be in touch.
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 border-t border-paper/10 pt-8 text-xs leading-relaxed text-paper/55">
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

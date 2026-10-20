import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { services } from '../data/services';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-slate-800 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-lg font-bold text-white">We Win Consultancy Group</span>
            </div>
            <p className="text-sm leading-relaxed">
              Tax strategy and business incentives, debt solutions, corporate restructuring and business
              growth for Canadian business owners and individuals.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={s.path} className="hover:text-emerald-300 transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/#about" className="hover:text-emerald-300 transition-colors">About</Link></li>
              <li><Link to="/#contact" className="hover:text-emerald-300 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-xs leading-relaxed space-y-3">
          <p>
            We Win Consultancy Group provides financial strategy, consulting, education and referral services.
            We are not a lender, law firm, accounting firm, licensed insolvency trustee or credit bureau. Where
            accounting, tax filing, legal, credit counselling, insolvency or lending services are required, they
            are provided by qualified third-party professionals in our network and are subject to their own
            eligibility requirements and terms. Eligibility for SR&amp;ED, grants and other incentives is determined
            by the administering government program. Results vary by individual
            circumstances.
          </p>
          <p>© {new Date().getFullYear()} We Win Consultancy Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

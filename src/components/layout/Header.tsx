import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';
import Button from '../ui/Button';
import { coreServices, strategySections } from '../../data/services';

const strategiesPath = '/financial-strategies';
const strategyLinks = [
  ...strategySections.map((s) => ({ to: `${strategiesPath}#${s.id}`, label: s.title })),
  { to: `${strategiesPath}/corporate-life-insurance`, label: 'Corporate Life Insurance' },
];

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close menus whenever the route changes
  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!dropdown) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setDropdown(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDropdown(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [dropdown]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${
      isActive ? 'text-ink' : 'text-ink/65 hover:text-ink'
    }`;

  const [debt, funding, strategies] = coreServices;
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-line bg-paper/95 backdrop-blur' : 'border-transparent bg-paper'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" aria-label="WeWin Consulting Group home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
          <NavLink to={debt.path} className={linkClass}>
            {debt.navLabel}
          </NavLink>
          <NavLink to={funding.path} className={linkClass}>
            {funding.navLabel}
          </NavLink>
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              aria-expanded={dropdown}
              aria-haspopup="true"
              onClick={() => setDropdown((d) => !d)}
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${
                location.pathname.startsWith(strategiesPath) ? 'text-ink' : 'text-ink/65 hover:text-ink'
              }`}
            >
              {strategies.navLabel}
              <ChevronDown className={`h-4 w-4 transition-transform ${dropdown ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            {dropdown && (
              <div className="absolute left-1/2 top-full mt-2 w-80 -translate-x-1/2 rounded-lg border border-line bg-white p-2 shadow-lift">
                <Link to={strategiesPath} className="block rounded-md px-3 py-2.5 text-sm font-semibold text-ink hover:bg-paper">
                  Overview
                </Link>
                <div className="my-1 h-px bg-line" />
                {strategyLinks.map((l) => (
                  <Link key={l.to} to={l.to} className="block rounded-md px-3 py-2.5 text-sm text-ink/75 hover:bg-paper hover:text-ink">
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="hidden lg:block">
          <Button to="/contact" className="px-5 py-2.5 text-sm">
            Book a Consultation
          </Button>
        </div>

        <button
          type="button"
          className="rounded-md p-2 text-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden">
          <div className="container-page space-y-1 py-4">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Us' },
              { to: debt.path, label: debt.navLabel },
              { to: funding.path, label: funding.navLabel },
              { to: strategiesPath, label: strategies.navLabel },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="block rounded-md px-3 py-3 text-[15px] font-medium text-ink hover:bg-paper-dark">
                {l.label}
              </Link>
            ))}
            <div className="ml-3 border-l border-line pl-3">
              {strategyLinks.map((l) => (
                <Link key={l.to} to={l.to} className="block rounded-md px-3 py-2 text-sm text-ink/70 hover:bg-paper-dark">
                  {l.label}
                </Link>
              ))}
            </div>
            <Link to="/contact" className="block rounded-md px-3 py-3 text-[15px] font-medium text-ink hover:bg-paper-dark">
              Contact
            </Link>
            <div className="pt-3">
              <Button to="/contact" className="w-full">
                Book a Consultation
              </Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

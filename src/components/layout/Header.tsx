import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Mail, Menu, Phone, X } from 'lucide-react';
import Logo from '../ui/Logo';
import { setScrollLocked } from '../../lib/smoothScroll';
import { useHasDarkHero } from '../../lib/darkHero';
import Button from '../ui/Button';
import { coreServices, mortgagePage, strategyGuides, strategySections } from '../../data/services';
import { site } from '../../config/site';

const strategiesPath = '/financial-strategies';
const strategyLinks = strategySections.map((s) => ({ to: `${strategiesPath}#${s.id}`, label: s.title }));

export default function Header() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(false);
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

  // Keep the page behind the full-screen mobile menu from scrolling
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setScrollLocked(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      setScrollLocked(false);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

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

  const [debt, funding, strategies] = coreServices;
  const solid = scrolled || open;
  // Over a dark hero the header starts transparent with light text, and turns solid once the visitor scrolls
  const overDark = useHasDarkHero() && !solid;
  const { phone, email } = site.contact;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative whitespace-nowrap rounded-md px-3 py-2 text-[14px] font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-[1px] after:h-px after:origin-center after:transition-transform after:duration-300 after:ease-brand ${
      overDark ? 'after:bg-accent-light' : 'after:bg-accent'
    } ${
      isActive
        ? `${overDark ? 'text-paper' : 'text-ink'} after:scale-x-100`
        : `${overDark ? 'text-paper/70 hover:text-paper' : 'text-ink/65 hover:text-ink'} after:scale-x-0 hover:after:scale-x-100`
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between border-b border-line py-4 font-serif text-[1.35rem] font-semibold ${
      isActive ? 'text-accent-dark' : 'text-ink'
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          solid
            ? 'border-line/80 bg-paper/85 shadow-[0_8px_30px_-18px_rgba(18,58,38,0.25)] backdrop-blur-md'
            : overDark
              ? 'border-transparent bg-transparent'
              : 'border-transparent bg-paper'
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <div className="container-page flex h-16 items-center justify-between lg:h-20">
          <Link to="/" aria-label="WeWin Consulting Group home" className="-ml-1 rounded p-1">
            <Logo reversed={overDark} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:flex">
            {/* No "Home" link here: the logo goes home, and the row needs the room */}
            <NavLink to="/about" className={linkClass}>
              About Us
            </NavLink>
            <NavLink to={debt.path} className={linkClass}>
              {debt.navLabel}
            </NavLink>
            <NavLink to={funding.path} className={linkClass}>
              {funding.navLabel}
            </NavLink>
            <NavLink to={mortgagePage.path} className={linkClass}>
              {mortgagePage.navLabel}
            </NavLink>
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                aria-expanded={dropdown}
                aria-haspopup="true"
                onClick={() => setDropdown((d) => !d)}
                className={`flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-[14px] font-medium transition-colors ${
                  overDark
                    ? location.pathname.startsWith(strategiesPath)
                      ? 'text-paper'
                      : 'text-paper/70 hover:text-paper'
                    : location.pathname.startsWith(strategiesPath)
                      ? 'text-ink'
                      : 'text-ink/65 hover:text-ink'
                }`}
              >
                {strategies.navLabel}
                <ChevronDown className={`h-4 w-4 transition-transform ${dropdown ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {dropdown && (
                <div className="absolute left-1/2 top-full mt-3 w-[40rem] -translate-x-1/2">
                  {/* Inner wrapper animates so its transform doesn't fight the centring above */}
                  <div className="animate-pop grid grid-cols-2 gap-2 rounded-2xl border border-line bg-white p-2 shadow-float">
                    <div>
                      <Link to={strategiesPath} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-paper">
                        <span className="block text-sm font-semibold text-ink">Financial Strategies overview</span>
                        <span className="mt-0.5 block text-xs text-muted">Corporate and personal planning in one place</span>
                      </Link>
                      <div className="my-1.5 h-px bg-line" />
                      {strategyLinks.map((l) => (
                        <Link
                          key={l.to}
                          to={l.to}
                          className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink/75 transition-colors hover:bg-paper hover:text-ink"
                        >
                          <span className="h-px w-0 bg-accent transition-all duration-300 ease-brand group-hover:w-3" aria-hidden="true" />
                          {l.label}
                        </Link>
                      ))}
                    </div>
                    <div className="rounded-xl bg-paper p-2">
                      <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-eyebrow text-accent-dark">In-depth guides</p>
                      {strategyGuides.map((g) => (
                        <Link key={g.path} to={g.path} className="block rounded-lg px-3 py-2 transition-colors hover:bg-white">
                          <span className="block text-sm font-semibold text-ink">{g.title}</span>
                          <span className="mt-0.5 block text-xs text-muted">{g.blurb}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <NavLink to="/contact" className={linkClass}>
              Contact
            </NavLink>
          </nav>

          <div className="hidden xl:block">
            <Button to="/contact" size="sm" variant={overDark ? 'light' : 'primary'}>
              Book a Consultation
            </Button>
          </div>

          <button
            type="button"
            className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-md xl:hidden ${overDark ? 'text-paper' : 'text-ink'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </header>

      {/* Rendered outside <header>: its backdrop blur would otherwise contain this fixed panel and collapse it */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="fixed inset-x-0 bottom-0 top-16 z-50 flex animate-[reveal-fade_0.25s_ease-out_both] flex-col overflow-y-auto bg-paper lg:top-20 xl:hidden"
        >
          <div className="container-page flex-1 pt-2 [&>*]:animate-[reveal-left_0.5s_cubic-bezier(0.22,1,0.36,1)_both] [&>*:nth-child(2)]:[animation-delay:40ms] [&>*:nth-child(3)]:[animation-delay:80ms] [&>*:nth-child(4)]:[animation-delay:120ms] [&>*:nth-child(5)]:[animation-delay:160ms] [&>*:nth-child(6)]:[animation-delay:200ms]">
            <NavLink to="/" end className={mobileLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={mobileLinkClass}>
              About Us
            </NavLink>
            <NavLink to={debt.path} className={mobileLinkClass}>
              {debt.navLabel}
            </NavLink>
            <NavLink to={funding.path} className={mobileLinkClass}>
              {funding.navLabel}
            </NavLink>
            <NavLink to={mortgagePage.path} className={mobileLinkClass}>
              {mortgagePage.title}
            </NavLink>

            <div className="border-b border-line">
              <button
                type="button"
                aria-expanded={mobileSubmenu}
                onClick={() => setMobileSubmenu((s) => !s)}
                className={`flex w-full items-center justify-between py-4 text-left font-serif text-[1.35rem] font-semibold ${
                  location.pathname.startsWith(strategiesPath) ? 'text-accent-dark' : 'text-ink'
                }`}
              >
                {strategies.navLabel}
                <ChevronDown className={`h-5 w-5 transition-transform ${mobileSubmenu ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              {mobileSubmenu && (
                <div className="-mt-1 animate-pop space-y-0.5 pb-4">
                  <Link to={strategiesPath} className="block rounded-md py-2.5 pl-3 text-[15px] font-semibold text-ink">
                    Overview
                  </Link>
                  {strategyLinks.map((l) => (
                    <Link key={l.to} to={l.to} className="block rounded-md py-2.5 pl-3 text-[15px] text-ink/75">
                      {l.label}
                    </Link>
                  ))}
                  <p className="pb-1 pl-3 pt-4 text-[11px] font-semibold uppercase tracking-eyebrow text-accent-dark">In-depth guides</p>
                  {strategyGuides.map((g) => (
                    <Link key={g.path} to={g.path} className="block rounded-md py-2.5 pl-3 text-[15px] text-ink/75">
                      {g.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/contact" className={mobileLinkClass}>
              Contact
            </NavLink>
          </div>

          <div
            className="container-page space-y-4 border-t border-line bg-white py-5"
            style={{ paddingBottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
          >
            <Button to="/contact" className="w-full py-3.5" arrow>
              Book a Consultation
            </Button>
            {(phone || email) && (
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink/75">
                {phone && (
                  <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="flex items-center gap-2 py-1">
                    <Phone className="h-4 w-4" aria-hidden="true" /> {phone}
                  </a>
                )}
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-2 py-1">
                    <Mail className="h-4 w-4" aria-hidden="true" /> {email}
                  </a>
                )}
              </div>
            )}
            <p className="text-center text-xs text-muted">Confidential consultations · No obligation</p>
          </div>
        </nav>
      )}
    </>
  );
}

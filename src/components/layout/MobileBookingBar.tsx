import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { site } from '../../config/site';

/** Slim booking bar pinned to the bottom of the screen on phones and tablets, shown after the visitor starts scrolling. */
export default function MobileBookingBar() {
  const { pathname } = useLocation();
  const [scrolledPast, setScrolledPast] = useState(false);
  const [typing, setTyping] = useState(false);
  const phone = site.contact.phone;

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Step aside while someone is typing in a form so the bar doesn't crowd the on-screen keyboard
  useEffect(() => {
    const isField = (t: EventTarget | null) => t instanceof HTMLElement && t.matches('input, select, textarea');
    const onFocusIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onFocusOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  const visible = scrolledPast && !typing;

  // The contact page is the booking form itself
  if (pathname === '/contact') return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!visible}
    >
      <div className="container-page flex gap-3 py-3">
        {phone && (
          <a
            href={`tel:${phone.replace(/[^\d+]/g, '')}`}
            tabIndex={visible ? 0 : -1}
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-ink/20 text-ink"
            aria-label={`Call ${phone}`}
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
        )}
        <Link
          to="/contact"
          tabIndex={visible ? 0 : -1}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-ink text-[15px] font-semibold text-paper"
        >
          Book a Consultation
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

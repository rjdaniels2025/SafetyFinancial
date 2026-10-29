import { useSearchParams } from 'react-router-dom';
import { CalendarClock, Lock, MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import { PageHero } from '../components/ui/Sections';
import ConsultationForm from '../components/forms/ConsultationForm';
import { site } from '../config/site';
import usePageMeta from '../hooks/usePageMeta';

const expectations = [
  {
    icon: MessageSquare,
    title: 'A confidential conversation',
    text: 'We begin by listening. There is no obligation and no pressure to proceed.',
  },
  {
    icon: CalendarClock,
    title: 'Scheduled around you',
    text: 'Tell us your preferred contact method and time, and we will arrange your consultation.',
  },
  {
    icon: Lock,
    title: 'Your information is protected',
    text: 'If documents are needed later, we will arrange a secure method to share them.',
  },
];

export default function ContactPage() {
  const [params] = useSearchParams();
  usePageMeta(
    'Book a Consultation',
    'Book a confidential consultation with WeWin Consulting Group about debt solutions, business funding or corporate and personal financial strategies.',
    '/contact'
  );
  const { email, phone, address, hours } = site.contact;

  return (
    <>
      <PageHero eyebrow="Contact" title="Book a Consultation">
        Tell us a little about yourself and what you would like help with. A member of our team will be in touch to arrange
        a time to talk.
      </PageHero>

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="order-2 space-y-10 lg:order-1 lg:col-span-4">
            <div className="space-y-7">
              {expectations.map((e) => {
                const Icon = e.icon;
                return (
                  <div key={e.title} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-paper text-accent-dark">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-sans text-[15px] font-semibold">{e.title}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{e.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {site.bookingUrl && (
              <div className="rounded-2xl border border-line bg-paper p-6">
                <h2 className="text-lg font-semibold">Prefer to pick a time?</h2>
                <p className="mt-2 text-sm text-muted">Choose an available slot in our online calendar.</p>
                <Button href={site.bookingUrl} className="mt-4" arrow>
                  Schedule online
                </Button>
              </div>
            )}

            {(email || phone || address || hours) && (
              <div className="border-t border-line pt-8 text-sm leading-relaxed">
                <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-muted">Contact details</h2>
                <ul className="mt-4 space-y-2 text-ink/85">
                  {phone && <li><a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="hover:text-accent-dark">{phone}</a></li>}
                  {email && <li><a href={`mailto:${email}`} className="hover:text-accent-dark">{email}</a></li>}
                  {address && <li>{address}</li>}
                  {hours && <li>{hours}</li>}
                </ul>
              </div>
            )}
          </aside>

          <div className="order-1 -mx-4 border-y border-line bg-paper px-4 py-7 sm:mx-0 sm:rounded-2xl sm:border sm:p-10 lg:order-2 lg:col-span-8">
            <ConsultationForm defaultService={params.get('service') ?? ''} />
          </div>
        </div>
      </section>
    </>
  );
}

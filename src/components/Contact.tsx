import { Clock, Lock, MessageCircle } from 'lucide-react';
import InquiryForm from './InquiryForm';

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 text-white">
          <p className="text-emerald-300 font-semibold uppercase tracking-widest text-sm mb-3">Contact</p>
          <h2 className="text-4xl font-bold mb-6">Let's build your winning plan.</h2>
          <p className="text-lg text-slate-300 mb-10">
            Tell us where you are today and where you want to be. We'll reach out to schedule your free
            strategy call.
          </p>
          <div className="space-y-6">
            {[
              { icon: Clock, title: 'Fast response', text: 'We reply within one business day.' },
              { icon: Lock, title: 'Confidential', text: 'Your information stays private and secure.' },
              { icon: MessageCircle, title: 'No pressure', text: 'Honest advice, even if we are not the right fit.' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-emerald-300" />
                  </div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-slate-400">{item.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10">
          <InquiryForm
            dark
            formType="General Contact"
            optionsLabel="Main area of interest"
            options={[
              'Tax Solutions',
              'Debt Solutions',
              'Credit Building',
              'Business Growth & Funding',
              'Full financial review',
            ]}
            submitLabel="Send Message"
          />
        </div>
      </div>
    </section>
  );
}

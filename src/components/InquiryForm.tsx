import { useId, useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';

interface InquiryFormProps {
  formType: string;
  options?: string[];
  optionsLabel?: string;
  submitLabel?: string;
  dark?: boolean;
}

export default function InquiryForm({
  formType,
  options,
  optionsLabel,
  submitLabel = 'Request My Free Consultation',
  dark = false,
}: InquiryFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const id = useId();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const selection = formData.get('selection');

    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType,
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          businessName: formData.get('businessName') || undefined,
          message: formData.get('message'),
          form_answers: selection ? `${optionsLabel}: ${selection}` : undefined,
          website: formData.get('website'),
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSuccess(true);
      form.reset();
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    }

    setLoading(false);
  };

  const inputClass = `w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition ${
    dark
      ? 'bg-white/5 border-white/15 text-white placeholder-slate-400'
      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
  }`;
  const labelClass = `block text-sm font-medium mb-1.5 ${dark ? 'text-slate-200' : 'text-slate-700'}`;

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-9 h-9 text-emerald-600" />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>
          You're on the list!
        </h3>
        <p className={dark ? 'text-slate-300' : 'text-slate-600'}>
          A WeWin strategist will reach out within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
      <div>
        <label htmlFor={`${id}-name`} className={labelClass}>Full Name *</label>
        <input id={`${id}-name`} name="name" required placeholder="Jane Smith" className={inputClass} />
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className={labelClass}>Phone *</label>
        <input id={`${id}-phone`} name="phone" type="tel" required placeholder="(555) 123-4567" className={inputClass} />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className={labelClass}>Email *</label>
        <input id={`${id}-email`} name="email" type="email" required placeholder="jane@example.com" className={inputClass} />
      </div>
      <div>
        <label htmlFor={`${id}-businessName`} className={labelClass}>Business Name (optional)</label>
        <input id={`${id}-businessName`} name="businessName" placeholder="If applicable" className={inputClass} />
      </div>

      {options && (
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-selection`} className={labelClass}>{optionsLabel} *</label>
          <select id={`${id}-selection`} name="selection" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select one
            </option>
            {options.map((option) => (
              <option key={option} value={option} className="text-slate-900">
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="sm:col-span-2">
        <label htmlFor={`${id}-message`} className={labelClass}>Tell us a bit about your situation</label>
        <textarea id={`${id}-message`} name="message" rows={4} placeholder="Optional" className={`${inputClass} resize-none`} />
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:from-emerald-600 hover:to-emerald-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {loading ? 'Sending...' : submitLabel}
        </button>
        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
        <p className={`text-xs mt-3 text-center ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          Free, confidential and no obligation. We never sell your information.
        </p>
      </div>
    </form>
  );
}

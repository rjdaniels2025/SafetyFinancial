import { useState, type FormEvent } from 'react';
import {
  ConsentField,
  FormSuccess,
  Honeypot,
  SelectField,
  SensitiveInfoNote,
  SubmitRow,
  TextArea,
  TextField,
} from './Fields';
import { submitInquiry, useFormState } from './submit';

export default function FundingIntakeForm() {
  const { values, set } = useFormState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    stage: '',
    purpose: '',
    amount: '',
    revenue: '',
    credit: '',
    contactMethod: '',
    notes: '',
    website: '',
  });
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitInquiry(
        'Business Funding Intake',
        [
          { label: 'Name', value: values.name },
          { label: 'Email', value: values.email },
          { label: 'Phone', value: values.phone },
          { label: 'Business name', value: values.businessName },
          { label: 'Business type / industry', value: values.businessType },
          { label: 'Stage / time in operation', value: values.stage },
          { label: 'Financing purpose', value: values.purpose },
          { label: 'Requested funding range', value: values.amount },
          { label: 'Estimated annual revenue', value: values.revenue },
          { label: 'General credit profile', value: values.credit },
          { label: 'Preferred contact method', value: values.contactMethod },
          { label: 'Notes', value: values.notes },
          { label: 'Consent to contact', value: 'Yes' },
        ],
        values.website
      );
      setDone(true);
    } catch {
      setError('We could not send your inquiry. Please try again in a moment.');
    }
    setSubmitting(false);
  };

  if (done) {
    return (
      <FormSuccess title="Thank you — your funding inquiry has been received.">
        We will review your information and contact you to discuss potential options and any next steps.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-serif text-lg font-semibold">Contact details</legend>
        <TextField label="Full name" required value={values.name} onChange={set('name')} autoComplete="name" className="sm:col-span-2" />
        <TextField label="Email address" type="email" required value={values.email} onChange={set('email')} autoComplete="email" />
        <TextField label="Phone number" type="tel" required value={values.phone} onChange={set('phone')} autoComplete="tel" />
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-serif text-lg font-semibold">About the business</legend>
        <TextField label="Business name" required value={values.businessName} onChange={set('businessName')} autoComplete="organization" />
        <TextField label="Business type or industry" required value={values.businessType} onChange={set('businessType')} />
        <SelectField
          label="Business stage / time in operation"
          required
          options={['Pre-launch or startup', 'Less than 1 year', '1–2 years', '2–5 years', 'More than 5 years']}
          value={values.stage}
          onChange={set('stage')}
        />
        <SelectField
          label="Estimated annual revenue"
          options={['Pre-revenue', 'Under $100,000', '$100,000–$500,000', '$500,000–$1M', '$1M–$5M', 'Over $5M', 'Prefer not to say']}
          value={values.revenue}
          onChange={set('revenue')}
        />
      </fieldset>

      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-serif text-lg font-semibold">Financing needs</legend>
        <SelectField
          label="General financing purpose"
          required
          options={[
            'Working capital',
            'Startup financing',
            'Expansion or growth',
            'Equipment or business-purpose asset',
            'Inventory',
            'Hiring or training',
            'Refinancing existing debt',
            'Grants or government programs',
            'Other',
          ]}
          value={values.purpose}
          onChange={set('purpose')}
        />
        <SelectField
          label="Requested funding range"
          required
          options={['Under $25,000', '$25,000–$100,000', '$100,000–$250,000', '$250,000–$500,000', '$500,000–$1M', 'Over $1M', 'Not sure yet']}
          value={values.amount}
          onChange={set('amount')}
        />
        <SelectField
          label="General credit profile (owner or business)"
          options={['Strong', 'Good', 'Fair', 'Challenged', 'Not sure', 'Prefer not to say']}
          value={values.credit}
          onChange={set('credit')}
          hint="A general sense is enough — no credit report needed."
        />
        <SelectField
          label="Preferred contact method"
          required
          options={['Phone call', 'Email', 'Text message', 'No preference']}
          value={values.contactMethod}
          onChange={set('contactMethod')}
        />
        <TextArea label="Anything else we should know?" value={values.notes} onChange={set('notes')} className="sm:col-span-2" />
      </fieldset>

      <SensitiveInfoNote />
      <ConsentField checked={consent} onChange={setConsent} />
      <Honeypot value={values.website} onChange={set('website')} />
      <SubmitRow submitting={submitting} label="Submit Funding Inquiry" error={error} />
    </form>
  );
}

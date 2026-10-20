import { useState, type FormEvent } from 'react';
import { serviceOfInterestOptions } from '../../data/services';
import {
  ConsentField,
  FormSuccess,
  Honeypot,
  RadioGroup,
  SelectField,
  SensitiveInfoNote,
  SubmitRow,
  TextArea,
  TextField,
} from './Fields';
import { submitInquiry, useFormState } from './submit';

const businessTypes = [
  'Sole proprietorship',
  'Partnership',
  'Corporation',
  'Professional corporation',
  'Non-profit',
  'Other',
];

export default function ConsultationForm({ defaultService = '' }: { defaultService?: string }) {
  const { values, set } = useFormState({
    name: '',
    email: '',
    phone: '',
    clientType: '',
    businessType: '',
    objective: '',
    service: serviceOfInterestOptions.includes(defaultService) ? defaultService : '',
    needs: '',
    contactMethod: '',
    time: '',
    website: '',
  });
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const isBusiness = values.clientType === 'Business client';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await submitInquiry(
        'Consultation Request',
        [
          { label: 'Name', value: values.name },
          { label: 'Email', value: values.email },
          { label: 'Phone', value: values.phone },
          { label: 'Client type', value: values.clientType },
          { label: 'Business type', value: isBusiness ? values.businessType : '' },
          { label: 'Business objective', value: isBusiness ? values.objective : '' },
          { label: 'Service of interest', value: values.service },
          { label: 'Needs', value: values.needs },
          { label: 'Preferred contact method', value: values.contactMethod },
          { label: 'Preferred consultation time', value: values.time },
          { label: 'Consent to contact', value: 'Yes' },
        ],
        values.website
      );
      setDone(true);
    } catch {
      setError('We could not send your request. Please try again in a moment.');
    }
    setSubmitting(false);
  };

  if (done) {
    return (
      <FormSuccess title="Thank you — your request has been received.">
        A member of our team will contact you using your preferred method to arrange your consultation.
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Full name" required value={values.name} onChange={set('name')} autoComplete="name" className="sm:col-span-2" />
        <TextField label="Email address" type="email" required value={values.email} onChange={set('email')} autoComplete="email" />
        <TextField label="Phone number" type="tel" required value={values.phone} onChange={set('phone')} autoComplete="tel" />
      </div>

      <RadioGroup
        label="Are you contacting us as an individual or a business?"
        required
        options={['Individual or family', 'Business client']}
        value={values.clientType}
        onChange={set('clientType')}
      />

      {isBusiness && (
        <div className="grid gap-5 rounded-lg border border-line bg-paper p-5 sm:grid-cols-2">
          <SelectField label="Business type" required options={businessTypes} value={values.businessType} onChange={set('businessType')} />
          <TextField
            label="General objective"
            value={values.objective}
            onChange={set('objective')}
            hint="e.g. financing expansion, corporate planning, succession"
          />
        </div>
      )}

      <SelectField
        label="Primary service of interest"
        required
        options={serviceOfInterestOptions}
        value={values.service}
        onChange={set('service')}
      />

      <TextArea
        label="Briefly describe what you would like help with"
        required
        value={values.needs}
        onChange={set('needs')}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Preferred contact method"
          required
          options={['Phone call', 'Email', 'Text message', 'No preference']}
          value={values.contactMethod}
          onChange={set('contactMethod')}
        />
        <SelectField
          label="Preferred consultation time"
          options={['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Flexible']}
          value={values.time}
          onChange={set('time')}
        />
      </div>

      <SensitiveInfoNote />
      <ConsentField checked={consent} onChange={setConsent} />
      <Honeypot value={values.website} onChange={set('website')} />
      <SubmitRow submitting={submitting} label="Request Consultation" error={error} />
    </form>
  );
}

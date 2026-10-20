import { useState } from 'react';

export type FieldValues = Record<string, string>;

/** Sends a form to the inquiry endpoint as an ordered list of labelled answers. */
export async function submitInquiry(formType: string, fields: { label: string; value: string }[], website: string) {
  const response = await fetch('/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType, fields: fields.filter((f) => f.value), website, consent: true }),
  });
  if (!response.ok) throw new Error(`Inquiry failed with status ${response.status}`);
}

export function useFormState(initial: FieldValues) {
  const [values, setValues] = useState(initial);
  const set = (name: string) => (value: string) => setValues((v) => ({ ...v, [name]: value }));
  return { values, set };
}

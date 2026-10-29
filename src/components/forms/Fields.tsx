import { useId, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Lock } from 'lucide-react';
import Button from '../ui/Button';

interface BaseProps {
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
}

export function TextField({
  label,
  required,
  hint,
  className = '',
  type = 'text',
  value,
  onChange,
  autoComplete,
}: BaseProps & { type?: string; value: string; onChange: (v: string) => void; autoComplete?: string }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-brass-dark">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        autoComplete={autoComplete}
        maxLength={200}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function SelectField({
  label,
  required,
  hint,
  className = '',
  options,
  value,
  onChange,
}: BaseProps & { options: string[]; value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-brass-dark">*</span>}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input field-select"
        aria-describedby={hint ? `${id}-hint` : undefined}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function TextArea({
  label,
  required,
  hint,
  className = '',
  value,
  onChange,
}: BaseProps & { value: string; onChange: (v: string) => void }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-brass-dark">*</span>}
      </label>
      <textarea
        id={id}
        rows={4}
        required={required}
        value={value}
        maxLength={1500}
        onChange={(e) => onChange(e.target.value)}
        className="field-input resize-y"
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function RadioGroup({
  label,
  required,
  className = '',
  options,
  value,
  onChange,
}: BaseProps & { options: string[]; value: string; onChange: (v: string) => void }) {
  const name = useId();
  return (
    <fieldset className={className}>
      <legend className="field-label">
        {label} {required && <span className="text-brass-dark">*</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o}
            className={`cursor-pointer rounded-md border px-4 py-2.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brass ${
              value === o ? 'border-ink bg-ink text-paper' : 'border-line bg-white text-ink hover:border-ink/40'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={o}
              required={required}
              checked={value === o}
              onChange={() => onChange(o)}
              className="sr-only"
            />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function ConsentField({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  const id = useId();
  return (
    <div className="flex gap-3 rounded-md border border-line bg-paper p-4">
      <input
        id={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 flex-shrink-0 accent-ink"
      />
      <label htmlFor={id} className="text-sm leading-relaxed text-ink/80">
        I consent to WeWin Consulting Group contacting me about my inquiry using the details provided, and I acknowledge the{' '}
        <Link to="/privacy" className="underline decoration-brass underline-offset-2" target="_blank">
          Privacy Policy
        </Link>
        . <span className="text-brass-dark">*</span>
      </label>
    </div>
  );
}

/** Hidden field that people never see; automated spam tools tend to fill it in. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="hidden"
    />
  );
}

export function SensitiveInfoNote() {
  return (
    <p className="flex gap-2 text-xs leading-relaxed text-muted">
      <Lock className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      Please do not include SIN numbers, account numbers, passwords or full credit reports in this form. If documents are
      needed, we will arrange a secure way to share them.
    </p>
  );
}

export function SubmitRow({ submitting, label, error }: { submitting: boolean; label: string; error: string }) {
  return (
    <div className="space-y-3">
      <Button type="submit" disabled={submitting} arrow={!submitting} className="w-full sm:w-auto">
        {submitting ? 'Sending…' : label}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormSuccess({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="rounded-lg border border-line bg-white p-8 text-center">
      <CheckCircle2 className="mx-auto h-10 w-10 text-brass" aria-hidden="true" />
      <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
      <div className="mx-auto mt-2 max-w-md text-muted">{children}</div>
    </div>
  );
}

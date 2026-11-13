import { useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { z } from 'zod';
import { programs } from '../../data/programs';
import { cn } from '../../lib/cn';

const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Please keep your name under 80 characters.'),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, 'Enter a 10-digit Indian mobile number, without spaces.'),
  category: z.string().min(1, 'Choose a training category.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please add a little more detail (at least 10 characters).')
    .max(600, 'Please keep your message under 600 characters.'),
});

type EnquiryField = keyof z.infer<typeof enquirySchema>;
type EnquiryValues = z.infer<typeof enquirySchema>;

const FIELDS: EnquiryField[] = ['name', 'phone', 'category', 'message'];

const EMPTY: EnquiryValues = { name: '', phone: '', category: '', message: '' };

const inputBase =
  'w-full border bg-ink-deep/60 px-4 py-3 text-sm text-bone placeholder:text-mist/35 transition-colors duration-200 focus:outline-none';

export default function ContactForm() {
  const [values, setValues] = useState<EnquiryValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<EnquiryField, string>>>({});
  const [state, setState] = useState<'idle' | 'sent'>('idle');

  function update(field: EnquiryField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = enquirySchema.safeParse(values);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const next: Partial<Record<EnquiryField, string>> = {};
      for (const field of FIELDS) {
        const message = fieldErrors[field]?.[0];
        if (message) next[field] = message;
      }
      setErrors(next);
      return;
    }

    // Frontend demonstration only: nothing is transmitted or stored.
    setErrors({});
    setState('sent');
  }

  if (state === 'sent') {
    return (
      <div
        className="border border-gold/40 bg-ink-deep/60 p-8 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <CheckCircle2 className="h-8 w-8 text-gold" aria-hidden="true" />
        <h3 className="mt-5 font-display text-[1.8rem] text-bone">Enquiry checked</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">
          Your details passed validation. This demonstration form does not send or store anything —
          to reach the academy, call or message on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues(EMPTY);
            setState('idle');
          }}
          className="label mt-7 border border-bone/25 px-5 py-3 text-[0.65rem] text-bone transition-colors hover:border-gold/70 hover:text-gold-soft"
        >
          Write another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="border border-bone/10 bg-ink-deep/40 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="enquiry-name" error={errors.name}>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
            className={cn(inputBase, errors.name ? 'border-red-400/70' : 'border-bone/15 focus:border-gold/70')}
          />
        </Field>

        <Field label="Phone number" htmlFor="enquiry-phone" error={errors.phone}>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            value={values.phone}
            onChange={(event) => update('phone', event.target.value.replace(/\D/g, ''))}
            placeholder="10-digit mobile number"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
            className={cn(inputBase, errors.phone ? 'border-red-400/70' : 'border-bone/15 focus:border-gold/70')}
          />
        </Field>

        <Field
          label="Interested training category"
          htmlFor="enquiry-category"
          error={errors.category}
          className="sm:col-span-2"
        >
          <select
            id="enquiry-category"
            name="category"
            value={values.category}
            onChange={(event) => update('category', event.target.value)}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? 'enquiry-category-error' : undefined}
            className={cn(
              inputBase,
              'appearance-none',
              errors.category ? 'border-red-400/70' : 'border-bone/15 focus:border-gold/70',
              !values.category && 'text-mist/50',
            )}
          >
            <option value="">Select a category</option>
            {programs.map((program) => (
              <option key={program.id} value={program.title} className="text-bone">
                {program.title}
              </option>
            ))}
            <option value="General enquiry" className="text-bone">
              General enquiry
            </option>
          </select>
        </Field>

        <Field label="Message" htmlFor="enquiry-message" error={errors.message} className="sm:col-span-2">
          <textarea
            id="enquiry-message"
            name="message"
            rows={5}
            maxLength={600}
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            placeholder="What would you like to know about training?"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'enquiry-message-error' : undefined}
            className={cn(
              inputBase,
              'resize-y',
              errors.message ? 'border-red-400/70' : 'border-bone/15 focus:border-gold/70',
            )}
          />
        </Field>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-xs leading-relaxed text-mist/55">
          Demonstration form. Nothing is sent or stored — use phone or WhatsApp for a real enquiry.
        </p>
        <button
          type="submit"
          className="label inline-flex items-center justify-center gap-2.5 border border-gold bg-gold px-6 py-3.5 text-[0.7rem] text-ink-deep transition-colors hover:bg-gold-soft"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Check enquiry
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

function Field({ label, htmlFor, error, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label mb-2 block text-[0.58rem] text-mist/80">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-xs text-red-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

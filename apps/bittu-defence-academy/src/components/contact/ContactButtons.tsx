import { MessageCircle, Phone } from 'lucide-react';
import { formatPhone, telHref, whatsappHref } from '../../lib/links';
import { cn } from '../../lib/cn';

interface PhoneActionProps {
  phone: string;
  className?: string;
}

export function CallButton({ phone, className }: PhoneActionProps) {
  return (
    <a
      href={telHref(phone)}
      className={cn(
        'group/call inline-flex items-center justify-center gap-2.5 border border-bone/20 px-5 py-3 text-bone transition-colors duration-300 hover:border-gold/70 hover:text-gold-soft',
        className,
      )}
      aria-label={`Call the academy on ${formatPhone(phone)}`}
    >
      <Phone className="h-4 w-4 text-gold" aria-hidden="true" />
      <span className="label text-[0.68rem]">Call {formatPhone(phone)}</span>
    </a>
  );
}

export function WhatsAppButton({ phone, className }: PhoneActionProps) {
  return (
    <a
      href={whatsappHref(phone)}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'inline-flex items-center justify-center gap-2.5 border border-gold bg-gold px-5 py-3 text-ink-deep transition-colors duration-300 hover:bg-gold-soft',
        className,
      )}
      aria-label={`Send a WhatsApp enquiry to ${formatPhone(phone)}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span className="label text-[0.68rem]">WhatsApp</span>
    </a>
  );
}

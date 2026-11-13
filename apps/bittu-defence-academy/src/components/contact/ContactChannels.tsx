import { Instagram, MapPin, Youtube } from 'lucide-react';
import { CallButton, WhatsAppButton } from './ContactButtons';
import { academy } from '../../data/academy';
import { formatPhone, locationLine, mapsHref } from '../../lib/links';

interface ContactChannelsProps {
  className?: string;
}

export default function ContactChannels({ className }: ContactChannelsProps) {
  return (
    <div className={className}>
      <ul className="space-y-4">
        {academy.phones.map((phone) => (
          <li
            key={phone}
            className="flex flex-col gap-4 border border-bone/10 bg-ink-deep/40 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="label text-[0.55rem] text-gold/80">Phone</p>
              <p className="mt-1 font-display text-[1.35rem] text-bone">{formatPhone(phone)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <CallButton phone={phone} className="px-4 py-2.5" />
              <WhatsAppButton phone={phone} className="px-4 py-2.5" />
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <a
          href={mapsHref()}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-start gap-3 border border-bone/10 p-4 transition-colors hover:border-gold/50"
        >
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          <span>
            <span className="label block text-[0.55rem] text-gold/80">Location</span>
            <span className="mt-1 block text-sm text-bone">{locationLine()}</span>
            <span className="mt-1 block text-xs text-mist/60">Open in maps</span>
          </span>
        </a>

        <a
          href={academy.instagram.url}
          target="_blank"
          rel="noreferrer noopener"
          className="flex items-start gap-3 border border-bone/10 p-4 transition-colors hover:border-gold/50"
        >
          <Instagram className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          <span>
            <span className="label block text-[0.55rem] text-gold/80">Instagram</span>
            <span className="mt-1 block text-sm text-bone">@{academy.instagram.label}</span>
            <span className="mt-1 block text-xs text-mist/60">Training updates and clips</span>
          </span>
        </a>
      </div>

      <p className="mt-4 flex items-start gap-3 border border-dashed border-bone/12 p-4 text-xs leading-relaxed text-mist/60">
        <Youtube className="mt-0.5 h-4 w-4 shrink-0 text-mist/50" aria-hidden="true" />
        The official YouTube channel link has not been supplied yet and will be added once confirmed.
      </p>
    </div>
  );
}
